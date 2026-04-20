'use server'

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache"; 
import { prisma } from "@/lib/prisma";

export async function updateProfile(bio: string, title?: string) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      throw new Error("Unauthorized");
    }

    const displayName = user.firstName 
      ? `${user.firstName} ${user.lastName || ''}`.trim()
      : user.username || "Anonymous";

    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: { bio, title },
      create: {
        userId,
        bio,
        title,
        displayName,
      },
    });

    revalidatePath("/dashboard/profile");
    revalidatePath("/public_profile/[username]"); // Assuming public pages need revalidation

    return { 
      success: true, 
      profile: updatedProfile 
    };

  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
