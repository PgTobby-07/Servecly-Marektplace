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
    <div className="bg-[#020617] text-slate-200 min-h-screen selection:bg-cyan-500 selection:text-white">
      
      {/* HEADER: Vivid Controls & Status */}
      <section className="relative z-10 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* VIVID USER BADGE */}
          <div className="flex items-center gap-6 bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-5 rounded-[2.5rem] shadow-2xl min-w-[320px]">
            <div className="h-16 w-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-cyan-500/20">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-[0.3em] font-black text-cyan-400 mb-1">
                {user?.role === 'admin' ? "System Core" : user?.role === 'tasker' ? "Tasker Pro" : "Member"}
              </span>
              <span className="block text-xl font-bold text-white tracking-tight">{user?.name || "Guest"}</span>
            </div>
          </div>

          {/* VIVID ADMIN BUTTONS (Moved Right) */}
          {user?.role === 'admin' && (
            <div className="flex gap-4">
              <Link to="/admin/taxonomy" className="bg-cyan-500 text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 transition-all">
                Manage Taxonomy
              </Link>
              <Link to="/admin/vetting" className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                Vetting Pipeline
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* HERO & SEARCH: Zero-Scroll View */}
      <section className="relative z-10 pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85] text-white">
              Expert help, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                curated.
              </span>
            </h1>

            <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto lg:mx-0">
              <div className="relative flex items-center bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-3 rounded-[3rem] shadow-2xl focus-within:border-cyan-500/50 transition-all duration-500">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find a vetted expert in Turkey..."
                  className="flex-grow bg-transparent px-8 py-5 text-xl outline-none text-white placeholder:text-slate-600 font-medium"
                />
                <button type="submit" className="bg-cyan-500 text-white p-6 rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </form>
          </div>
          
          <div className="hidden lg:block">
            <img src={fdxImage} className="w-full h-[550px] object-cover rounded-[100px_40px] shadow-2xl border border-white/5" alt="Service" />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY & IMPACT (The Aristotle Section) */}
      <section className="py-32 relative z-10 border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            
            {/* LEFT: Classic & Core Philosophy */}
            <div className="space-y-16">
              <div className="relative">
                <p className="text-3xl text-slate-300 font-light italic leading-relaxed mb-6">
                  "Excellence is not a singular act, but a habit. You are what you repeatedly do."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-0.5 w-12 bg-cyan-500" />
                  <span className="text-cyan-500 font-black uppercase tracking-widest text-xs">Aristotle</span>
                </div>
              </div>

              <div className="relative">
                <p className="text-3xl text-slate-300 font-light italic leading-relaxed mb-6">
                  "Modern life is built on the details. We provide the architectural precision that turns a house into a sanctuary."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-0.5 w-12 bg-blue-500" />
                  <span className="text-blue-500 font-black uppercase tracking-widest text-xs">Servecly Core Philosophy</span>
                </div>
              </div>
            </div>

            {/* RIGHT: The Curated Standard */}
            <div className="bg-white/[0.02] backdrop-blur-3xl p-16 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <div className="grid grid-cols-2 gap-1">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-3 w-3 bg-white" />)}
                </div>
              </div>
              
              <h3 className="text-5xl font-black text-white mb-8 tracking-tighter italic">"The Curated Standard"</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-12 font-light">
                We didn't build just another marketplace. We built a two-sided service economy founded on professional-grade precision.
              </p>
              
              <div className="flex gap-16">
                <div>
                  <div className="text-5xl font-black text-white">99.8%</div>
                  <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Satisfaction</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-white">150k+</div>
                  <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Tasks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO MESSAGE: Mr. T */}
      <section className="py-32 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block bg-cyan-500/10 text-cyan-400 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-cyan-500/20">
            A Message From Our CEO
          </div>
          <p className="text-5xl text-white font-light italic leading-[1.1] tracking-tight mb-16">
            "Servecly improves lives by anchoring every home service in architectural precision. Our hope is to be the definitive standard for trust, beginning with our impact in Turkey."
          </p>
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-slate-800 rounded-full mb-6 border-2 border-cyan-500 shadow-2xl flex items-center justify-center font-black text-3xl text-cyan-500 italic">T</div>
            <span className="text-white font-black uppercase tracking-widest text-sm">Mr. T</span>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Founder & CEO, Servecly</span>
          </div>
        </div>
      </section>

      {/* SERVICE PILLARS */}
      <section className="py-32 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-6xl font-black text-white tracking-tighter mb-20 italic">The Essential Five</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/services?categoryId=${cat.id}`} className="group bg-white/5 border border-white/10 p-12 rounded-[4rem] hover:-translate-y-4 transition-all hover:bg-white/[0.08] hover:shadow-2xl">
                <div className="text-7xl mb-10 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400">{cat.name}</h3>
                <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{cat.count} Pros</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
