"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `relative pb-1 ${isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"} ${isActive ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600" : ""}`;
  };

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </div>
          <span className="text-xl font-semibold text-blue-600">
            Rojgar
          </span>
        </div>

        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/browse-job" className={getLinkClass("/browse-job")}>
            Browse Jobs
          </Link>
          <Link href="/companies" className={getLinkClass("/companies")}>
            Companies
          </Link>
          <Link href="/profile" className={getLinkClass("/profile")}>
            Profile
          </Link>
        </nav>

        <Link
          href="/post-job"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Post a Job
        </Link>
      </div>
    </header>
  );
};

export default Header;