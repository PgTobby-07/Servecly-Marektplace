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
    <div className="min-h-screen flex flex-col bg-[#01040a] text-slate-300 font-sans selection:bg-cyan-500">
      
      {/* 1. MINIMALIST HEADER */}
      <header className="sticky top-0 z-50 bg-[#01040a]/90 backdrop-blur-xl border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            
            {/* OG BRANDING */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#0a4d56] rounded flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0a4d56] group-hover:text-cyan-600 transition-colors">
                Servecly
              </span>
            </Link>

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              <Link to="/" className="hover:text-[#0a4d56] transition-colors">Categories</Link>
              <Link to="/services" className="hover:text-[#0a4d56] transition-colors">Find Help</Link>
              
              {user && (
                <Link to="/dashboard" className="text-[#0a4d56] font-bold hover:underline underline-offset-4">Dashboard</Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-6">
                {/* CLEAN USER GREETING - REMOVED SYSTEM CORE & VETTING */}
                <span className="text-sm font-medium text-slate-300">
                  Hi, <span className="text-white font-bold">{user.name?.split(' ')[0] || 'User'}</span>
                </span>
                
                <button 
                  onClick={Logout}
                  className="text-xs font-black uppercase tracking-widest text-[#0a4d56] hover:text-rose-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-[#0a4d56]">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#0a4d56] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#083b42] transition-all"
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

      {/* 2. FOOTER */}
      <footer className="bg-[#01040a] border-t border-white/5 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#0a4d56] rounded flex items-center justify-center text-white text-[10px] font-bold">
                S
              </div>
              <span className="text-lg font-bold text-[#0a4d56]">
                Servecly
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Built with professional-grade precision for a two-sided service economy.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-widest mb-6">Marketplace</h4>
            <ul className="text-sm text-slate-500 flex flex-col gap-3">
              <li><Link to="/dashboard" className="hover:text-cyan-500 transition-colors">My Dashboard</Link></li>
              <li><Link to="/services" className="hover:text-cyan-500 transition-colors">All Services</Link></li>
              <li><Link to="/profile-setup" className="hover:text-cyan-500 transition-colors">Become a Tasker</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-[10px] font-medium text-slate-600 flex justify-between uppercase tracking-widest">
          <p>© 2026 Servecly Marketplace. All rights reserved.</p>
          <p>Architectural Integrity</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
