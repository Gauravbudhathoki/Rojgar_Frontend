import React from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, 
  GraduationCap, Award, Edit3, Camera, 
  Globe, Linkedin, Twitter, Plus 
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:px-24">
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-blue-600" />
              <div className="relative mt-4">
                <div className="w-32 h-32 bg-slate-200 rounded-full border-4 border-white mx-auto overflow-hidden group relative">
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-4">Gaurav budhathoki</h2>
                <p className="text-blue-600 font-medium">Senior Web Developer</p>
                <div className="flex items-center justify-center gap-2 text-slate-500 mt-2 text-sm">
                  <MapPin size={16} /> Kathmandu, Nepal
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                  <Edit3 size={18} /> Edit Profile
                </button>
                <div className="flex justify-center gap-4">
                  <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"><Globe size={20} /></a>
                  <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
                  <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"><Twitter size={20} /></a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <User size={20} className="text-blue-600" /> Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400"><Mail size={18} /></div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                    <p className="text-sm font-medium">gaurav.budh@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400"><Phone size={18} /></div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Phone</p>
                    <p className="text-sm font-medium">+977 9801234567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-4">About Me</h3>
              <p className="text-slate-600 leading-relaxed">
                Passionate software engineer with over 5 years of experience in building scalable web applications. Expert in React, Node.js, and cloud architecture. I thrive on solving complex problems and contributing to open-source projects.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Briefcase size={22} className="text-blue-600" /> Work Experience
                </h3>
                <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"><Plus size={24} /></button>
              </div>
              <div className="space-y-8">
                {[
                  { role: "Senior Developer", company: "TechCore Nepal", date: "2021 - Present", desc: "Leading the frontend team in developing high-performance fintech dashboards." },
                  { role: "Junior Web Developer", company: "WebHimalaya", date: "2018 - 2021", desc: "Collaborated on various client projects using MERN stack and Tailwind CSS." }
                ].map((job, i) => (
                  <div key={i} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-blue-600 before:rounded-full before:z-10 after:absolute after:left-[5px] after:top-5 after:w-[2px] after:h-[calc(100%+20px)] after:bg-slate-100 last:after:hidden">
                    <h4 className="font-bold text-lg">{job.role}</h4>
                    <p className="text-blue-600 text-sm font-medium mb-2">{job.company} | {job.date}</p>
                    <p className="text-slate-500 text-sm">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Award size={22} className="text-blue-600" /> Skills & Expertise
                </h3>
                <button className="text-blue-600 text-sm font-bold hover:underline">Manage</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'AWS', 'Docker', 'GraphQL', 'Redux'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-sm font-semibold border border-slate-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <GraduationCap size={24} className="text-blue-600" /> Education
                </h3>
                <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"><Plus size={24} /></button>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0"><GraduationCap size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg">B.Sc. in Computer Science</h4>
                    <p className="text-slate-500">Tribhuvan University | 2014 - 2018</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}