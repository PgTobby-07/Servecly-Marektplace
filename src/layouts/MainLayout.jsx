import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); 
    navigate("/login");
  };

  return (
    // Updated background to deep navy slate for visual rhyme
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* 1. CINEMATIC HEADER: RHETORICALLY LINKED TO HOME */}
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo updated to high-contrast cyan */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                S
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic group-hover:text-cyan-400 transition-colors">
                Servecly
              </span>
            </Link>

            {/* NAV LINKS: Ghost-white to Cyan hover */}
            <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <Link to="/" className="hover:text-cyan-400 transition-all">Categories</Link>
              <Link to="/services" className="hover:text-cyan-400 transition-all">Find Help</Link>
              
              {(!user || user.role === 'users') && (
                <Link to="/post-task" className="hover:text-cyan-400 transition-all">Post a Task</Link>
              )}
              
              {user && (
                <Link to="/dashboard" className="text-cyan-500 hover:text-white transition-all underline decoration-2 underline-offset-8">Dashboard</Link>
              )}

              {user?.role === 'tasker' && (user?.status === 'new' || !user?.status) && (
                <Link 
                  to="/profile-setup" 
                  className="bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full border border-cyan-500/20 animate-pulse"
                >
                  ✨ Complete Setup
                </Link>
              )}
            </div>
          </div>

          {/* 2. SYSTEM CORE IDENTITY: TOP RIGHT */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-5">
                {/* ADMIN COMMAND CENTER */}
                {user.role === 'admin' && (
                  <div className="hidden lg:flex gap-2">
                    <Link to="/admin/vetting" className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                      Vetting Pipeline
                    </Link>
                  </div>
                )}
                
                {/* User Badge: Rhyming with Pg Tobby identity */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 py-2 px-4 rounded-xl">
                  <div className="h-8 w-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-black text-white text-xs">
                    {user.name?.charAt(0) || 'P'}
                  </div>
                  <div className="hidden sm:block">
                    <span className="block text-[8px] font-black text-cyan-500 uppercase tracking-widest leading-none mb-1">
                      {user.role === 'admin' ? "System Core" : "Active Node"}
                    </span>
                    <span className="block text-xs font-bold text-white leading-none">
                      {user.name?.split(' ')[0] || 'User'}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={Logout}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-rose-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-cyan-500 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">{children}</main>

      {/* 3. CINEMATIC FOOTER */}
      <footer className="bg-[#020617] border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-black">S</div>
              <span className="text-xl font-black text-white italic uppercase tracking-tighter">Servecly</span>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
              Built with professional-grade precision for a two-sided service economy. Anchored at İstinye University.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Marketplace</h4>
            <ul className="text-xs text-slate-500 flex flex-col gap-4 font-bold">
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-all tracking-wide">MY DASHBOARD</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-all tracking-wide">ALL SERVICES</Link></li>
              <li><Link to="/profile-setup" className="hover:text-cyan-400 transition-all tracking-wide">BECOME A TASKER</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">System</h4>
            <ul className="text-xs text-slate-500 flex flex-col gap-4 font-bold">
              <li><Link to="/admin/vetting" className="hover:text-cyan-400 transition-all tracking-wide">VETTING PIPELINE</Link></li>
              <li><Link to="/admin/taxonomy" className="hover:text-cyan-400 transition-all tracking-wide">TAXONOMY ENGINE</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">© 2026 Servecly. Architectural Integrity Guaranteed.</p>
          <div className="flex gap-8">
             <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">v1.0.4-stable</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;

