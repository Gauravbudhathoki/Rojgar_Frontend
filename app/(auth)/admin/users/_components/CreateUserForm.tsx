"use client";

import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/(auth)/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleCreateUser } from "@/lib/actions/admin/user-action";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ImagePlus,
  X,
  Loader2,
  UserPlus,
} from "lucide-react";

export default function CreateUserForm({ onSuccess }: { onSuccess?: () => void }) {
  const [pending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
  });

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: UserData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        if (data.profilePicture) formData.append("profilePicture", data.profilePicture);

        const response = await handleCreateUser(formData);

        if (!response.success) throw new Error(response.message || "Failed to create user");

        reset();
        handleDismissImage();
        toast.success("User created successfully!");
        onSuccess?.();
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to create user";
        toast.error(message);
      }
    });
  };

  const isLoading = isSubmitting || pending;

  const inputClass =
    "flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#1a3c5e] focus-within:ring-2 focus-within:ring-[#1a3c5e]/10 transition-all bg-white";
  const fieldClass = "flex-1 text-gray-800 text-sm outline-none bg-transparent placeholder-gray-300";
  const labelClass = "text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5";
  const errorClass = "mt-1.5 text-xs text-red-500 font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      <div className="flex flex-col items-center gap-3 pb-5 border-b border-gray-100">
        <div className="relative">
          {previewImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage}
                alt="Profile preview"
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <Controller
                name="profilePicture"
                control={control}
                render={({ field: { onChange } }) => (
                  <button
                    type="button"
                    onClick={() => handleDismissImage(onChange)}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                  >
                    <X size={12} />
                  </button>
                )}
              />
            </>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-[#f0f4f8] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1">
              <User size={22} className="text-gray-300" />
              <span className="text-[10px] text-gray-300 font-medium">No Photo</span>
            </div>
          )}
        </div>

        <Controller
          name="profilePicture"
          control={control}
          render={({ field: { onChange } }) => (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-[#f0f4f8] hover:bg-[#e2eaf3] text-[#1a3c5e] text-xs font-bold rounded-xl transition-colors"
              >
                <ImagePlus size={14} />
                {previewImage ? "Change Photo" : "Upload Photo"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
              />
            </>
          )}
        />
        {errors.profilePicture && (
          <p className={errorClass}>{errors.profilePicture.message as string}</p>
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="username">Username</label>
        <div className={inputClass}>
          <User size={15} className="text-gray-400 shrink-0" />
          <input
            id="username"
            type="text"
            placeholder="e.g., johndoe"
            className={fieldClass}
            {...register("username")}
          />
        </div>
        {errors.username && <p className={errorClass}>{errors.username.message}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="email">Email Address</label>
        <div className={inputClass}>
          <Mail size={15} className="text-gray-400 shrink-0" />
          <input
            id="email"
            type="email"
            placeholder="e.g., john@example.com"
            className={fieldClass}
            {...register("email")}
          />
        </div>
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="password">Password</label>
        <div className={inputClass}>
          <Lock size={15} className="text-gray-400 shrink-0" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`${fieldClass} pr-2`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="confirmPassword">Confirm Password</label>
        <div className={inputClass}>
          <Lock size={15} className="text-gray-400 shrink-0" />
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            className={`${fieldClass} pr-2`}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1a3c5e] text-white text-sm font-bold rounded-2xl hover:bg-[#16324f] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#1a3c5e]/20"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating User...
          </>
        ) : (
          <>
            <UserPlus size={16} />
            Create User
          </>
        )}
      </button>
    </form>
  );
}