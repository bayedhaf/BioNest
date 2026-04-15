import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = (await params).id;
    const body = await request.json();

    const link = await prisma.link.update({
      where: { id, profileId: userId },
      data: {
        title: body.title,
        url: body.url,
        isActive: body.isActive,
        order: body.order,
      },
    });

    return NextResponse.json({ data: link });
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = (await params).id;

    await prisma.link.delete({
      where: { id, profileId: userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
