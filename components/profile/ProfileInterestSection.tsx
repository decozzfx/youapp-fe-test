import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { GetProfileResponse } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { calculateAge } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";

interface ProfileSectionProps {
  isEditing?: boolean;
  hasNotification?: boolean;
  data?: string[] | null;
}

const ProfileInterestSection = ({ data }: ProfileSectionProps) => {
  const [formData, setFormData] = useState<string[] | null>([]);

  useEffect(() => {
    if (data) {
      setFormData(data ?? null);
    }
  }, [data]);

  return (
    <div className="p-4 bg-customDarkBlue rounded-2xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-md font-semibold text-white">Interest</h2>
        <Link
          href={"/profile/interest"}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Pencil className="w-5 h-5" />
        </Link>
      </div>

      <div className="">
        {formData && formData?.length <= 0 ? (
          <p className="text-white/50 text-sm mt-6">
            Add in your interest to find a better match
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {formData?.map((interest, index) => (
              <div className="rounded-full bg-white/5 px-4 py-2">
                <p className="text-white text-sm ">{interest}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInterestSection;
