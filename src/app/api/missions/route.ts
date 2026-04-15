import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  
  const where = status ? { status } : {};
  
  const missions = await prisma.mission.findMany({
    where,
    include: {
      objectives: {
        include: { tasks: true },
        orderBy: { order: "asc" }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  
  return NextResponse.json(missions);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, status, priority, createdBy } = body;
  
  const mission = await prisma.mission.create({
    data: {
      title,
      description,
      status: status || "inbox",
      priority,
      createdBy: createdBy || "human",
    }
  });
  
  // Log activity
  await prisma.activity.create({
    data: {
      type: "mission_created",
      message: `Mission "${title}" created`,
      agentId: createdBy,
      missionId: mission.id
    }
  });
  
  return NextResponse.json(mission, { status: 201 });
}
