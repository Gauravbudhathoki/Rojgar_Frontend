"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  ArrowLeft,
  Loader2,
  BadgeCheck,
  Clock,
  FileText,
} from "lucide-react";
import { getUserById } from "@/lib/api/admin/user";

type UserDetail = {
  id: string;
  username: string;
  email: string;
  phone?: string;
  location?: string;
  role?: string;
  status?: "active" | "inactive" | "banned";
  joinedAt?: string;
  profilePicture?: string;
  appliedJobs?: number;
  bio?: string;
};

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(params.id);
        setUser(data);
      } catch {
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.id]);

  const statusConfig = {
    active: { label: "Active", classes: "bg-green-100 text-green-700" },
    inactive: { label: "Inactive", classes: "bg-gray-100 text-gray-500" },
    banned: { label: "Banned", classes: "bg-red-100 text-red-600" },
  };

  const status = user?.status ?? "inactive";
  const statusStyle = statusConfig[status];
  const userInitial = user?.username?.[0]?.toUpperCase() ?? "U";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-[#1a3c5e]" />
          <p className="text-gray-400 text-sm font-medium">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-xl shadow-gray-200/60">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={24} className="text-red-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">User Not Found</h2>
          <p className="text-gray-400 text-sm mb-6">{error ?? "This user does not exist."}</p>
          <button
            onClick={() => router.push("/admin/users")}
            className="px-6 py-2.5 bg-[#1a3c5e] text-white text-sm font-bold rounded-xl hover:bg-[#16324f] transition-colors"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">

        <button
          onClick={() => router.push("/admin/users")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#1a3c5e] font-medium mb-6 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Users
        </button>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          <div className="h-24 bg-gradient-to-r from-[#1a3c5e] to-[#1e4976]" />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg bg-amber-400 flex items-center justify-center overflow-hidden">
                {user.profilePicture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.profilePicture} alt={user.username} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#1a3c5e] text-3xl font-extrabold">{userInitial}</span>
                )}
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${statusStyle.classes}`}>
                {statusStyle.label}
              </span>
            </div>

            <h1 className="text-xl font-extrabold text-[#1a3c5e] tracking-tight">{user.username}</h1>
            {user.role && (
              <p className="text-amber-500 text-sm font-semibold mt-0.5">{user.role}</p>
            )}
            {user.bio && (
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{user.bio}</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Contact Information
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f0f4f8] flex items-center justify-center shrink-0">
                <Mail size={15} className="text-[#1a3c5e]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Email</p>
                <p className="text-sm font-semibold text-gray-700">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f0f4f8] flex items-center justify-center shrink-0">
                  <Phone size={15} className="text-[#1a3c5e]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Phone</p>
                  <p className="text-sm font-semibold text-gray-700">{user.phone}</p>
                </div>
              </div>
            )}

            {user.location && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f0f4f8] flex items-center justify-center shrink-0">
                  <MapPin size={15} className="text-[#1a3c5e]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Location</p>
                  <p className="text-sm font-semibold text-gray-700">{user.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center mb-2">
              <Briefcase size={16} className="text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-[#1a3c5e]">{user.appliedJobs ?? 0}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Jobs Applied</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center mb-2">
              <BadgeCheck size={16} className="text-green-500" />
            </div>
            <p className="text-2xl font-extrabold text-[#1a3c5e]">
              {status === "active" ? "Yes" : "No"}
            </p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Verified</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-2">
              <Clock size={16} className="text-blue-400" />
            </div>
            <p className="text-xs font-extrabold text-[#1a3c5e] leading-tight mt-1">
              {user.joinedAt
                ? new Date(user.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                : "—"}
            </p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Joined</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Account Info
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <div className="flex items-center gap-2 text-gray-400">
                <FileText size={14} />
                <span className="text-xs font-medium">User ID</span>
              </div>
              <span className="text-xs font-mono font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                {user.id}
              </span>
            </div>

            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar size={14} />
                <span className="text-xs font-medium">Joined On</span>
              </div>
              <span className="text-xs font-semibold text-gray-600">
                {user.joinedAt
                  ? new Date(user.joinedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2 text-gray-400">
                <BadgeCheck size={14} />
                <span className="text-xs font-medium">Account Status</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle.classes}`}>
                {statusStyle.label}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}