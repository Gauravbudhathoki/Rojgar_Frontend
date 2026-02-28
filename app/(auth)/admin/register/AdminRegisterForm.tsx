"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ImageIcon, Briefcase, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { adminRegisterSchema, AdminRegisterData } from "./schema";
import { handleAdminRegister } from "@/lib/api/auth";

export default function AdminRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminRegisterData>({
    resolver: zodResolver(adminRegisterSchema),
  });

  const onSubmit = async (data: AdminRegisterData) => {
    setIsLoading(true);
    try {
      const result = await handleAdminRegister(data);
      if (result.success) {
        toast.success(result.message || "Admin registration successful!");
        router.push("/admin/login");
      } else {
        toast.error(result.message || "Admin registration failed");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred during registration";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase =
    "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/30 focus:border-[#1a3c5e] transition-all duration-150";

  const errorBase = "mt-1.5 text-xs text-red-500 font-medium";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#dbe8f5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center mb-4 shadow-lg shadow-amber-200">
            <Briefcase size={22} className="text-[#1a3c5e]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#1a3c5e] tracking-tight">
            Rojgar<span className="text-amber-400">.</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1 tracking-wide">Admin Registration</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/80 p-8">
          <div className="mb-7">
            <h2 className="text-xl font-bold text-gray-800">Create Admin Account</h2>
            <p className="text-gray-400 text-sm mt-1">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Enter your full name"
                  className={inputBase}
                />
              </div>
              {errors.fullName && <p className={errorBase}>{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className={inputBase}
                />
              </div>
              {errors.email && <p className={errorBase}>{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`${inputBase} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className={errorBase}>{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Confirm
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("confirmPassword")}
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className={`${inputBase} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className={errorBase}>{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Profile Picture URL <span className="normal-case font-normal text-gray-400">(optional)</span>
              </label>
              <div className="relative">
                <ImageIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("profilePicture")}
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className={inputBase}
                />
              </div>
              {errors.profilePicture && <p className={errorBase}>{errors.profilePicture.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1a3c5e] text-white text-sm font-bold rounded-2xl hover:bg-[#16324f] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 mt-2 shadow-lg shadow-[#1a3c5e]/20"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an admin account?{" "}
              <button
                onClick={() => router.push("/admin/login")}
                className="text-[#1a3c5e] font-bold hover:text-amber-500 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Rojgar. All rights reserved.
        </p>
      </div>
    </div>
  );
}