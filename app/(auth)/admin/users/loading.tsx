export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-5">

        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#1a3c5e]/10 border-t-[#1a3c5e] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a3c5e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#1a3c5e] font-extrabold text-lg tracking-tight">
            Rojgar<span className="text-amber-400">.</span>
          </p>
          <p className="text-gray-400 text-xs font-medium mt-0.5 animate-pulse">
            Loading, please wait...
          </p>
        </div>

      </div>
    </div>
  );
}