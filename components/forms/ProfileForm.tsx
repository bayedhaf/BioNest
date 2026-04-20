
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { updateProfile } from '@/actions/profile.actions';

interface ProfileFormProps {
  initialBio: string;
  initialTitle?: string;
}

export default function ProfileForm({ initialBio, initialTitle = '' }: ProfileFormProps) {
  const [bio, setBio] = useState(initialBio);
  const [title, setTitle] = useState(initialTitle);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!initialBio);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bio.trim()) {
      toast.error("Please write something about yourself");
      return;
    }

    setIsLoading(true);

    try {
      const result = await updateProfile(bio, title);
      
      if (result.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false); // Close form after submit
      } else {
        toast.error(result.error || "Failed to save profile");
      }
    } catch (error) {
      toast.error("Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <Card className="bg-[#334155] border-zinc-700">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-xl">Your Profile Information</CardTitle>
            <p className="text-zinc-400 text-sm mt-1">What your audience sees</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
            className="border-zinc-600 text-zinc-300 hover:text-white"
          >
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-zinc-950 p-4 rounded-md border border-zinc-700">
            <Label className="text-zinc-500 mb-1 block text-sm">Title</Label>
            <p className="text-zinc-300 font-medium">{title || <span className="text-zinc-600 italic">No title</span>}</p>
          </div>
          <div className="bg-zinc-950 p-4 rounded-md border border-zinc-700">
            <Label className="text-zinc-500 mb-1 block text-sm">Bio</Label>
            <p className="text-zinc-300 whitespace-pre-wrap">{bio}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#334155] border-zinc-700">
      <CardHeader>
        <CardTitle className="text-xl">{initialBio ? 'Edit Your Profile' : 'Complete Your Profile'}</CardTitle>
        <p className="text-zinc-400 text-sm">Tell your audience about yourself</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-300">Job Title / Headline</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Software Engineer, Content Creator"
              className="bg-zinc-950 border-zinc-700 focus:border-emerald-600 text-white"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-zinc-300">Your Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Product designer & content creator based in Bishoftu. Passionate about design systems, Ethiopian culture, and building useful tools..."
              className="min-h-[140px] bg-zinc-950 border-zinc-700 resize-y focus:border-emerald-600 text-white"
              maxLength={500}
            />
            <p className="text-xs text-zinc-500 text-right">
              {bio.length}/500 characters
            </p>
          </div>

          <div className="flex gap-3 justify-between">
            {initialBio && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setBio(initialBio);
                  setTitle(initialTitle);
                  setIsEditing(false);
                }}
                className="w-full border-zinc-600 text-zinc-300 hover:text-white"
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={isLoading || !bio.trim()}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {isLoading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}