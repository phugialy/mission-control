import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const missionId = searchParams.get("missionId");
  
  const where = missionId ? { missionId } : {};
  
  const activities = await prisma.activity.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  
  return NextResponse.json(activities);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { type, message, agentId, missionId } = body;
  
  const activity = await prisma.activity.create({
    data: {
      type,
      message,
      agentId,
      missionId,
    }
  });
  
  return NextResponse.json(activity, { status: 201 });
}