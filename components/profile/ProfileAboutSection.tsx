import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { GetProfileResponse } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { calculateAge } from "@/lib/utils";
import { format } from "date-fns";

interface ProfileSectionProps {
  isEditing?: boolean;
  hasNotification?: boolean;
  data?: GetProfileResponse["data"] | null;
  onSaveUpdate: (v: GetProfileResponse["data"]) => Promise<void>;
}

const ProfileAboutSection = ({ data, onSaveUpdate }: ProfileSectionProps) => {
  const setPicture = useAuthStore((state) => state.setPicture);
  const picture = useAuthStore((state) => state.picture);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: data?.username,
    gender: data?.gender,
    birthday: data?.birthday,
    horoscope: data?.horoscope,
    zodiac: data?.zodiac,
    height: data?.height,
    weight: data?.weight,
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPicture(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.username,
        gender: data.gender,
        birthday: data.birthday,
        horoscope: data.horoscope,
        zodiac: data.zodiac,
        height: data.height,
        weight: data.weight,
      });
    }
  }, [data]);

  const handleSaveUpdate = async () => {
    await onSaveUpdate?.(formData).then(() => {
      setIsEditing(false);
    });
  };

  return (
    <div className="p-4 bg-customDarkBlue rounded-2xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-md font-semibold text-white">About</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={isEditing ? handleSaveUpdate : handleEdit}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isEditing ? (
              <span className="text-sm text-gold">Save & Update</span>
            ) : (
              <Pencil className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      {isEditing ? (
        <div className="space-y-6 mt-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14 bg-gray-800 rounded-lg flex items-center justify-center">
              {picture ? (
                <Image
                  src={picture}
                  alt="Profile"
                  fill
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                />
              ) : (
                <Plus className="w-8 h-8 text-gray-600" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              ></input>
            </div>
            <span>Add Image</span>
          </div>

          {/* Display Name */}
          <div className="flex items-center justify-between">
            <label className="text-gray-400 text-sm w-1/3">Display name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-2/3 px-4 py-2 bg-input-gray border text-sm text-right border-white/20 rounded-lg text-white focus:outline-none"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center justify-between">
            <label className="text-gray-400 text-sm w-1/3">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-2/3 px-4 py-2 bg-input-gray border text-sm text-right border-white/20 rounded-lg text-white focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Birthday */}
          <div className="flex items-center justify-between">
            <label className="text-gray-400 text-sm w-1/3">Birthday</label>
            <input
              type="date"
              value={formData.birthday}
              placeholder="Enter your birthday"
              onChange={(e) =>
                setFormData({ ...formData, birthday: e.target.value })
              }
              className="w-2/3 px-4 py-2 bg-input-gray border text-sm text-right border-white/20 rounded-lg text-white focus:outline-none"
            />
          </div>

          {/* Horoscope */}
          <div className="flex items-center justify-between">
            <label className="text-gray-400 text-sm w-1/3">Horoscope</label>
            <input
              type="text"
              value={formData.horoscope}
              disabled
              className="w-2/3 px-4 py-2 bg-input-gray border text-sm text-right border-white/20 rounded-lg text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Zodiac */}
          <div className="flex items-center justify-between">
            <label className="text-gray-400 text-sm w-1/3">Zodiac</label>
            <input
              type="text"
              value={formData.zodiac}
              disabled
              className="w-2/3 px-4 py-2 bg-input-gray border text-sm text-right border-white/20 rounded-lg text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Height */}
          <div className="flex items-center justify-between">
            <label className="text-gray-400 text-sm w-1/3">Height</label>
            <div className="flex items-center w-2/3">
              <input
                type="number"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: Number(e.target.value) })
                }
                className="flex-1 px-4 py-2 bg-input-gray border text-sm text-right border-white/20 rounded-lg text-white focus:outline-none"
                style={{ appearance: "textfield" }}
              />
              <span className="text-sm text-gray-400 ml-2">cm</span>
            </div>
            <style jsx>{`
              input[type="number"]::-webkit-inner-spin-button,
              input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
            `}</style>
          </div>

          {/* Weight */}
          <div className="flex items-center justify-between">
            <label className="text-gray-400 text-sm w-1/3">Weight</label>
            <div className="flex items-center w-2/3">
              <input
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: Number(e.target.value) })
                }
                className="flex-1 px-4 py-2 bg-input-gray border text-sm text-right border-white/20 rounded-lg text-white focus:outline-none"
                style={{ appearance: "textfield" }}
              />
              <span className="text-sm text-gray-400 ml-2">kg</span>
            </div>
            <style jsx>{`
              input[type="number"]::-webkit-inner-spin-button,
              input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
            `}</style>
          </div>
        </div>
      ) : !formData?.birthday ? (
        <p className="text-white/50 text-sm mt-6">
          Add in your your to help others know you better
        </p>
      ) : (
        <div className="">
          <div className="flex items-center gap-2">
            <p className="text-white/30 text-sm mt-6">Birthday: </p>
            <p className="text-white text-sm mt-6">{`${format(
              new Date(formData.birthday || new Date()) || "",
              "dd/MM/yyyy"
            )} ${calculateAge(formData.birthday)}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-white/30 text-sm mt-6">Horoscope: </p>
            <p className="text-white text-sm mt-6">{formData.horoscope}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-white/30 text-sm mt-6">Zodiac: </p>
            <p className="text-white text-sm mt-6">{formData.zodiac}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-white/30 text-sm mt-6">Height: </p>
            <p className="text-white text-sm mt-6">{formData.height} cm</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-white/30 text-sm mt-6">Weight: </p>
            <p className="text-white text-sm mt-6">{formData.weight} kg</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAboutSection;
