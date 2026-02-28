"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Building2,
  Settings,
  ChevronRight,
} from "lucide-react";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/companies", label: "Companies", icon: Building2 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname?.startsWith(href);

  return (
    <aside className="fixed md:static top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#1a3c5e] to-[#122b45] border-r border-white/10 z-40 overflow-y-auto flex flex-col">
      
      <div className="p-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
            <Briefcase size={18} className="text-[#1a3c5e]" />
          </div>
          <div>
            <p className="font-extrabold text-white text-base tracking-tight leading-none">
              Rojgar<span className="text-amber-400">.</span>
            </p>
            <p className="text-white/40 text-[10px] font-medium mt-0.5 tracking-widest uppercase">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        <p className="text-white/30 text-[10px] font-semibold tracking-widest uppercase px-3 pt-3 pb-2">
          Main Menu
        </p>

        {ADMIN_LINKS.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-amber-400 text-[#1a3c5e] shadow-md shadow-amber-400/20"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon
                size={17}
                className={`shrink-0 transition-colors ${
                  active ? "text-[#1a3c5e]" : "text-white/40 group-hover:text-white/80"
                }`}
              />
              <span className="flex-1">{link.label}</span>
              {active && (
                <ChevronRight size={14} className="text-[#1a3c5e]/60 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-2xl p-4">
          <p className="text-white text-xs font-bold mb-1">Need Help?</p>
          <p className="text-white/40 text-[11px] leading-relaxed mb-3">
            Check our docs or contact support for assistance.
          </p>
          <a
            href="mailto:support@rojgar.com"
            className="block text-center bg-amber-400 text-[#1a3c5e] text-xs font-bold py-2 rounded-xl hover:bg-amber-300 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </aside>
  );
}