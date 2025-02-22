"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authService } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.register(formData);
      setToken(response.token);
      router.push("/login");
      toast.success("Registration successful!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-auth text-white p-4">
      <BackButton />

      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-6">Register</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full p-3 rounded-lg bg-deep-teal text-white"
            required
          />

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className="w-full p-3 rounded-lg bg-deep-teal text-white"
            required
          />

          <div className="relative ">
            <input
              type={!showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              className="w-full p-3 rounded-lg bg-deep-teal text-white"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative ">
            <input
              type={!showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="confirm password"
              className="w-full p-3 rounded-lg bg-deep-teal text-white"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="h-1" />

          <Button
            className="w-full mt-10"
            gradient
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Register in..." : "Register"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">
            Have an account?{" "}
            <Link
              href="/login"
              className="text-sm text-gray-400 hover:text-white hover:underline"
            >
              Login here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
