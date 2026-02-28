"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { LogOut, X, Briefcase, ChevronDown } from "lucide-react";

export default function Header() {
  const { logout, user } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userInitial = user?.email ? user.email[0].toUpperCase() : "A";
  const userName = user?.email || "Admin";

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1a3c5e] to-[#1e4976] border-b border-white/10 shadow-lg">
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex h-16 items-center justify-between">

            {/* Brand Logo */}
            <div className="flex items-center gap-2.5">
              <div className="bg-amber-400 p-1.5 rounded-lg">
                <Briefcase size={18} className="text-[#1a3c5e]" />
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">
                Rojgar
                <span className="text-amber-400">.</span>
              </span>
            </div>

            {/* Right: User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((v) => !v)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-150 group"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-[#1a3c5e] font-bold text-sm shrink-0">
                  {userInitial}
                </div>
                {/* Email */}
                <span className="hidden sm:block text-sm text-white/80 group-hover:text-white max-w-[160px] truncate transition-colors">
                  {userName}
                </span>
                <ChevronDown
                  size={15}
                  className={`text-white/50 transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-700 truncate">{userName}</p>
                  </div>
                  {/* Logout option */}
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Overlay to close dropdown */}
        {showUserMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowUserMenu(false)}
          />
        )}
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="text-center">
              {/* Icon */}
              <div className="relative w-16 h-16 mx-auto mb-5">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-30" />
                <div className="relative bg-red-50 w-16 h-16 rounded-full flex items-center justify-center border-2 border-red-100">
                  <LogOut size={26} className="text-red-500" />
                </div>
              </div>

              {/* Text */}
              <h2 className="text-xl font-extrabold text-gray-800 mb-2 tracking-tight">
                Sign out of Rojgar?
              </h2>
              <p className="text-sm text-gray-500 mb-7 leading-relaxed">
                You&apos;ll be logged out of your account. Sign in again anytime to continue.
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-colors"
                >
                  Stay
                </button>
                <button
                  onClick={() => {
                    setShowLogoutModal(false);
                    logout();
                  }}
                  className="flex-1 py-3 bg-red-500 text-white rounded-2xl text-sm font-bold hover:bg-red-600 active:scale-95 transition-all"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}