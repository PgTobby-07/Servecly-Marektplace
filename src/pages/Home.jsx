import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fdxImage from "../assets/fdx.png";

const Home = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // 1. THE EXCLUSIVE ACCESS NODE LOGIC
  const getAccessStatus = () => {
    if (!user) {
      return { 
        label: "GATEWAY ACCESS", 
        message: "Join as Tasker or Client", 
        subtext: "IDENTIFICATION REQUIRED",
        color: "from-slate-700 to-slate-900 shadow-slate-900/40",
        initial: "?" 
      };
    }
    
    const firstName = user.name?.split(' ')[0] || 'User';
    
    if (user.role === 'admin') {
      return { 
        label: "SYSTEM ADMIN", 
        message: `Root Control: ${firstName}`, 
        subtext: "SYSTEM CORE OPERATIONAL",
        color: "from-cyan-500 to-blue-600 shadow-cyan-500/20",
        initial: user.name?.charAt(0)
      };
    }
    
    if (user.role === 'tasker') {
      return { 
        label: "TASKER ACCOUNT", 
        message: `Active Flow: ${firstName}`, 
        subtext: "SERVICE PIPELINE OPEN",
        color: "from-emerald-500 to-teal-400 shadow-emerald-500/20",
        initial: user.name?.charAt(0)
      };
    }

    return { 
      label: "USER ACCOUNT", 
      message: `Syncing: ${firstName}`, 
      subtext: "CLIENT INTERFACE READY",
      color: "from-purple-500 to-indigo-600 shadow-purple-500/20",
      initial: user.name?.charAt(0)
    };
  };

  const status = getAccessStatus();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
  };

  const categories = [
    { id: 1, name: "Beds", icon: "🛏️", count: "2.5k+", color: "from-blue-600 to-cyan-400" },
    { id: 5, name: "Deep Cleaning", icon: "✨", count: "3k+", color: "from-emerald-500 to-teal-400" },
    { id: 2, name: "Desks", icon: "💻", count: "3k+", color: "from-purple-600 to-indigo-400" },
    { id: 4, name: "Shelving", icon: "🛠️", count: "1.2k+", color: "from-orange-500 to-amber-400" },
    { id: 3, name: "TV Mounting", icon: "🖼️", count: "800+", color: "from-rose-500 to-pink-400" },
  ];

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen selection:bg-cyan-500 overflow-x-hidden">
      
      {/* 1. TOP NAV / ACCESS NODE */}
      <header className="relative z-30 pt-8 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link to={!user ? "/login" : "/dashboard"} className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 p-4 rounded-2xl shadow-2xl group hover:border-cyan-500/50 transition-all duration-500">
          <div className={`h-12 w-12 bg-gradient-to-tr ${status.color} rounded-xl flex items-center justify-center font-black text-white shadow-lg group-hover:scale-110 transition-all duration-300`}>
            {status.initial}
          </div>
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="block text-[8px] uppercase tracking-[0.4em] font-black text-cyan-500/80">{status.label}</span>
              <div className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <span className="block text-sm font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">{status.message}</span>
            <span className="block text-[7px] font-black text-slate-600 tracking-[0.2em] mt-1 uppercase">{status.subtext}</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {!user && (
            <Link to="/signup" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white py-1 transition-all">Initialize Account</Link>
          )}
          {user?.role === 'admin' && (
            <div className="flex gap-3">
              <Link to="/admin/taxonomy" className="bg-cyan-500 text-white px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">Manage Taxonomy</Link>
              <Link to="/admin/vetting" className="bg-white/10 text-white border border-white/20 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">Vetting Pipeline</Link>
            </div>
          )}
        </div>
      </header>

      {/* 2. HERO & SEARCH */}
      <section className="relative z-10 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.85] text-white">
              Expert help, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">curated precision.</span>
            </h1>
            <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto lg:mx-0 mt-10">
              <div className="relative flex items-center bg-white/[0.04] backdrop-blur-3xl border border-white/10 p-2 rounded-[2.5rem] shadow-2xl focus-within:border-cyan-500/50 transition-all">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Locate vetted expertise..." className="flex-grow bg-transparent px-8 py-5 text-lg outline-none text-white placeholder:text-slate-700 font-medium" />
                <button type="submit" className="bg-cyan-500 text-white p-5 rounded-full hover:scale-110 transition-all">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </form>
          </div>
          <div className="hidden lg:block">
            <img src={fdxImage} className="w-full h-[450px] object-cover rounded-[80px_30px] shadow-2xl border border-white/10" alt="Hero" />
          </div>
        </div>
      </section>

      {/* 3. THE ESSENTIAL FIVE */}
      <section className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-12 italic uppercase">The Essential Five</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/services?categoryId=${cat.id}`} className="group bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/[0.08] transition-all duration-300">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-cyan-400">{cat.name}</h3>
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{cat.count} EXPERTS</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE ENGINEER'S VISION: Mr. R.A. */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl font-black text-white mb-10 tracking-tighter italic">Envisioned at <br /><span className="text-cyan-500">Istinye University.</span></h2>
            <p className="text-2xl text-slate-300 font-light italic leading-relaxed mb-12">"In the next 5 years, Servecly won't just be a platform; it will be the architectural backbone of the global service economy."</p>
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-slate-900 rounded-full border-2 border-cyan-500 flex items-center justify-center font-black text-3xl text-cyan-500 italic shadow-2xl">RA</div>
              <div>
                <span className="block text-white font-black uppercase tracking-widest">Mr. R.A.</span>
                <span className="block text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 italic">Software Engineer, Istinye University</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 mt-12">
               <h4 className="text-cyan-500 font-black text-4xl mb-4">2031</h4>
               <p className="text-slate-400 text-sm font-light leading-relaxed">Structural dominance benchmark.</p>
            </div>
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10">
               <h4 className="text-blue-500 font-black text-4xl mb-4">∞</h4>
               <p className="text-slate-400 text-sm font-light leading-relaxed">Continuous evolution of trust.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHILOSOPHY */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <p className="text-2xl text-slate-300 font-light italic leading-relaxed mb-4">"Excellence is not a singular act, but a habit."</p>
              <span className="text-cyan-500 font-black text-[10px] uppercase tracking-widest">Aristotle</span>
            </div>
            <div>
              <p className="text-2xl text-slate-300 font-light italic leading-relaxed mb-4">"Modern life is built on the details. We provide architectural precision."</p>
              <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">Servecly Core Philosophy</span>
            </div>
          </div>
          <div className="bg-white/[0.02] p-12 rounded-[4rem] border border-white/10 text-center shadow-2xl">
            <h3 className="text-4xl font-black text-white mb-8 italic">"The Curated Standard"</h3>
            <div className="flex justify-around">
              <div><div className="text-5xl font-black text-white">99.8%</div><div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Satisfaction</div></div>
              <div className="w-px h-12 bg-white/10" />
              <div><div className="text-5xl font-black text-white">150k+</div><div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Tasks</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CEO MESSAGE: Mr. T */}
      <footer className="py-32 text-center bg-cyan-500/5">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-4xl text-white font-light italic leading-tight mb-16">
            "Servecly improves lives by anchoring home services in precision. Our hope is to be the best based on our structural integrity and the trust of our community."
          </p>
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-slate-800 rounded-full mb-6 border-2 border-cyan-500 flex items-center justify-center font-black text-3xl text-cyan-500 italic">T</div>
            <span className="text-white font-black uppercase tracking-widest text-sm">Mr. T</span>
            <span className="text-slate-500 text-[10px] font-bold uppercase mt-2">Founder & CEO, Servecly</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
