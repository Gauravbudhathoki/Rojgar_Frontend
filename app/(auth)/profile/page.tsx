"use client";

import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { toast } from "react-toastify";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { 
  User, Mail, Phone, MapPin, Briefcase, 
  GraduationCap, Award, Edit3, Camera, 
  Globe, Linkedin, Twitter, Plus, LogOut, X 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, setUser, logout, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (!loading && !user) {
        await refreshUser();
      }
    };
    loadUserData();
  }, [loading, user, refreshUser]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      
      const response = await handleUpdateProfile(formData);
      
      if (response.success && response.user) {
        setUser(response.user);
        toast.success("Profile image updated successfully!");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(response.message || "Update failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An unexpected error occurred during upload");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const getImageUrl = (imagePath?: string | null) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";
    const timestamp = new Date().getTime();
    return `${baseUrl}/${imagePath}?t=${timestamp}`;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-md w-full mx-4">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={40} className="text-slate-300" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Please log in</h1>
            <p className="text-slate-500 mt-2">We couldn&apos;t find an active session.</p>
            <button 
              onClick={() => router.push('/login')}
              className="mt-8 w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Go to Login
            </button>
          </div>
        </div>
      </>
    );
  }

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
                  {user.profilePicture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={getImageUrl(user.profilePicture) || ""} 
                      alt={user.username || user.email} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200">
                      <User size={48} className="text-slate-400" />
                    </div>
                  )}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    {uploadingImage ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <Camera className="text-white" size={24} />
                    )}
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                  disabled={uploadingImage}
                />
                <h2 className="text-2xl font-bold mt-4">{user.username || user.email}</h2>
                <p className="text-blue-600 font-medium">Senior Web Developer</p>
                <div className="flex items-center justify-center gap-2 text-slate-500 mt-2 text-sm">
                  <MapPin size={16} /> Kathmandu, Nepal
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                  <Edit3 size={18} /> Edit Profile
                </button>
                <button 
                  onClick={handleLogoutClick}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={18} /> Logout
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
                    <p className="text-sm font-medium">{user.email}</p>
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

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={cancelLogout}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <LogOut size={32} className="text-red-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Logout Confirmation</h2>
              <p className="text-slate-600 mb-8">
                Are you sure you want to logout? You&apos;ll need to sign in again to access your account.
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={cancelLogout}
                  className="flex-1 py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 py-3 px-6 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
