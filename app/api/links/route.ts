import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface CreateLinkBody {
  title: string;
  url: string;
  isActive?: boolean;
  order?: number;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as CreateLinkBody;

    // Validate input
    if (!body.title || !body.url) {
      return NextResponse.json({ error: "Title and URL are required" }, { status: 400 });
    }

    const newLink = await prisma.link.create({
      data: {
        title: body.title,
        url: body.url,
        isActive: body.isActive ?? true,
        order: body.order ?? 0,
        profileId: userId,
      },
    });

    return NextResponse.json({ data: newLink }, { status: 201 });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const links = await prisma.link.findMany({
      where: { profileId: userId },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ data: links });
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
