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
    // CAPTURING POTENTIAL USERS & TASKERS
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
    
    // ADMIN: SYSTEM ARCHITECT
    if (user.role === 'admin') {
      return { 
        label: "SYSTEM ARCHITECT", 
        message: `Root Control: ${firstName}`, 
        subtext: "SYSTEM CORE OPERATIONAL",
        color: "from-cyan-500 to-blue-600 shadow-cyan-500/20",
        initial: user.name?.charAt(0)
      };
    }
    
    // TASKER: VERIFIED ASSET
    if (user.role === 'tasker') {
      return { 
        label: "VERIFIED ASSET", 
        message: `Active Flow: ${firstName}`, 
        subtext: "SERVICE PIPELINE OPEN",
        color: "from-emerald-500 to-teal-400 shadow-emerald-500/20",
        initial: user.name?.charAt(0)
      };
    }

    // CLIENT: ACTIVE NODE
    return { 
      label: "ACTIVE NODE", 
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
    { id: 2, name: "Deep Cleaning", icon: "✨", count: "3k+", color: "from-emerald-500 to-teal-400" },
    { id: 3, name: "Desks", icon: "💻", count: "3k+", color: "from-purple-600 to-indigo-400" },
    { id: 4, name: "Shelving", icon: "🛠️", count: "1.2k+", color: "from-orange-500 to-amber-400" },
    { id: 5, name: "TV Mounting", icon: "🖼️", count: "800+", color: "from-rose-500 to-pink-400" },
  ];

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen selection:bg-cyan-500 overflow-x-hidden">
      
      {/* TOP NAV: ACCESS ANCHOR */}
      <header className="relative z-30 pt-8 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* DYNAMIC ACCESS NODE - LINKED TO LOGIN IF GUEST */}
        <Link to={!user ? "/login" : "/dashboard"} className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 p-4 rounded-2xl shadow-2xl group hover:border-cyan-500/50 transition-all duration-500">
          <div className={`h-12 w-12 bg-gradient-to-tr ${status.color} rounded-xl flex items-center justify-center font-black text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
            {status.initial}
          </div>
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="block text-[8px] uppercase tracking-[0.4em] font-black text-cyan-500/80">
                {status.label}
              </span>
              <div className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <span className="block text-sm font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">
              {status.message}
            </span>
            <span className="block text-[7px] font-black text-slate-600 tracking-[0.2em] mt-1 uppercase">
              {status.subtext}
            </span>
          </div>
        </Link>

        {/* QUICK COMMANDS BASED ON ROLE */}
        <div className="flex items-center gap-4">
          {!user && (
            <Link to="/signup" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white border-b border-transparent hover:border-cyan-500 py-1 transition-all">
              Initialize Account
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin/taxonomy" className="bg-cyan-500 text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
              Manage Taxonomy
            </Link>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.85] text-white">
              Expert help, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                curated precision.
              </span>
            </h1>

            <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto lg:mx-0 mt-10">
              <div className="relative flex items-center bg-white/[0.04] backdrop-blur-3xl border border-white/10 p-2 rounded-[2.5rem] shadow-2xl focus-within:border-cyan-500/50 transition-all">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Locate vetted expertise..."
                  className="flex-grow bg-transparent px-8 py-5 text-lg outline-none text-white placeholder:text-slate-700 font-medium"
                />
                <button type="submit" className="bg-cyan-500 text-white p-5 rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </form>
          </div>
          <div className="hidden lg:block relative group">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] group-hover:bg-cyan-500/30 transition-all" />
            <img src={fdxImage} className="relative w-full h-[450px] object-cover rounded-[80px_30px] shadow-2xl border border-white/10" alt="Servecly Hero" />
          </div>
        </div>
      </section>

      {/* THE ESSENTIAL FIVE */}
      <section className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-12 italic uppercase">The Essential Five</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/services?categoryId=${cat.id}`} className="group bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-cyan-400">{cat.name}</h3>
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{cat.count} EXPERTS</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE ENGINEER'S VISION */}
      <section className="py-40 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-4xl md:text-5xl text-white font-light italic leading-tight mb-20 max-w-5xl mx-auto">
            "We are coding a future where trust is an algorithm and <span className="text-cyan-500 font-bold">precision</span> is a universal right."
          </p>
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 bg-slate-900 rounded-full border-2 border-cyan-500 flex items-center justify-center font-black text-4xl text-cyan-500 italic shadow-2xl mb-6">RA</div>
            <span className="text-white font-black uppercase tracking-widest text-lg">Mr. R.A.</span>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Software Engineer • Istinye University</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
