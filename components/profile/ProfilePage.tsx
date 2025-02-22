"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { ProfileFormData } from "./types";
import ProfileHeaderImage from "./ProfileHeaderImage";
import ProfileAboutSection from "./ProfileAboutSection";
import { GetProfileResponse, profileService } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { calculateAge } from "@/lib/utils";
import ProfileInterestSection from "./ProfileInterestSection";
import Link from "next/link";

interface ProfileImage {
  url: string;
  file: File | null;
}

export default function ProfileSetup() {
  const token = useAuthStore((state) => state.token);

  const [formData, setFormData] = useState<GetProfileResponse["data"] | null>(
    null
  );

  const fetchProfile = useCallback(async () => {
    try {
      const profileData = await profileService.getProfile(token || "");
      setFormData(profileData.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [token]);

  const onSaveUpdate = async (data: ProfileFormData) => {
    try {
      await profileService.updateProfile(token || "", data);
      fetchProfile();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchProfile();
  }, [fetchProfile, token]);

  return (
    <div className="min-h-screen bg-midnight-blue text-white">
      <header className="flex items-center justify-between p-4 ">
        <Link href="/" className="flex items-center text-gray-400">
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
        <span className="text-sm text-gray-400">@{formData?.username}</span>
      </header>

      <div className="p-4 space-y-6">
        <ProfileHeaderImage
          username={formData?.username}
          age={calculateAge(formData?.birthday)}
        />
        <ProfileAboutSection onSaveUpdate={onSaveUpdate} data={formData} />
        <ProfileInterestSection data={formData?.interests} />
      </div>
    </div>
  );
}
