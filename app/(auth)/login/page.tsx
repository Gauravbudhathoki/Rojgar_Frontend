"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import Image from "next/image";
import { handleLogin } from "@/lib/actions/auth-action";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const result = await handleLogin(data);

      if (result.success) {
        if (result.data?.token) {
          localStorage.setItem("token", result.data.token);
        }
        if (result.data?.user) {
          localStorage.setItem("user", JSON.stringify(result.data.user));
        }

        toast.success("Welcome back! Login successful.");

        const role = result.data?.user?.role?.trim();
        router.refresh();
        if (role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }
      } else {
        toast.error(result.message ?? "Invalid credentials");
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Login failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2b2b2b] px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md px-10 py-12">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/image.png"
            alt="Rojgar Logo"
            width={80}
            height={80}
            className="mb-2"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <input
              type="text"
              placeholder="Email or Username"
              {...register("email")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ee8c5] focus:border-transparent transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ee8c5] focus:border-transparent transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end -mt-1">
            <span
              onClick={() => router.push("/forgot-password")}
              className="text-xs text-gray-400 hover:text-black cursor-pointer transition"
            >
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-bold text-sm hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-300">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Sign Up Button */}
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="w-full bg-black text-white py-3 rounded-lg font-bold text-sm hover:bg-zinc-800 active:scale-[0.98] transition-all"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}