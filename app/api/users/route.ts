import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

type CreateOrUpdateUserBody = {
  email?: unknown;
  first_name?: unknown;
  last_name?: unknown;
  username?: unknown;
};

function sanitizeOptionalString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  return trimmedValue.slice(0, maxLength);
}

function sanitizeEmail(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const email = value.trim().toLowerCase();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail) {
    return null;
  }

  return email;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as CreateOrUpdateUserBody;
    const email = sanitizeEmail(body.email);

    if (!email) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    const firstName = sanitizeOptionalString(body.first_name, 100);
    const lastName = sanitizeOptionalString(body.last_name, 100);
    const username = sanitizeOptionalString(body.username, 50);

    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        email,
        first_name: firstName,
        last_name: lastName,
        username,
      },
      create: {
        clerkId: userId,
        email,
        first_name: firstName,
        last_name: lastName,
        username,
      },
    });

    return NextResponse.json(
      {
        data: {
          id: user.id,
          clerkId: user.clerkId,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    if (error instanceof Error && error.message.toLowerCase().includes("unique constraint")) {
      return NextResponse.json({ error: "Email or username already in use" }, { status: 409 });
    }

    return NextResponse.json({ error: "Failed to create or update user" }, { status: 500 });
  }
}