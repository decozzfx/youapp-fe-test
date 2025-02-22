"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/Button";

export default function Home() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const token = useAuthStore((state) => state.token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-auth text-white p-4">
      <div className="flex gap-4 flex-col">
        <h1 className="text-2xl font-bold mb-10">Welcome to the app</h1>
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/register")}>Register</Button>
        {token && (
          <Button onClick={() => router.push("/profile")}>Profile</Button>
        )}
      </div>
    </div>
  );
}
