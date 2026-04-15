import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { objectiveId, title, status, assignee, order } = body;
  
  const task = await prisma.task.create({
    data: {
      objectiveId,
      title,
      status: status || "inbox",
      assignee,
      order: order || 0,
    }
  });
  
  // Log activity
  const obj = await prisma.objective.findUnique({ where: { id: objectiveId } });
  if (obj) {
    await prisma.activity.create({
      data: {
        type: "task_created",
        message: `Task "${title}" created`,
        missionId: obj.missionId
      }
    });
  }
  
  return NextResponse.json(task, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, title, status, assignee, order } = body;
  
  const old = await prisma.task.findUnique({ where: { id } });
  const task = await prisma.task.update({
    where: { id },
    data: { title, status, assignee, order }
  });
  
  // Log activity on status change
  if (old && status && status !== old.status) {
    const obj = await prisma.objective.findUnique({ where: { id: old.objectiveId } });
    if (obj) {
      await prisma.activity.create({
        data: {
          type: "task_status_changed",
          message: `Task "${title}" status changed to ${status}`,
          missionId: obj.missionId
        }
      });
    }
  }
  
  return NextResponse.json(task);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  
  const task = await prisma.task.findUnique({ where: { id } });
  if (task) {
    const obj = await prisma.objective.findUnique({ where: { id: task.objectiveId } });
    if (obj) {
      await prisma.activity.create({
        data: {
          type: "task_deleted",
          message: `Task "${task.title}" deleted`,
          missionId: obj.missionId
        }
      });
    }
  }
  
  await prisma.task.delete({ where: { id } });
  
  return NextResponse.json({ success: true });
}
