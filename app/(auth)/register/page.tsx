"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation";
import InputField from "@/components/inputfield";
import Image from "next/image";
import { handleRegister } from "@/lib/actions/auth-action";
import { useState } from "react";
import { toast } from "react-toastify";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      const result = await handleRegister(data);

      if (result.success) {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      } else {
        toast.error(result.message ?? "Registration failed");
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Registration failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#1e1e1e]">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#ffffff]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 w-96 border border-black rounded-xl"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-black">REGISTER</h1>

          <InputField 
            label="Username" 
            type="text" 
            register={register("username")} 
            error={errors.username} 
            placeholder="Enter your username"
          />
          <InputField 
            label="Email" 
            type="email" 
            register={register("email")} 
            error={errors.email}
            placeholder="Enter your email"
          />
          <InputField 
            label="Password" 
            type="password" 
            register={register("password")} 
            error={errors.password}
            placeholder="Enter your password"
          />
          <InputField 
            label="Confirm Password" 
            type="password" 
            register={register("confirmPassword")} 
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />

          <button 
            type="submit" 
            className="w-full bg-black text-white py-2 rounded mt-4"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-center mt-4 text-sm text-black">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="font-bold cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>

      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#4a4a4a] text-white p-8">
        <Image
          src="/images/image1.png"
          alt="Rojgar Image"
          width={400}
          height={400}
          className="mb-6"
        />
        <h2 className="text-3xl font-bold text-center mt-4">
          Hire Smarter. Work Better.
        </h2>
      </div>
    </div>
  );
}