import React from 'react';
import { Search, MapPin, Briefcase, Users, Star, ExternalLink, Globe, Mail, Heart, Share2, ChevronRight } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function CompaniesPage() {
  const categories = [
    "All", "Software Development", "Design & Branding", 
    "Data & Analytics", "Consulting", "Cloud & Infrastructure", 
    "Marketing & E-commerce"
  ];

  const companies = [
    {
      name: "TechCore Solutions",
      rating: 4.5,
      reviews: 128,
      tag: "Software Development",
      desc: "Leading software development company delivering innovative tech solutions across Nepal and Southeast Asia.",
      loc: "Kathmandu, Nepal",
      jobs: "12 positions",
      size: "50-100",
      founded: "2015",
      site: "techcoresolutions.com",
      email: "careers@techcore.com"
    },
    {
      name: "Creative Minds",
      rating: 4.7,
      reviews: 95,
      tag: "Design & Branding",
      desc: "Digital agency specializing in UX/UI design, branding, and web development for startups and enterprises.",
      loc: "Pokhara, Nepal",
      jobs: "8 positions",
      size: "20-50",
      founded: "2018",
      site: "creativemindsnepal.com",
      email: "hello@creativeminds.com"
    },
    {
      name: "Growth Ventures",
      rating: 4.6,
      reviews: 87,
      tag: "Consulting",
      desc: "Venture capital and growth consulting firm empowering startups to scale rapidly in the South Asian market.",
      loc: "Lalitpur, Nepal",
      jobs: "6 positions",
      size: "30-75",
      founded: "2017",
      site: "growthventures.np",
      email: "team@growthventures.com"
    },
    {
      name: "Analytics Plus",
      rating: 4.4,
      reviews: 72,
      tag: "Data & Analytics",
      desc: "Data analytics and business intelligence company helping organizations make data-driven decisions.",
      loc: "Kathmandu, Nepal",
      jobs: "10 positions",
      size: "40-80",
      founded: "2016",
      site: "analyticsplus.com",
      email: "careers@analyticsplus.com"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />

      <main>
        <section className="py-16 px-6 lg:px-24 bg-slate-50/50">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-extrabold mb-4">
              Discover Top <span className="text-blue-600">Companies in Nepal</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              Explore leading organizations, learn about their culture, and find exciting career opportunities.
            </p>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search companies by name..." 
                className="w-full pl-12 pr-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((cat, i) => (
                <button 
                  key={cat}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                    i === 0 
                    ? "bg-blue-600 border-blue-600 text-white" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6 lg:px-24 max-w-7xl mx-auto">
          <div className="mb-8 text-slate-500 font-medium">
            Showing {companies.length * 2} companies
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {companies.map((co, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{co.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold">{co.rating}</span>
                        <span className="text-sm text-slate-400">({co.reviews} reviews)</span>
                      </div>
                      <span className="inline-block mt-3 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg uppercase tracking-wider">
                        {co.tag}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {co.desc}
                </p>

                <div className="grid grid-cols-2 gap-y-4 mb-8">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 uppercase font-bold">Location</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <MapPin size={14} className="text-blue-600" /> {co.loc}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 uppercase font-bold">Open Jobs</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Briefcase size={14} className="text-blue-600" /> {co.jobs}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 uppercase font-bold">Company Size</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Users size={14} className="text-blue-600" /> {co.size}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 uppercase font-bold">Founded</p>
                    <div className="text-sm font-medium">{co.founded}</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-slate-400 text-sm hover:text-blue-600 cursor-pointer transition-colors">
                    <Globe size={14} /> {co.site}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm hover:text-blue-600 cursor-pointer transition-colors">
                    <Mail size={14} /> {co.email}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                    View Company <ChevronRight size={18} />
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-all">
                    <Heart size={20} />
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all">
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
              { label: 'Top Companies', value: '8+' },
              { label: 'Open Positions', value: '78+' },
              { label: 'Average Rating', value: '4.5' },
              { label: 'Total Reviews', value: '686+' },
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
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Ready to Join a Top Company?</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Explore more job opportunities and apply to companies that align with your career goals.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold transition-all flex items-center gap-2 mx-auto">
                Browse Jobs <ChevronRight size={20} />
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