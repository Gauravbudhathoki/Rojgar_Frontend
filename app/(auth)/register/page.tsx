"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation";
import InputField from "@/components/inputfield";
import Image from "next/image";
import { handleRegister } from "@/lib/actions/auth-action";
import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowRight, CheckCircle, Eye, EyeOff } from "lucide-react";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      const result = await handleRegister(data);

      if (result.success) {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      } else {
        toast.error(result.message ?? "Registration failed");
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Registration failed");
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
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-500/20 to-green-500/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="mb-8 inline-block">
            <div className="relative">
              <Image
                src="/images/image1.png"
                alt="Rojgar Image"
                width={320}
                height={320}
                className="mb-2 drop-shadow-2xl"
              />
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Hire Smarter. <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Work Better.</span>
          </h2>

          <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
            Join our community of talented professionals and forward-thinking employers
          </p>

          {/* Benefits */}
          <div className="mt-12 space-y-4">
            {[
              { text: "Access thousands of job opportunities" },
              { text: "Connect with top employers instantly" },
              { text: "Grow your professional network" },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-slate-300 text-sm"
                style={{ animation: `slideIn 0.6s ease-out ${0.2 + idx * 0.1}s both` }}
              >
                <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative">
        {/* Form container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          {/* Card background with gradient border effect */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-8 backdrop-blur-sm">
            {/* Decorative gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 rounded-2xl pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white text-center">
                  Get Started
                </h1>
                <p className="text-slate-400 text-sm text-center mt-2">
                  Create your account and unlock opportunities
                </p>
              </div>

              {/* Username Field */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Choose a unique username"
                  {...register("username")}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-500 transition-all duration-200"
                />
                {errors.username && (
                  <p className="text-red-400 text-xs mt-2 font-medium">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-500 transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-2 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-500 transition-all duration-200 pr-12"
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

              {/* Confirm Password Field */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-slate-500 transition-all duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-2 font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-slate-400 text-sm">
                  Already have an account?{" "}
                  <span
                    onClick={() => router.push("/login")}
                    className="text-emerald-400 font-bold cursor-pointer hover:text-emerald-300 transition-colors"
                  >
                    Sign in
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Trust indicator */}
          <div className="mt-8 text-center text-xs text-slate-500">
            <p>🔒 Your data is encrypted and protected</p>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}