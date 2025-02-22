"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-white/80 hover:text-white"
    >
      <ChevronLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
};
