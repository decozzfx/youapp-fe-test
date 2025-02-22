import { useAuthStore } from "@/store/auth";
import Image from "next/image";
import React from "react";

type IProps = {
  username?: string;
  imageUrl?: string;
  age?: string;
};

const ProfileHeaderImage: React.FC<IProps> = ({
  username = "@johndoe123",
  age,
}) => {
  const picture = useAuthStore((state) => state.picture);

  return (
    <div className="relative w-full h-64 bg-default-dark-Blue rounded-2xl">
      {picture ? (
        <Image
          src={picture}
          alt="Profile Cover"
          fill
          className="w-full h-full object-cover opacity-50 rounded-2xl"
        />
      ) : (
        <div className="absolute inset-0 bg-default-dark-Blue rounded-2xl" />
      )}
      <div className="absolute bottom-4 left-4">
        <h1 className="text-2xl font-semibold text-white">
          {username}, {age}
        </h1>
        <div className=""></div>
      </div>
    </div>
  );
};

export default ProfileHeaderImage;
