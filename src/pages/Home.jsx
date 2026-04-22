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
    <div className="bg-[#020617] text-slate-200 min-h-screen selection:bg-cyan-500 overflow-x-hidden">
      
      {/* 1. TOP NAV: System Core Anchor (Top Left) */}
      <header className="relative z-30 pt-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* REPOSITIONED SYSTEM CORE */}
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 p-3 rounded-2xl shadow-2xl">
          <div className="h-12 w-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg">
            {user?.name?.charAt(0) || "P"}
          </div>
          <div className="pr-4">
            <span className="block text-[9px] uppercase tracking-[0.2em] font-black text-cyan-400 mb-0.5">
              {user?.role === 'admin' ? "System Core" : "Active Node"}
            </span>
            <span className="block text-sm font-bold text-white leading-tight">Pg Tobby</span>
          </div>
        </div>

        {/* ADMIN COMMANDS */}
        {user?.role === 'admin' && (
          <div className="flex gap-3">
            <Link to="/admin/taxonomy" className="bg-cyan-500 text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
              Manage Taxonomy
            </Link>
            <Link to="/admin/vetting" className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">
              Vetting Pipeline
            </Link>
          </div>
        )}
      </header>

      {/* 2. HERO & SEARCH */}
      <section className="relative z-10 pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-7xl md:text-8xl font-black mb-4 tracking-tighter leading-[0.85] text-white">
              Expert help, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                curated precision.
              </span>
            </h1>

            <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto lg:mx-0 mt-8">
              <div className="relative flex items-center bg-white/[0.04] backdrop-blur-3xl border border-white/10 p-2 rounded-[2.5rem] shadow-2xl focus-within:border-cyan-500/50 transition-all">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find a vetted expert in Turkey..."
                  className="flex-grow bg-transparent px-8 py-4 text-lg outline-none text-white placeholder:text-slate-600 font-medium"
                />
                <button type="submit" className="bg-cyan-500 text-white p-5 rounded-full hover:scale-110 transition-all">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </form>
          </div>
          <div className="hidden lg:block">
            <img src={fdxImage} className="w-full h-[400px] object-cover rounded-[80px_30px] shadow-2xl border border-white/5" alt="Service" />
          </div>
        </div>
      </section>

      {/* 3. THE ESSENTIAL FIVE */}
      <section className="py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white tracking-tighter mb-10 italic uppercase">The Essential Five</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/services?categoryId=${cat.id}`} className="group bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/[0.08] transition-all">
                <div className="text-4xl mb-6">{cat.icon}</div>
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-cyan-400">{cat.name}</h3>
                <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">{cat.count} EXPERTS</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE ENGINEER'S VISION: Mr. R.A. (NEW SECTION) */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-10 text-[20rem] font-black text-white/[0.02] select-none">"</div>
            <h2 className="text-5xl font-black text-white mb-10 tracking-tighter leading-tight italic">
              Envisoned at <br />
              <span className="text-cyan-500">Istinye University.</span>
            </h2>
            <p className="text-2xl text-slate-300 font-light italic leading-relaxed mb-12">
              "In the next 5 years, Servecly won't just be a platform; it will be the architectural backbone of the global service economy. We are coding a future where trust is an algorithm and precision is a universal right."
            </p>
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-full border-2 border-cyan-500 flex items-center justify-center font-black text-3xl text-cyan-500 italic shadow-2xl">RA</div>
              <div>
                <span className="block text-white font-black uppercase tracking-widest">Mr. R.A.</span>
                <span className="block text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 italic">Software Engineer, Istinye University</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 mt-12">
               <h4 className="text-cyan-500 font-black text-4xl mb-4">2031</h4>
               <p className="text-slate-400 text-sm font-light leading-relaxed">The 5-year benchmark for Servecly's full structural dominance in the EMEA market.</p>
            </div>
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10">
               <h4 className="text-blue-500 font-black text-4xl mb-4">∞</h4>
               <p className="text-slate-400 text-sm font-light leading-relaxed">Continuous evolution of the vetting algorithm at Istinye Tech Labs.</p>
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
              <div>
                <div className="text-5xl font-black text-white">99.8%</div>
                <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Satisfaction</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-5xl font-black text-white">150k+</div>
                <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Tasks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR MISSION: Turkey & Beyond (NEW SECTION) */}
      <section className="py-32 bg-cyan-500/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-6xl font-black text-white mb-8 tracking-tighter italic">Impact through <br /><span className="text-cyan-500 underline decoration-8">Integration.</span></h2>
              <p className="text-slate-400 text-xl font-light leading-relaxed">
                By bridging the gap between Istanbul's fast-paced demand and high-caliber skilled professionals, we are creating a symbiotic economy that rewards precision over volume.
              </p>
           </div>
           <div className="grid gap-4">
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex items-center gap-6">
                 <div className="h-12 w-12 bg-cyan-500 rounded-full flex items-center justify-center font-black">1</div>
                 <span className="text-white font-bold">100% Vetted Pipeline for All Taskers</span>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex items-center gap-6">
                 <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center font-black">2</div>
                 <span className="text-white font-bold">Local Expertise Focused on Turkish Metropolitan Centers</span>
              </div>
           </div>
        </div>
      </section>

      {/* 7. CEO MESSAGE: Mr. T */}
      <section className="py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-4xl text-white font-light italic leading-tight mb-16">
            "Servecly improves lives by anchoring home services in precision. Our hope is to be the best based on our structural integrity and the trust of our community."
          </p>
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-slate-800 rounded-full mb-6 border-2 border-cyan-500 flex items-center justify-center font-black text-3xl text-cyan-500 italic shadow-2xl">T</div>
            <span className="text-white font-black uppercase tracking-widest text-sm">Mr. T</span>
            <span className="text-slate-500 text-[10px] font-bold uppercase mt-2">Founder & CEO, Servecly</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
