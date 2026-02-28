'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Heart, Share2, ChevronRight, Clock, Loader2 } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { API } from '@/lib/api/endpoints';

interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  minSalary?: number;
  maxSalary?: number;
  jobType: string;
  experienceLevel: string;
  category: string;
  description: string;
  requirements: string[];
  benefits: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = ["All", "Software Development", "Design & Creative", "Marketing", "Data & Analytics", "Consulting"];
const JOB_TYPES = ["All", "Full-Time", "Part-Time", "Contract", "Freelance", "Internship"];
const EXPERIENCE_LEVELS = ["All", "Entry Level", "Junior", "Mid-Level", "Senior", "Lead / Principal", "Executive"];

function timeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return '1 month ago';
  return `${months} months ago`;
}

function formatSalary(min?: number, max?: number): string {
  if (!min && !max) return 'Salary not disclosed';
  if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} NPR`;
  if (min) return `From ${min.toLocaleString()} NPR`;
  return `Up to ${max!.toLocaleString()} NPR`;
}

export default function BrowseJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filtered, setFiltered] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch(API.JOBS.GET_ALL);
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        const jobList = Array.isArray(data) ? data : data.jobs || data.data || [];
        setJobs(jobList);
        setFiltered(jobList);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let result = [...jobs];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.jobTitle.toLowerCase().includes(q) ||
          j.companyName.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'All') {
      result = result.filter((j) => j.category === activeCategory);
    }

    if (activeType !== 'All') {
      result = result.filter((j) => j.jobType === activeType);
    }

    if (activeLevel !== 'All') {
      result = result.filter((j) => j.experienceLevel === activeLevel);
    }

    setFiltered(result);
  }, [search, activeCategory, activeType, activeLevel, jobs]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />

      <main>
        <section className="py-16 px-6 lg:px-24 bg-slate-50/50">
          <div className="max-w-5xl">
            <h1 className="text-5xl font-extrabold mb-4">
              Find Your Dream <span className="text-blue-600">Job in Nepal</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-2xl">
              Browse thousands of job opportunities across various industries and find the perfect match for your skills.
            </p>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by job title, company, or location..."
                className="w-full pl-12 pr-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm bg-white"
              />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Job Type</p>
                <div className="flex flex-wrap gap-2">
                  {JOB_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        activeType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Experience Level</p>
                <div className="flex flex-wrap gap-2">
                  {EXPERIENCE_LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setActiveLevel(lvl)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        activeLevel === lvl
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 lg:px-24 max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <Loader2 size={36} className="animate-spin mb-4 text-blue-600" />
              <p className="text-sm font-medium">Loading jobs...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <p className="text-red-500 font-medium mb-2">Failed to load jobs</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <>
              <div className="mb-8 text-slate-500 font-medium">
                Showing {filtered.length} {filtered.length === 1 ? 'job' : 'jobs'}
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                  <Briefcase size={48} className="mb-4 opacity-30" />
                  <p className="text-lg font-semibold text-slate-500">No jobs found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filtered.map((job) => (
                    <div
                      key={job._id}
                      className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-xl flex-shrink-0 overflow-hidden">
                          {job.companyLogoUrl && (
                            <img
                              src={job.companyLogoUrl}
                              alt={job.companyName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold hover:text-blue-600 transition-colors cursor-pointer">
                            {job.jobTitle}
                          </h3>
                          <p className="text-slate-500 font-medium mb-3">{job.companyName}</p>
                          <div className="flex flex-wrap gap-y-2 gap-x-4">
                            <div className="flex items-center gap-1.5 text-sm text-slate-500">
                              <MapPin size={16} className="text-blue-600" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-slate-500">
                              <span className="text-blue-600 font-bold">₨</span>
                              {formatSalary(job.minSalary, job.maxSalary)}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-slate-500">
                              <Briefcase size={16} className="text-blue-600" />
                              {job.jobType}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-slate-500">
                              <Clock size={16} className="text-blue-600" />
                              {job.experienceLevel}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mt-4">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg uppercase">
                              {job.category}
                            </span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg">
                              {timeAgo(job.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
                          Apply Now <ChevronRight size={18} />
                        </button>
                        <button className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-400 transition-all">
                          <Heart size={20} />
                        </button>
                        <button className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-400 transition-all">
                          <Share2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        <section className="bg-white border-y border-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-24 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Jobs', value: `${jobs.length}+` },
              { label: 'Hiring Companies', value: `${new Set(jobs.map((j) => j.companyName)).size}+` },
              { label: 'Job Categories', value: `${new Set(jobs.map((j) => j.category)).size}` },
              { label: 'Job Market Leader', value: 'Nepal' },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl font-extrabold text-blue-600">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 lg:px-24">
          <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Didn't Find the Right Job?</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Create a profile and let companies find you. Get notified when jobs matching your preferences are posted.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold transition-all flex items-center gap-2 mx-auto">
                Create Free Profile <ChevronRight size={20} />
              </button>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}