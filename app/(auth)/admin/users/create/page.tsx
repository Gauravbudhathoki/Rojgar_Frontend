"use client";

import CreateUserForm from "../_components/CreateUserForm";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Briefcase } from "lucide-react";

export default function CreateUserPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      <div className="max-w-lg mx-auto py-8 px-4 sm:px-6">

        <button
          onClick={() => router.push("/admin/users")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#1a3c5e] font-medium mb-6 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Users
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-md shadow-amber-200 shrink-0">
            <UserPlus size={18} className="text-[#1a3c5e]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight">
              Create User
            </h1>
            <p className="text-gray-400 text-sm">Add a new user to Rojgar</p>
          </div>
          <div className="ml-auto">
            <Briefcase size={18} className="text-gray-200" />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <CreateUserForm onSuccess={() => router.push("/admin/users")} />
        </div>

      </div>
    </div>
  );
}