import React from 'react';
import { Search, MapPin, Briefcase, Users, CheckCircle, TrendingUp, ChevronRight } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />
      
      <main>
        <section className="relative px-6 py-20 lg:px-24 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
          <div className="z-10 max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
              Find Your Dream <span className="text-blue-600">Job in Nepal</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg">
              Discover thousands of opportunities with all the information you need. Your next career move starts here.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all">
                <Search size={20} />
                Browse Jobs
              </button>
              <button className="border border-slate-200 hover:bg-slate-50 px-8 py-4 rounded-lg font-semibold transition-all">
                For Employers
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative w-1/3 aspect-square bg-gradient-to-br from-blue-50 to-pink-50 rounded-3xl items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Briefcase size={200} className="text-blue-600" />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 px-6">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Search Thousands of Jobs</h2>
            <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
              <div className="flex-1 flex items-center px-4 py-3 gap-3 border-b md:border-b-0 md:border-r border-slate-100">
                <Search className="text-slate-400" size={20} />
                <input type="text" placeholder="Job title or keyword..." className="w-full outline-none bg-transparent" />
              </div>
              <div className="flex-1 flex items-center px-4 py-3 gap-3">
                <MapPin className="text-slate-400" size={20} />
                <input type="text" placeholder="City or location..." className="w-full outline-none bg-transparent" />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-bold transition-all">
                Search
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Jobs', value: '2,500+', icon: Briefcase },
              { label: 'Companies', value: '850+', icon: Users },
              { label: 'Successful Placements', value: '15,000+', icon: CheckCircle },
              { label: 'Users', value: '50,000+', icon: TrendingUp },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl font-extrabold text-blue-600">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 lg:px-24">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Featured Jobs</h2>
            <p className="text-slate-500">Explore the latest job openings from top companies</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {[
              { title: "Senior Full-Stack Developer", company: "TechCore Solutions", loc: "Kathmandu", sal: "60,000 - 80,000 NPR" },
              { title: "UX/UI Designer", company: "Creative Minds", loc: "Pokhara", sal: "40,000 - 55,000 NPR" },
              { title: "Marketing Manager", company: "Growth Ventures", loc: "Lalitpur", sal: "50,000 - 70,000 NPR" },
              { title: "Data Analyst", company: "Analytics Plus", loc: "Kathmandu", sal: "45,000 - 65,000 NPR" }
            ].map((job, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl" />
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{job.title}</h3>
                    <p className="text-slate-500">{job.company}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <MapPin size={16} /> {job.loc}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                    <span className="text-emerald-600">$</span> {job.sal}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Briefcase size={16} /> Full-time
                  </div>
                </div>
                <button className="w-full py-3 rounded-lg border border-slate-200 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                  View Job <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-white text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-500 mb-16">Get started with Rojgar in just 4 simple steps</p>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-6">
            {[
              { step: 1, title: 'Create Profile', desc: 'Build your professional profile with your skills and experience', icon: Users },
              { step: 2, title: 'Search Jobs', desc: 'Browse through hundreds of job opportunities across Nepal', icon: Search },
              { step: 3, title: 'Apply & Match', desc: 'Apply to positions that match your qualifications', icon: CheckCircle },
              { step: 4, title: 'Get Hired', desc: 'Connect with employers and land your dream job', icon: TrendingUp },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold z-10">
                  {item.step}
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-8 h-full flex flex-col items-center hover:border-blue-200 transition-colors relative">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  {i < 3 && <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 text-slate-300"><ChevronRight size={32} /></div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 lg:px-24 flex flex-col lg:flex-row items-center gap-16 bg-slate-50">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-bold">Recruiting Talent?</h2>
            <p className="text-lg text-slate-600">Find and hire the best talent in Nepal with our powerful recruiting tools.</p>
            <ul className="space-y-4">
              {['Post unlimited job listings', 'Reach thousands of qualified candidates', 'Advanced candidate screening tools', 'Dedicated employer support'].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="text-blue-600"><CheckCircle size={20} /></div>
                  {text}
                </li>
              ))}
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-bold transition-all shadow-lg shadow-blue-200">
              Start Recruiting
            </button>
          </div>
          <div className="flex-1 w-full max-w-xl aspect-square bg-white rounded-3xl shadow-xl flex items-center justify-center opacity-40">
             <Briefcase size={120} className="text-slate-200" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}