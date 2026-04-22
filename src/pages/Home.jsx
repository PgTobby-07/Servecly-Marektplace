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
    <div className="bg-[#020617] text-slate-200 min-h-screen selection:bg-cyan-500">
      
      {/* 1. TOP COMMAND BAR: Enlarged buttons & dynamic badges */}
      <header className="relative z-20 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* VIVID USER BADGE */}
          <div className="flex items-center gap-5 bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-3xl shadow-xl">
            <div className="h-14 w-14 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-cyan-500/20">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.25em] font-black text-cyan-400 mb-0.5">
                {user?.role === 'admin' ? "System Core" : user?.role === 'tasker' ? "Verified Tasker" : "Member Access"}
              </span>
              <span className="block text-lg font-bold text-white leading-tight">{user?.name || "Guest Access"}</span>
            </div>
          </div>

          {/* VIVID ACTION HUB: Moved Right & Enlarged */}
          {user?.role === 'admin' && (
            <div className="flex items-center gap-4">
              <Link to="/admin/taxonomy" className="bg-cyan-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                Manage Taxonomy
              </Link>
              <Link to="/admin/vetting" className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all shadow-lg">
                Vetting Pipeline
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* 2. HERO SECTION: Tightened for Zero-Scroll */}
      <section className="relative z-10 pt-4 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9] text-white">
              Expert help, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                curated precision.
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg mb-10 max-w-lg leading-relaxed font-light">
              The architectural standard for service marketplaces in Turkey. Vetted masters at your fingertips.
            </p>

            {/* SEARCH BAR: Guaranteed above-the-fold visibility */}
            <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto lg:mx-0">
              <div className="relative flex items-center bg-white/[0.04] backdrop-blur-3xl border border-white/10 p-2.5 rounded-[2.5rem] shadow-2xl focus-within:border-cyan-500/50 transition-all">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you need help with in Turkey?..."
                  className="flex-grow bg-transparent px-8 py-4 text-lg outline-none text-white placeholder:text-slate-600 font-medium"
                />
                <button type="submit" className="bg-cyan-500 text-white p-5 rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl shadow-cyan-500/30">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </form>
          </div>

          {/* HERO IMAGE: Slightly smaller to save space */}
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full" />
            <img 
              src={fdxImage} 
              className="relative z-10 w-full h-[480px] object-cover rounded-[80px_30px] border border-white/5 shadow-2xl" 
              alt="Professional Service" 
            />
          </div>
        </div>
      </section>

      {/* 3. INDUSTRY PHILOSOPHY: Fills space with authority */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <p className="text-2xl text-slate-300 font-light italic leading-relaxed mb-4">"Excellence is not a singular act, but a habit."</p>
              <span className="text-cyan-500 font-black text-[10px] uppercase tracking-widest">— Aristotle</span>
            </div>
            <div>
              <p className="text-2xl text-slate-300 font-light italic leading-relaxed mb-4">"Modern life is built on the details. We provide the architectural precision."</p>
              <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">— Servecly Core Philosophy</span>
            </div>
          </div>
          <div className="bg-white/[0.02] p-12 rounded-[3rem] border border-white/10 text-center">
            <h3 className="text-4xl font-black text-white mb-6 italic">"The Curated Standard"</h3>
            <div className="flex justify-around">
              <div>
                <div className="text-4xl font-black text-white">99.8%</div>
                <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white">150k+</div>
                <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Tasks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CEO MISSION: Mr. T */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-4xl text-white font-light italic leading-tight mb-10">
            "Servecly improves lives by anchoring home services in precision. Our hope is to be the best in Turkey through trust."
          </p>
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 bg-slate-800 rounded-full mb-4 border-2 border-cyan-500 flex items-center justify-center font-black text-2xl text-cyan-500">T</div>
            <span className="text-white font-black uppercase tracking-widest text-sm">Mr. T</span>
            <span className="text-slate-500 text-[10px] font-bold uppercase mt-1">Founder & CEO, Servecly</span>
          </div>
        </div>
      </section>

      {/* 5. CATEGORY PILLARS: All 5 categories */}
      <section className="py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-white tracking-tighter mb-16 italic">The Essential Five</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/services?categoryId=${cat.id}`} className="group bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/[0.08] transition-all">
                <div className="text-5xl mb-6">{cat.icon}</div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-400">{cat.name}</h3>
                <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">{cat.count} EXPERTS</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
