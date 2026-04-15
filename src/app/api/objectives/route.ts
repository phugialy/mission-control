import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { missionId, title, status, order } = body;
  
  const objective = await prisma.objective.create({
    data: {
      missionId,
      title,
      status: status || "inbox",
      order: order || 0,
    }
  });
  
  // Log activity
  await prisma.activity.create({
    data: {
      type: "objective_created",
      message: `Objective "${title}" created`,
      missionId
    }
  });
  
  return NextResponse.json(objective, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, title, status, order } = body;
  
  const old = await prisma.objective.findUnique({ where: { id } });
  const objective = await prisma.objective.update({
    where: { id },
    data: { title, status, order }
  });
  
  // Log activity on status change
  if (old && status && status !== old.status) {
    await prisma.activity.create({
      data: {
        type: "objective_status_changed",
        message: `Objective "${title}" status changed to ${status}`,
        missionId: old.missionId
      }
    });
  }
  
  return NextResponse.json(objective);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  
  const obj = await prisma.objective.findUnique({ where: { id } });
  if (obj) {
    await prisma.activity.create({
      data: {
        type: "objective_deleted",
        message: `Objective "${obj.title}" deleted`,
        missionId: obj.missionId
      }
    });
  }
  
  await prisma.objective.delete({ where: { id } });
  
  return NextResponse.json({ success: true });
}
