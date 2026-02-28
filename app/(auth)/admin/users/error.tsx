"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, ArrowLeft, Briefcase } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center">
              <Briefcase size={16} className="text-[#1a3c5e]" />
            </div>
            <span className="font-extrabold text-[#1a3c5e] text-lg tracking-tight">
              Rojgar<span className="text-amber-400">.</span>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">

          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-30" />
            <div className="relative w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-100">
              <AlertTriangle size={26} className="text-red-500" />
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-[#1a3c5e] tracking-tight mb-2">
            Something Went Wrong
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            An unexpected error occurred. Please try again or go back.
          </p>

          {error.message && (
            <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-6 mt-4">
              <p className="text-xs text-red-500 font-mono break-words">{error.message}</p>
              {error.digest && (
                <p className="text-[10px] text-red-300 mt-1">Digest: {error.digest}</p>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => router.push("/admin")}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-600 text-sm font-bold rounded-2xl hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={15} />
              Go Back
            </button>
            <button
              onClick={reset}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1a3c5e] text-white text-sm font-bold rounded-2xl hover:bg-[#16324f] active:scale-[0.98] transition-all shadow-lg shadow-[#1a3c5e]/20"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Rojgar. All rights reserved.
        </p>
      </div>
    </div>
  );
}