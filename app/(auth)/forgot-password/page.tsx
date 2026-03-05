"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import InputField from "@/components/inputfield";
import { forgetPasswordSchema, ForgetPasswordData } from "@/app/(auth)/schema";
import { handleRequestPasswordReset } from "@/lib/actions/auth-action";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: ForgetPasswordData) => {
    try {
      setLoading(true);
      const result = await handleRequestPasswordReset(data.email);

      if (result.success) {
        toast.success("If the email is registered, a reset link has been sent.");
        router.push("/login");
      } else {
        toast.error(result.message || "Failed to send reset link");
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Failed to send reset link");
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
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1.2s" }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="mb-8 inline-block">
            <div className="relative">
              <Image
                src="/images/image.png"
                alt="Football Image"
                width={320}
                height={320}
                className="mb-2 drop-shadow-2xl"
              />
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Nepal&apos;s Home for <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">Football & Futsal</span> Events
          </h2>

          <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
            Reset your password securely and get back to the action
          </p>

          {/* Info items */}
          <div className="mt-12 space-y-4">
            {[
              { text: "Secure password recovery process" },
              { text: "Reset link expires in 24 hours" },
              { text: "Instant access after reset" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-slate-300 text-sm"
                style={{ animation: `slideIn 0.6s ease-out ${0.2 + idx * 0.1}s both` }}
              >
                <CheckCircle size={18} className="text-amber-400 flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative">
        {/* Form container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          {/* Card background with gradient border effect */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-8 backdrop-blur-sm">
            {/* Decorative gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10 rounded-2xl pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Back button */}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-6 text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Back to Login
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-amber-500/20 rounded-full">
                    <Mail size={24} className="text-amber-400" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-white text-center">
                  Reset Password
                </h1>
                <p className="text-slate-400 text-sm text-center mt-3 leading-relaxed">
                  Enter your email address and we&apos;ll send you a link to reset your password securely.
                </p>
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-slate-500 transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-2 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <Mail size={18} className="group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>

              {/* Additional help */}
              <div className="mt-8 p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                <p className="text-xs text-slate-300 text-center">
                  💡 <span className="font-semibold">Tip:</span> Check your spam folder if you don&apos;t see the email within a few minutes.
                </p>
              </div>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-slate-400 text-sm">
                  Remember your password?{" "}
                  <span
                    onClick={() => router.push("/login")}
                    className="text-amber-400 font-bold cursor-pointer hover:text-amber-300 transition-colors"
                  >
                    Sign in
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Security note */}
          <div className="mt-8 text-center text-xs text-slate-500">
            <p>🔒 Your email will only be used to send the reset link</p>
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