import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import fdxImage from "../assets/fdx.png";

const Home = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    checkUser();
    
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 25, 
        y: (e.clientY / window.innerHeight - 0.5) * 25 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
  };

  // RESTORED: All 5 core categories
  const categories = [
    { id: 1, name: "Beds", icon: "🛏️", count: "2.5k+", color: "from-blue-600 to-cyan-400" },
    { id: 2, name: "Deep Cleaning", icon: "✨", count: "3k+", color: "from-emerald-500 to-teal-400" }, // Restored
    { id: 3, name: "Desks", icon: "💻", count: "3k+", color: "from-purple-600 to-indigo-400" },
    { id: 4, name: "Shelving", icon: "🛠️", count: "1.2k+", color: "from-orange-500 to-amber-400" },
    { id: 5, name: "TV Mounting", icon: "🖼️", count: "800+", color: "from-rose-500 to-pink-400" },
  ];

  return (
    // CREATIVE BG: Deep Obsidian to Cobalt mesh
    <div className="bg-[#020617] text-slate-200 min-h-screen selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      
      {/* GLOWING AURAS: Fills the visual "emptiness" */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-cyan-500/10 blur-[140px] rounded-full animate-pulse"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full"
          style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
        />
      </div>

      <section className="relative z-10 pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* USER CONTEXT: Restored from */}
          {user && (
            <div className="flex items-center gap-4 mb-16 animate-in fade-in slide-in-from-top-6 duration-1000">
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-2xl flex items-center gap-4 shadow-2xl">
                <div className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-black text-white">
                  {user.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-black text-cyan-400 leading-none mb-1">
                    {user.role === 'admin' ? "System Core" : "Access Level: Member"}
                  </span>
                  <span className="text-sm font-bold text-white leading-none">{user.name}</span>
                </div>
              </div>
              {user.role === 'admin' && (
                <div className="flex gap-3">
                  <Link to="/admin/taxonomy" className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] px-4 py-2 rounded-full font-black hover:bg-cyan-500 hover:text-white transition-all tracking-wider">MANAGE TAXONOMY</Link>
                  <Link to="/admin/vetting" className="bg-white/5 text-slate-400 border border-white/10 text-[9px] px-4 py-2 rounded-full font-black hover:bg-white/10 transition-all tracking-wider">VETTING PIPELINE</Link>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.85] text-white">
                Expert help, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  curated precision.
                </span>
              </h1>
              
              <p className="text-slate-400 text-2xl mb-14 max-w-xl leading-relaxed font-light">
                The architectural standard for service marketplaces. Connect {user?.name || "today"} with vetted masters of their craft.
              </p>

              {/* SEARCH: High-end Cyberpunk-Glass style */}
              <form onSubmit={handleSearch} className="relative group max-w-3xl mx-auto lg:mx-0">
                <div className="relative flex items-center bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-3 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] focus-within:border-cyan-500/50 transition-all duration-500">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for vetted experts..."
                    className="flex-grow bg-transparent px-10 py-5 text-xl outline-none text-white placeholder:text-slate-600 font-medium"
                  />
                  <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl shadow-cyan-500/20">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </button>
                </div>
              </form>
            </div>

            {/* HERO IMAGE: Restored */}
            <div className="hidden lg:block relative w-full max-w-xl">
              <div className="absolute inset-0 bg-cyan-500/30 blur-[120px] rounded-full animate-pulse" />
              <img 
                src={fdxImage} 
                className="relative z-10 w-full h-[650px] object-cover rounded-[150px_50px_150px_50px] shadow-2xl border border-white/5 grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                alt="Expert"
              />
              <div className="absolute -bottom-12 -left-12 z-20 bg-[#0f172a]/95 backdrop-blur-2xl p-8 rounded-[4rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-5">
                <div className="h-14 w-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <span className="block text-lg font-black text-white tracking-tight leading-none mb-1">Vetted Master</span>
                  <span className="block text-[10px] text-emerald-400 uppercase font-black tracking-[0.2em]">Verified Identity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES: Re-filled to 5 Items */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-6xl font-black text-white tracking-tighter mb-4 italic">The Essential Five</h2>
              <p className="text-slate-500 text-xl font-medium">Professional-grade help for every corner of your life.</p>
            </div>
            <Link to="/services" className="group text-cyan-400 font-black text-sm tracking-widest flex items-center gap-3 hover:text-white transition-all">
              EXPLORE ENTIRE ARCHIVE <span className="text-2xl group-hover:translate-x-3 transition-transform">→</span>
            </Link>
          </div>
          
          {/* GRID: High impact glass cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?categoryId=${cat.id}`}
                className="group relative overflow-hidden bg-white/5 border border-white/10 p-12 rounded-[4rem] transition-all hover:-translate-y-6 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] hover:bg-white/[0.08]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="text-7xl mb-10 group-hover:scale-125 transition-transform duration-700">{cat.icon}</div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">{cat.name}</h3>
                  <div className="bg-white/5 group-hover:bg-cyan-500/20 px-5 py-2 rounded-full text-[11px] font-black text-cyan-500 border border-white/10 transition-colors uppercase tracking-widest">
                    {cat.count} PROS
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: INDUSTRY QUOTES SECTION - Fills the "Scanty" gap */}
      <section className="py-32 relative z-10 border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-16">
              <div className="relative">
                <svg className="absolute -top-8 -left-8 w-20 h-20 text-white/5" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8v8h6v8H8v-8H4V8h6zm14 0v8h6v8h-8v-8h-4V8h6z" /></svg>
                <p className="text-3xl text-slate-300 font-light italic leading-relaxed mb-8">
                  "Excellence is not a singular act, but a habit. You are what you repeatedly do."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-0.5 w-12 bg-cyan-500" />
                  <span className="text-cyan-500 font-black uppercase tracking-widest text-xs">Aristotle</span>
                </div>
              </div>

              <div className="relative">
                <p className="text-3xl text-slate-300 font-light italic leading-relaxed mb-8">
                  "Modern life is built on the details. We provide the architectural precision that turns a house into a sanctuary."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-0.5 w-12 bg-blue-500" />
                  <span className="text-blue-500 font-black uppercase tracking-widest text-xs">Servecly Core Philosophy</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-600/10 p-16 rounded-[5rem] border border-white/10 text-center backdrop-blur-3xl shadow-2xl">
              <h3 className="text-5xl font-black text-white mb-8 tracking-tighter italic">"The Curated Standard"</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-light">
                We didn't build just another marketplace. We built a two-sided service economy founded on professional-grade precision.
              </p>
              <div className="inline-flex gap-8">
                <div className="text-center">
                  <div className="text-4xl font-black text-white">99.8%</div>
                  <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Satisfaction</div>
                </div>
                <div className="w-px h-10 bg-white/10 self-center" />
                <div className="text-center">
                  <div className="text-4xl font-black text-white">150k+</div>
                  <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Tasks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST FOOTER: High-impact dark theme */}
      <section className="bg-[#020617] text-white py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-black mb-10 italic tracking-tighter text-white">The Curated Precision</h2>
            <p className="text-slate-500 text-2xl leading-relaxed font-light">
              Every Tasker on Servecly undergoes a rigorous multi-step vetting process, ensuring the highest architectural standards for every job.
            </p>
          </div>
          
          <div className="flex gap-20">
            <div className="text-center group">
              <div className="text-8xl font-black mb-2 text-cyan-500 animate-pulse">99.8%</div>
              <div className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-600">Satisfied Users</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
