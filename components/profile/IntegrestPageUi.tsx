"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { profileService } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

const IntegrestPageUi = () => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const profileData = await profileService.getProfile(token || "");
      setSelectedInterests(profileData.data.interests ?? []);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [token]);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => prev.filter((i) => i !== interest));
  };

  const onSaveUpdate = async () => {
    try {
      await profileService.updateProfile(token || "", {
        interests: selectedInterests,
      });
      toast.success("Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchProfile();
  }, [fetchProfile, token]);

  return (
    <div className="min-h-screen bg-background-auth text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 ">
        <Link href="/profile" className="flex items-center text-gray-400">
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
        <button onClick={onSaveUpdate} className="text-blue-500">
          Save
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-8">
        <div>
          <p className="text-gold text-sm">Tell everyone about yourself</p>
          <h1 className="text-xl font-semibold mt-1">What interest you?</h1>
        </div>

        {/* Interest Tags */}
        <div className="flex flex-wrap gap-2 p-4 bg-white/10 rounded-xl">
          {selectedInterests.map((interest) => (
            <div
              key={interest}
              className={`px-4 flex gap-2 py-2 rounded-lg text-sm transition-colors bg-white/10 text-white "
              `}
            >
              {interest}
              <button onClick={() => toggleInterest(interest)} className="">
                X
              </button>
            </div>
          ))}

          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSelectedInterests((prev) => [...prev, inputValue]);
                setInputValue("");
              }
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add your interest"
            className="px-4 flex gap-2 py-2 rounded-lg text-sm transition-colors focus:outline-none bg-white/10 text-white "
          />
        </div>
      </div>
    </div>
  );
};

export default IntegrestPageUi;
