"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import InputField from "@/components/inputfield";
import Image from "next/image";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex bg-[#1e1e1e]">
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#4a4a4a] text-white p-8">
        <Image
          src="/images/image.png"
          alt="Rojgar Image"
          width={400}
          height={400} 
          className="mb-6"
        />
        <h2 className="text-3xl font-bold text-center">
          Connecting Talent with Opportunity
        </h2>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#ffffff]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#ffffff] p-8 w-96 rounded-xl border border-black"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-black">LOG IN</h1>

          <InputField
            label="Email"
            type="email"
            register={register("email")}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            register={register("password")}
            error={errors.password}
          />

          <button className="w-full bg-black text-white py-2 rounded mt-4">
            Login
          </button>

          <p className="text-center mt-4 text-sm text-black">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="font-bold cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}