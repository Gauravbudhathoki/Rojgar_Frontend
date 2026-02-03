import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <div className="text-2xl font-bold text-blue-600">Rojgar</div>
          <p className="text-slate-500 leading-relaxed">
            The leading job portal in Nepal, connecting talented professionals with top companies. Start your career journey with us today.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
              <Linkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">For Job Seekers</h4>
          <ul className="space-y-4 text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Browse Jobs</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Career Advice</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Resume Builder</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Job Alerts</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">For Employers</h4>
          <ul className="space-y-4 text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Post a Job</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Browse Candidates</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing Plans</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Recruiting Solutions</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-slate-500">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-blue-600 mt-1" />
              <span>New Baneshwor, Kathmandu, Nepal</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-blue-600" />
              <span>+977 1-4000000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-blue-600" />
              <span>support@rojgar.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Rojgar. All rights reserved.
        </p>
        <div className="flex gap-8 text-sm text-slate-400">
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms of Service</a>
          <a href="#" className="hover:text-blue-600">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}