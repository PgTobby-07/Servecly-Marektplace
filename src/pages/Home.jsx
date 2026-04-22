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

  // The Essential Five Categories
  const categories = [
    { id: 1, name: "Beds", icon: "🛏️", count: "2.5k+", color: "from-blue-600 to-cyan-400" },
    { id: 2, name: "Deep Cleaning", icon: "✨", count: "3k+", color: "from-emerald-500 to-teal-400" },
    { id: 3, name: "Desks", icon: "💻", count: "3k+", color: "from-purple-600 to-indigo-400" },
    { id: 4, name: "Shelving", icon: "🛠️", count: "1.2k+", color: "from-orange-500 to-amber-400" },
    { id: 5, name: "TV Mounting", icon: "🖼️", count: "800+", color: "from-rose-500 to-pink-400" },
  ];

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen selection:bg-cyan-500 overflow-x-hidden">
      
      {/* 1. TOP NAV & COMMAND HUB: Moved Right */}
      <header className="relative z-30 pt-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
           {/* Placeholder for Logo */}
           <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Servecly</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:ml-auto">
          {/* VIVID USER BADGE */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 p-3 rounded-2xl shadow-2xl">
            <div className="h-12 w-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="pr-4">
              <span className="block text-[9px] uppercase tracking-[0.2em] font-black text-cyan-400 mb-0.5">
                {user?.role === 'admin' ? "System Core" : "Member Access"}
              </span>
              <span className="block text-sm font-bold text-white leading-tight">{user?.name || "Guest Access"}</span>
            </div>
          </div>

          {/* ENLARGED ADMIN ACTIONS */}
          {user?.role === 'admin' && (
            <div className="flex gap-3">
              <Link to="/admin/taxonomy" className="bg-cyan-500 text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                Manage Taxonomy
              </Link>
              <Link to="/admin/vetting" className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">
                Vetting Pipeline
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* 2. HERO & SEARCH: Condensed for Zero-Scroll */}
      <section className="relative z-10 pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter leading-[0.85] text-white">
              Expert help, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                curated precision.
              </span>
            </h1>

            {/* SEARCH BAR: Primary viewport focus */}
            <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto lg:mx-0 mt-8">
              <div className="relative flex items-center bg-white/[0.04] backdrop-blur-3xl border border-white/10 p-2 rounded-[2.5rem] shadow-2xl focus-within:border-cyan-500/50 transition-all">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find a vetted expert in Turkey..."
                  className="flex-grow bg-transparent px-8 py-4 text-lg outline-none text-white placeholder:text-slate-600 font-medium"
                />
                <button type="submit" className="bg-cyan-500 text-white p-5 rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl shadow-cyan-500/30">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </form>
          </div>

          <div className="hidden lg:block relative">
            <img 
              src={fdxImage} 
              className="relative z-10 w-full h-[420px] object-cover rounded-[80px_30px] border border-white/5 shadow-2xl" 
              alt="Professional Service" 
            />
          </div>
        </div>
      </section>

      {/* 3. THE ESSENTIAL FIVE: Immediately after search */}
      <section className="py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-10 italic uppercase">The Essential Five</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/services?categoryId=${cat.id}`} className="group bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/[0.08] transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-cyan-400">{cat.name}</h3>
                <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">{cat.count} EXPERTS</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PHILOSOPHY & IMPACT: Below the fold */}
      <section className="py-24 border-t border-white/5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="relative">
              <p className="text-2xl text-slate-300 font-light italic leading-relaxed mb-4">"Excellence is not a singular act, but a habit."</p>
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-8 bg-cyan-500" />
                <span className="text-cyan-500 font-black text-[10px] uppercase tracking-widest">Aristotle</span>
              </div>
            </div>
            <div className="relative">
              <p className="text-2xl text-slate-300 font-light italic leading-relaxed mb-4">"Modern life is built on the details. We provide architectural precision."</p>
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-8 bg-blue-500" />
                <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">Servecly Core Philosophy</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-2xl text-center">
            <h3 className="text-4xl font-black text-white mb-8 tracking-tighter italic">"The Curated Standard"</h3>
            <div className="flex justify-around items-center">
              <div>
                <div className="text-4xl font-black text-white">99.8%</div>
                <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-1">Satisfaction</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-4xl font-black text-white">150k+</div>
                <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-1">Tasks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CEO MESSAGE: Mr. T */}
      <section className="py-24 text-center bg-black/20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-4xl text-white font-light italic leading-tight mb-12">
            "Servecly improves lives by anchoring every home service in architectural precision. Our hope is to be the definitive standard for trust in Turkey."
          </p>
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 bg-slate-800 rounded-full mb-4 border-2 border-cyan-500 flex items-center justify-center font-black text-2xl text-cyan-500 italic shadow-2xl">T</div>
            <span className="text-white font-black uppercase tracking-widest text-sm">Mr. T</span>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Founder & CEO, Servecly</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
