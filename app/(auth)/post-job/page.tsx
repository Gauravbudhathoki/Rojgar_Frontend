'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { API } from '@/lib/api/endpoints';

interface FormState {
  jobTitle: string;
  companyName: string;
  logoUrl: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  jobType: string;
  experienceLevel: string;
  category: string;
  description: string;
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export default function PostJobPage() {
  const router = useRouter();
  const [requirements, setRequirements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [reqInput, setReqInput] = useState<string>('');
  const [benInput, setBenInput] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [form, setForm] = useState<FormState>({
    jobTitle: '',
    companyName: '',
    logoUrl: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    jobType: '',
    experienceLevel: '',
    category: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Logo file must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const addReq = () => {
    if (reqInput.trim()) {
      setRequirements([...requirements, reqInput.trim()]);
      setReqInput('');
    }
  };

  const addBen = () => {
    if (benInput.trim()) {
      setBenefits([...benefits, benInput.trim()]);
      setBenInput('');
    }
  };

  const removeReq = (idx: number) =>
    setRequirements(requirements.filter((_, i) => i !== idx));

  const removeBen = (idx: number) =>
    setBenefits(benefits.filter((_, i) => i !== idx));

  const locations: { value: string; label: string }[] = [
    { value: 'Remote', label: 'Remote' },
    { value: 'Kathmandu, Nepal', label: 'Kathmandu, Nepal' },
    { value: 'Pokhara, Nepal', label: 'Pokhara, Nepal' },
    { value: 'Lalitpur, Nepal', label: 'Lalitpur, Nepal' },
    { value: 'Bhaktapur, Nepal', label: 'Bhaktapur, Nepal' },
    { value: 'Biratnagar, Nepal', label: 'Biratnagar, Nepal' },
    { value: 'Birgunj, Nepal', label: 'Birgunj, Nepal' },
  ];

  const jobTypes: string[] = ['Full-Time', 'Part-Time', 'Contract', 'Freelance', 'Internship'];
  const experienceLevels: string[] = ['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead / Principal', 'Executive'];
  const categories: string[] = [
    'Software Development',
    'Design & Creative',
    'Marketing',
    'Sales',
    'Finance & Accounting',
    'HR & Recruitment',
    'Operations',
    'Customer Support',
    'Data & Analytics',
    'Other',
  ];

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white';

  const selectClass =
    'w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-500 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition';

  const labelClass = 'block text-sm text-gray-700 mb-1.5';
  const cardClass = 'bg-white border border-gray-200 rounded-xl p-8 mb-5 shadow-sm';

  const validateForm = (): boolean => {
    if (!form.jobTitle.trim()) {
      setError('Job title is required');
      return false;
    }
    if (!form.companyName.trim()) {
      setError('Company name is required');
      return false;
    }
    if (!form.location) {
      setError('Location is required');
      return false;
    }
    if (!form.jobType) {
      setError('Job type is required');
      return false;
    }
    if (!form.experienceLevel) {
      setError('Experience level is required');
      return false;
    }
    if (!form.category) {
      setError('Category is required');
      return false;
    }
    if (!form.description.trim()) {
      setError('Job description is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getAuthToken();

    if (!token) {
      setError('Please login to post a job');
      router.push('/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('jobTitle', form.jobTitle);
      formData.append('companyName', form.companyName);
      formData.append('location', form.location);
      formData.append('jobType', form.jobType);
      formData.append('experienceLevel', form.experienceLevel);
      formData.append('category', form.category);
      formData.append('description', form.description);

      if (form.salaryMin) formData.append('minSalary', form.salaryMin);
      if (form.salaryMax) formData.append('maxSalary', form.salaryMax);
      if (form.logoUrl) formData.append('companyLogoUrl', form.logoUrl);
      if (logoFile) formData.append('companyLogo', logoFile);

      requirements.forEach((req) => formData.append('requirements', req));
      benefits.forEach((ben) => formData.append('benefits', ben));

      const response = await fetch(API.JOBS.CREATE, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseText = await response.text();

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error(`Server returned invalid JSON. Status: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(result.message || 'Failed to post job');
      }

      setSuccess('Job has been created successfully!');
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Something went wrong');
      if (err.message?.includes('token') || err.message?.includes('Unauthorized') || err.message?.includes('login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Go Back
        </button>

        <h1 className="text-4xl font-black text-gray-900 mb-1 tracking-tight">Post a Job</h1>
        <p className="text-sm text-gray-400 mb-8">
          Fill in the details below to post a new job opportunity
        </p>

        <hr className="border-gray-200 mb-8" />

        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className={cardClass}>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Basic Information</h2>

            <div className="mb-5">
              <label className={labelClass}>
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="e.g., Senior Full-Stack Developer"
                className={inputClass}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Company Logo</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                  >
                    {logoFile ? 'Change Logo' : 'Upload Logo'}
                  </label>
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Preview"
                      className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                    />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Max 5MB • JPG, PNG, WebP</p>
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Location & Compensation</h2>

            <div className="mb-5">
              <label className={labelClass}>
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className={selectClass}
                  required
                >
                  <option value="">Select a location</option>
                  {locations.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Minimum Salary (NPR)</label>
                <input
                  type="number"
                  name="salaryMin"
                  value={form.salaryMin}
                  onChange={handleChange}
                  placeholder="e.g., 60000"
                  className={inputClass}
                  min="0"
                />
              </div>
              <div>
                <label className={labelClass}>Maximum Salary (NPR)</label>
                <input
                  type="number"
                  name="salaryMax"
                  value={form.salaryMax}
                  onChange={handleChange}
                  placeholder="e.g., 80000"
                  className={inputClass}
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Job Details</h2>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelClass}>
                  Job Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    className={selectClass}
                    required
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map((j) => (
                      <option key={j} value={j}>
                        {j}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="experienceLevel"
                    value={form.experienceLevel}
                    onChange={handleChange}
                    className={selectClass}
                    required
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={selectClass}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Job Description</h2>
            <div>
              <label className={labelClass}>
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={7}
                placeholder="Provide a detailed description of the job role, responsibilities, and what makes this opportunity unique..."
                className={`${inputClass} resize-none leading-relaxed`}
                required
              />
            </div>
          </div>

          <div className={cardClass}>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Requirements</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addReq())}
                placeholder="e.g., 5+ years of React experience"
                className={inputClass}
              />
              <button
                type="button"
                onClick={addReq}
                className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition text-xl"
              >
                +
              </button>
            </div>
            {requirements.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {requirements.map((r, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {r}
                    <button
                      type="button"
                      onClick={() => removeReq(i)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={cardClass}>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Benefits</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={benInput}
                onChange={(e) => setBenInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBen())}
                placeholder="e.g., Health Insurance, Remote Work, Stock Options"
                className={inputClass}
              />
              <button
                type="button"
                onClick={addBen}
                className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition text-xl"
              >
                +
              </button>
            </div>
            {benefits.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {benefits.map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {b}
                    <button
                      type="button"
                      onClick={() => removeBen(i)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end items-center gap-3 pt-2 pb-12">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Post Job
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}