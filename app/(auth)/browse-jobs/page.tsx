import React from 'react';
import { Search, MapPin, Briefcase, Heart, Share2, ChevronRight, Clock } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function BrowseJobs() {
  const categories = ["All", "Software Development", "Design", "Marketing", "Data & Analytics", "Consulting"];
  const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Freelance"];
  const experienceLevels = ["All", "0-2 years", "2-4 years", "3-5 years", "5+ years"];

  const jobs = [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCore Solutions",
      location: "Kathmandu",
      salary: "60,000 - 80,000 NPR",
      type: "Full-time",
      experience: "5+ years",
      category: "Software Development",
      posted: "2 days ago"
    },
    {
      title: "UX/UI Designer",
      company: "Creative Minds",
      location: "Pokhara",
      salary: "40,000 - 55,000 NPR",
      type: "Full-time",
      experience: "2-4 years",
      category: "Design",
      posted: "3 days ago"
    },
    {
      title: "Marketing Manager",
      company: "Growth Ventures",
      location: "Lalitpur",
      salary: "50,000 - 70,000 NPR",
      type: "Full-time",
      experience: "3-5 years",
      category: "Marketing",
      posted: "5 days ago"
    }
  ];

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
                placeholder="Search by job title, company, or location..." 
                className="w-full pl-12 pr-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm bg-white"
              />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, i) => (
                    <button key={cat} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Job Type</p>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map((type, i) => (
                    <button key={type} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Experience Level</p>
                <div className="flex flex-wrap gap-2">
                  {experienceLevels.map((lvl, i) => (
                    <button key={lvl} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 lg:px-24 max-w-7xl mx-auto">
          <div className="mb-8 text-slate-500 font-medium">
            Showing 10 jobs
          </div>

          <div className="space-y-6">
            {jobs.map((job, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl flex-shrink-0 overflow-hidden" />
                  <div>
                    <h3 className="text-xl font-bold hover:text-blue-600 transition-colors cursor-pointer">{job.title}</h3>
                    <p className="text-slate-500 font-medium mb-3">{job.company}</p>
                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin size={16} className="text-blue-600" /> {job.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <span className="text-blue-600 font-bold">$</span> {job.salary}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Briefcase size={16} className="text-blue-600" /> {job.type}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Briefcase size={16} className="text-blue-600" /> {job.experience}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg uppercase">
                        {job.category}
                      </span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg">
                        {job.posted}
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
        </section>

        <section className="bg-white border-y border-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-24 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Jobs', value: '10+' },
              { label: 'Hiring Companies', value: '7+' },
              { label: 'Job Categories', value: '5' },
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