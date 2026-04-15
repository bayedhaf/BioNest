import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { links } = body as { links: { id: string; order: number }[] };

    if (!links || !Array.isArray(links)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const updates = links.map(link => 
      prisma.link.update({
        where: { id: link.id, profileId: userId },
        data: { order: link.order },
      })
    );

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering links:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
