import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </div>
          <span className="text-xl font-semibold text-blue-600">
            Rojgar
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/jobs" className="hover:text-blue-600">
            Browse Jobs
          </Link>
          <Link href="/companies" className="hover:text-blue-600">
            Companies
          </Link>
          <Link href="/profile" className="hover:text-blue-600">
            Profile
          </Link>
        </nav>

        {/* CTA Button */}
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
