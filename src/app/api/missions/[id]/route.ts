import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const mission = await prisma.mission.findUnique({
    where: { id },
    include: {
      objectives: {
        include: { tasks: true },
        orderBy: { order: "asc" }
      }
    }
  });
  
  if (!mission) {
    return NextResponse.json({ error: "Mission not found" }, { status: 404 });
  }
  
  return NextResponse.json(mission);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  
  const mission = await prisma.mission.update({
    where: { id },
    data: body
  });
  
  // Log activity if status changed
  if (body.status) {
    await prisma.activity.create({
      data: {
        type: "status_changed",
        message: `Mission status changed to ${body.status}`,
        missionId: id
      }
    });
  }
  
  return NextResponse.json(mission);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  await prisma.mission.delete({ where: { id } });
  
  return NextResponse.json({ success: true });
}
