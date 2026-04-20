import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, QrCode } from "lucide-react";
import ShareButton from "@/components/ShareButton";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function PublicProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const username = resolvedParams.username;

  const data = await prisma.user.findUnique({
    where: { username },
    include: {
      profile: {
        include: {
          links: {
            where: { isActive: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!data || !data.profile || !data.profile.isPublic) {
    notFound();
  }

  const { profile } = data;
  const initials = profile.displayName
    ? profile.displayName.substring(0, 2).toUpperCase()
    : username.substring(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-[#05070f] text-white px-4 py-6 flex flex-col">
      <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto w-full flex-1">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8 px-2">
          <QrCode className="w-6 h-6 text-emerald-400" />
          <div className="text-emerald-400 font-semibold text-lg sm:text-xl">
            @{username}
          </div>
          <ShareButton />
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-6 bg-emerald-400 rounded-full blur-3xl opacity-30 scale-110" />

            <Avatar className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 border-[5px] border-emerald-400/60 shadow-2xl relative z-10">
              {profile.avatar && (
                <AvatarImage
                  src={profile.avatar}
                  alt={profile.displayName || username}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="text-4xl sm:text-5xl font-bold bg-zinc-900">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="absolute bottom-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-400 rounded-full ring-4 ring-[#05070f] flex items-center justify-center">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            {profile.displayName || username}
          </h1>

          {profile.title && (
            <p className="text-emerald-400 text-lg sm:text-xl md:text-2xl mt-1 uppercase tracking-wide">
              {profile.title}
            </p>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="bg-[#13182b] rounded-3xl p-4 sm:p-6 mb-10 text-center text-gray-300 text-sm sm:text-base leading-relaxed">
            {profile.bio}
          </div>
        )}

        {/* Links */}
        <div className="space-y-3 mb-12">
          {profile.links.length === 0 ? (
            <div className="bg-[#13182b] rounded-3xl p-8 text-center">
              <p className="text-emerald-400/70 text-sm italic">
                No links added yet
              </p>
            </div>
          ) : (
            profile.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-center justify-between bg-[#13182b] hover:bg-[#1a2238] active:scale-[0.98] transition-all rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-4 sm:py-5">
                  
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#1f2a45] rounded-xl flex items-center justify-center text-emerald-400">
                      <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-medium text-base sm:text-lg">
                      {link.title}
                    </span>
                  </div>

                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400/70" />
                </div>
              </a>
            ))
          )}
        </div>

      
      </div>
    </main>
  );
}