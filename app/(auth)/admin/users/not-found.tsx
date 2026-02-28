import Link from "next/link";
import { ArrowLeft, Briefcase, SearchX } from "lucide-react";

export default function NotFound() {
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
            <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-30" />
            <div className="relative w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center border-2 border-amber-100">
              <SearchX size={26} className="text-amber-500" />
            </div>
          </div>

          <p className="text-6xl font-extrabold text-[#1a3c5e]/10 tracking-tight mb-2">404</p>

          <h2 className="text-xl font-extrabold text-[#1a3c5e] tracking-tight mb-2">
            User Not Found
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            The user you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>

          <div className="flex gap-3">
            <Link
              href="/admin"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-600 text-sm font-bold rounded-2xl hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={15} />
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1a3c5e] text-white text-sm font-bold rounded-2xl hover:bg-[#16324f] active:scale-[0.98] transition-all shadow-lg shadow-[#1a3c5e]/20"
            >
              Back to Users
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Rojgar. All rights reserved.
        </p>
      </div>
    </div>
  );
}