"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import InputField from "@/components/inputfield";
import Image from "next/image";
import { handleLogin } from "@/lib/actions/auth-action";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

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

        if (role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }

        router.refresh();
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
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Left Panel - Brand & Visual */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative p-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="mb-8 inline-block">
            <div className="relative">
              <Image
                src="/images/image.png"
                alt="Rojgar Image"
                width={320}
                height={320}
                className="mb-2 drop-shadow-2xl"
              />
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Connecting Talent with <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Opportunity</span>
          </h2>

          <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
            Join thousands of professionals finding their perfect career match
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative">
        {/* Form container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          {/* Card background with gradient border effect */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-8 backdrop-blur-sm">
            {/* Decorative gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white text-center">
                  Welcome Back
                </h1>
                <p className="text-slate-400 text-sm text-center mt-2">
                  Sign in to continue to your account
                </p>
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Email or Username
                </label>
                <input
                  type="text"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-2 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-slate-200">
                    Password
                  </label>
                  <span
                    onClick={() => router.push("/forgot-password")}
                    className="text-xs text-blue-400 font-semibold cursor-pointer hover:text-blue-300 transition-colors"
                  >
                    Forgot?
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 pr-12 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-2 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Signup Link */}
              <div className="mt-6 text-center">
                <p className="text-slate-400 text-sm">
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={() => router.push("/register")}
                    className="text-blue-400 font-bold cursor-pointer hover:text-blue-300 transition-colors"
                  >
                    Create one
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Trust indicator */}
          <div className="mt-8 text-center text-xs text-slate-500">
            <p>🔒 Your credentials are encrypted and secure</p>
          </div>
        </form>
      </div>
    </div>
  );
}