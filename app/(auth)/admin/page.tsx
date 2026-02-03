"use client";
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Building2, 
  CheckCircle, 
  XCircle, 
  Search, 
  Bell, 
  MoreVertical,
  TrendingUp,
  Plus
} from 'lucide-react';
import Header from '@/components/header';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Jobs', value: '1,284', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Users', value: '42,850', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Companies', value: '856', icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Applications', value: '12,402', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const recentJobs = [
    { id: "JOB-001", title: "Frontend Developer", company: "TechCore", status: "Active", date: "2024-05-20" },
    { id: "JOB-002", title: "Marketing Lead", company: "Growth Ventures", status: "Pending", date: "2024-05-19" },
    { id: "JOB-003", title: "UX Researcher", company: "Creative Minds", status: "Closed", date: "2024-05-18" },
    { id: "JOB-004", title: "Data Analyst", company: "Analytics Plus", status: "Active", date: "2024-05-18" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      
      <div className="flex">
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-[calc(100vh-80px)] sticky top-20 p-6">
          <div className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'jobs', label: 'Manage Jobs', icon: Briefcase },
              { id: 'companies', label: 'Companies', icon: Building2 },
              { id: 'users', label: 'User Directory', icon: Users },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="bg-slate-900 rounded-2xl p-4 text-white">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">System Health</p>
              <p className="text-sm font-bold mb-3">All systems operational</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[95%]"></div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
              <p className="text-slate-500 font-medium">Welcome back, Managing the Rojgar ecosystem.</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              <Plus size={20} />
              Post New Job
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xl font-bold">Recent Job Postings</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter jobs..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-black tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Job ID</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentJobs.map((job, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-sm text-slate-400">{job.id}</td>
                      <td className="px-6 py-4 font-bold text-sm">{job.title}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{job.company}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          job.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 
                          job.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{job.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                            <CheckCircle size={18} />
                          </button>
                          <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                            <XCircle size={18} />
                          </button>
                          <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 border-t border-slate-50 bg-slate-50/30">
              <button className="text-blue-600 font-bold text-sm hover:underline">View all job listings</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}