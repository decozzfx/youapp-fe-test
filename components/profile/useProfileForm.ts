import { useState } from "react";
import { ProfileFormData } from "./types";

export const useProfileForm = () => {
  const [data, setData] = useState<ProfileFormData>({
    name: "",
    gender: "",
    birthday: "",
    horoscope: "",
    zodiac: "",
    height: "",
    weight: "",
    interests: [],
  });

  const updateField = (field: keyof ProfileFormData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    data,
    updateField,
    setData,
  };
};
