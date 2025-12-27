"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e]">
      <div className="bg-[#ffffff] p-10 rounded-xl text-center w-96">
        <Image
          src="/images/rojgarlogo.png" 
          alt="Rojgar Logo"
          width={200} 
          height={80}
          className="mx-auto mb-6"
        />

        <button
          onClick={() => router.push("/login")}
          className="w-full bg-black text-white py-2 rounded mb-4"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="w-full bg-black text-white py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}