"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleCreateJob } from "@/lib/actions/admin/job-action";
import {
  Briefcase,
  MapPin,
  CalendarDays,
  Users,
  DollarSign,
  FileText,
  ImagePlus,
  X,
  PlusCircle,
  Loader2,
  Building2,
  Clock,
} from "lucide-react";

type JobType = "full-time" | "part-time";
type JobCategory = "technology" | "finance" | "healthcare" | "education" | "hospitality" | "other";

export default function AddJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jobType, setJobType] = useState<JobType>("full-time");
  const [category, setCategory] = useState<JobCategory>("technology");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const CATEGORIES: { value: JobCategory; label: string; emoji: string }[] = [
    { value: "technology", label: "Technology", emoji: "💻" },
    { value: "finance", label: "Finance", emoji: "💰" },
    { value: "healthcare", label: "Healthcare", emoji: "🏥" },
    { value: "education", label: "Education", emoji: "🎓" },
    { value: "hospitality", label: "Hospitality", emoji: "🏨" },
    { value: "other", label: "Other", emoji: "📋" },
  ];

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const removeBanner = () => {
    setBannerFile(null);
    setBannerPreview(null);
    if (bannerInputRef.current) bannerInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) { toast.error("Please enter job title"); return; }
    if (!company.trim()) { toast.error("Please enter company name"); return; }
    if (!location.trim()) { toast.error("Please enter job location"); return; }
    if (!deadline) { toast.error("Please select an application deadline"); return; }
    if (new Date(deadline) < new Date()) { toast.error("Deadline must be a future date"); return; }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("type", jobType);
      formData.append("category", category);
      formData.append("company", company.trim());
      formData.append("location", location.trim());
      formData.append("deadline", deadline);
      if (salary.trim()) formData.append("salary", salary.trim());
      if (vacancies.trim()) formData.append("vacancies", vacancies.trim());
      if (description.trim()) formData.append("description", description.trim());
      if (bannerFile) formData.append("bannerImage", bannerFile);

      const response = await handleCreateJob(formData);

      if (response.success) {
        toast.success("Job listing created successfully!");
        router.push("/admin/jobs");
      } else {
        toast.error(response.message || "Failed to create job listing");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#1a3c5e] focus-within:ring-2 focus-within:ring-[#1a3c5e]/10 transition-all";
  const inputField =
    "flex-1 text-gray-800 text-sm outline-none bg-transparent placeholder-gray-300";
  const labelClass =
    "text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5";

  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-md shadow-amber-200">
            <Briefcase size={18} className="text-[#1a3c5e]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight">
              Post a Job
            </h1>
            <p className="text-gray-400 text-sm">Create a new job listing on Rojgar</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm flex gap-1.5">
            {(["full-time", "part-time"] as JobType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setJobType(type)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  jobType === type
                    ? "bg-[#1a3c5e] text-white shadow-sm"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                <Clock size={15} />
                {type === "full-time" ? "Full Time" : "Part Time"}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className={labelClass}>Job Category</p>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                    category === cat.value
                      ? "bg-amber-400 border-amber-400 text-[#1a3c5e]"
                      : "bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className={labelClass}>Company Banner</p>
            <div className="flex gap-3 items-start">
              <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                className="w-24 h-24 shrink-0 flex flex-col items-center justify-center gap-1.5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#1a3c5e] hover:bg-blue-50/40 transition-all group"
              >
                <div className="w-9 h-9 bg-[#1a3c5e] rounded-lg flex items-center justify-center group-hover:bg-[#16324f] transition-colors">
                  <ImagePlus size={18} className="text-white" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Add Banner</span>
              </button>
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerChange}
              />

              {bannerPreview ? (
                <div className="relative flex-1 h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-9 rounded-b-xl bg-gradient-to-t from-black/55 to-transparent flex items-end px-2.5 pb-1.5">
                    <span className="text-white text-xs font-semibold">
                      {title || "Job Banner"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeBanner}
                    className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X size={11} className="text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex-1 h-24 bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1.5">
                  <Briefcase size={24} className="text-gray-200" />
                  <span className="text-xs text-gray-300">Banner preview</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
            <p className={labelClass}>Job Details</p>

            <div>
              <label className={labelClass}>
                Job Title <span className="text-red-400">*</span>
              </label>
              <div className={inputClass}>
                <Briefcase size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className={inputField}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Company Name <span className="text-red-400">*</span>
              </label>
              <div className={inputClass}>
                <Building2 size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Leapfrog Technology"
                  className={inputField}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Location <span className="text-red-400">*</span>
              </label>
              <div className={inputClass}>
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Kathmandu, Nepal"
                  className={inputField}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Application Deadline <span className="text-red-400">*</span>
              </label>
              <div
                className={`rounded-xl p-3.5 border transition-all duration-200 ${
                  deadline ? "bg-[#1a3c5e] border-[#1a3c5e]" : "bg-white border-gray-200"
                }`}
              >
                <div className={`flex items-center gap-1 mb-1 ${deadline ? "text-white/60" : "text-gray-400"}`}>
                  <CalendarDays size={12} />
                  <span className="text-xs font-medium">Deadline</span>
                </div>
                <input
                  type="date"
                  value={deadline}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDeadline(e.target.value)}
                  className={`w-full text-sm font-bold outline-none bg-transparent cursor-pointer ${
                    deadline ? "text-white" : "text-gray-500"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Salary</label>
                <div className={inputClass}>
                  <DollarSign size={16} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g., NPR 80,000"
                    className={inputField}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Vacancies</label>
                <div className={inputClass}>
                  <Users size={16} className="text-gray-400 shrink-0" />
                  <input
                    type="number"
                    value={vacancies}
                    onChange={(e) => setVacancies(e.target.value)}
                    placeholder="e.g., 3"
                    min={1}
                    className={inputField}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Job Description</label>
              <div className="flex gap-3 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-[#1a3c5e] focus-within:ring-2 focus-within:ring-[#1a3c5e]/10 transition-all">
                <FileText size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe responsibilities, requirements, benefits..."
                  rows={4}
                  className="flex-1 text-gray-800 text-sm outline-none bg-transparent placeholder-gray-300 resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#1a3c5e] text-white rounded-2xl font-bold text-sm hover:bg-[#16324f] active:scale-[0.98] transition-all shadow-lg shadow-[#1a3c5e]/20 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                <PlusCircle size={20} />
                Post Job Listing
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}