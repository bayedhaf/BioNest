
import { currentUser, auth } from '@clerk/nextjs/server';
import ProfileForm from '@/components/forms/ProfileForm';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';


export default async function SettingsPage() {
  const user = await currentUser();
  const { userId } = await auth();

  let profile = null;
  if (userId) {
    profile = await prisma.profile.findUnique({
      where: { userId },
    });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Profile</h1>
        <p className="text-zinc-400 mt-2">Manage your profile and Links</p>
      </div>

      {/* Profile Header */}
      <Card className="bg-[#334155] border-zinc-700 overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar with safe fallback */}
            <div className="flex-shrink-0">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={`${user.firstName || ''} ${user.lastName || ''}`}
                  width={50}
                  height={50}
                  className="rounded-full border border-zinc-600 object-cover"
                  priority
                />
              ) : (
                <div className="w-[120px] h-[120px] bg-zinc-700 rounded-2xl flex items-center justify-center text-6xl border border-zinc-600">
                  👤
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-3 pt-2">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-semibold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-zinc-400 mt-1">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </p>
                  {user?.username && (
                    <p className="text-emerald-400 font-mono mt-1">@{user.username}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileForm 
        initialBio={profile?.bio || ''} 
        initialTitle={profile?.title || ''} 
      />

      <div className="text-sm text-zinc-500">
        <Link href="/dashboard/links" className="text-emerald-400 hover:underline">
          → Manage your links
        </Link>
      </div>
    </div>
  );
}