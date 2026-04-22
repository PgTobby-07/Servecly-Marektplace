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
    
    // UI: Interactive mouse tracking for the background auras
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 15, 
        y: (e.clientY / window.innerHeight - 0.5) * 15 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('storage', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
  };

  // UPDATED: Strictly your 5 core categories
  const categories = [
    { id: 1, name: "Beds", icon: "🛏️", count: "2.5k+", color: "from-blue-500/10" },
    { id: 2, name: "Deep Cleaning", icon: "✨", count: "3k+", color: "from-cyan-500/10" },
    { id: 3, name: "Desks", icon: "💻", count: "3k+", color: "from-indigo-500/10" },
    { id: 4, name: "Shelving", icon: "🛠️", count: "1.2k+", color: "from-orange-500/10" },
    { id: 5, name: "TV Mounting", icon: "🖼️", count: "800+", color: "from-purple-500/10" },
  ];

  return (
    // NEW: Interactive background with soft vertical gradient to kill the "boring" look
    <div className="bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] selection:bg-primary selection:text-white">
      
      {/* HERO SECTION - Tighter padding to keep search bar visible on load */}
      <section className="relative min-h-[85vh] flex items-center pt-10 pb-20 overflow-hidden">
        {/* MOVING AURAS: Parallax effect for depth */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="max-w-2xl text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
              {/* ADMIN/USER BADGE: Restored from your reference */}
              {user && (
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-slate-100 p-2 pr-6 rounded-full shadow-sm mb-6">
                  <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-widest font-black text-primary leading-none">
                      {user.role === 'admin' ? "System Core" : "Member"}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{user.name}</span>
                  </div>
                  {user.role === 'admin' && (
                    <div className="flex gap-2 ml-4">
                      <Link to="/admin/taxonomy" className="text-[9px] bg-primary/10 text-primary px-2 py-1 rounded-full font-black hover:bg-primary/20 transition-all">TAXONOMY</cite: image_7fab2b.jpg] [Link>
                      <Link to="/admin/vetting" className="text-[9px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-black hover:bg-slate-200 transition-all">VETTING</cite: image_7fab2b.jpg] [Link>
                    </div>
                  )}
                </div>
              )}

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
                Expert help, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  curated precision.
                </span>
              </h1>
              
              <p className="text-slate-500 text-lg md:text-xl mb-10 leading-relaxed max-w-xl font-light">
                Connect {user?.name || "today"} with vetted professionals for home repairs and assembly. The architectural standard for marketplaces.
              </p>

              {/* SEARCH BAR - Glassmorphic design positioned higher for visibility */}
              <form onSubmit={handleSearch} className="relative group max-w-xl mx-auto lg:mx-0">
                <div className="relative flex items-center bg-white border border-slate-200 p-2 rounded-2xl shadow-xl focus-within:border-primary transition-all">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What do you need help with?"
                    className="flex-grow bg-transparent px-6 py-3 text-lg outline-none font-medium"
                  />
                  <button type="submit" className="bg-primary text-white p-4 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </button>
                </div>
              </form>
            </div>

            {/* HERO IMAGE */}
            <div className="hidden lg:block relative w-full max-w-md animate-in fade-in slide-in-from-right-8 duration-1000">
              <img 
                src={fdxImage} 
                className="relative z-10 w-full h-[500px] object-cover rounded-[80px_20px_80px_20px] shadow-2xl transition-transform hover:scale-[1.02] duration-500"
                alt="Expert Help"
              />
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-5 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4">
                <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-900">Vetted Professional</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">ID Checked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID - Restored to 5 strictly */}
      <section className="py-24 bg-white/60 backdrop-blur-md border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Popular Categories</h2>
              <p className="text-slate-500 font-medium">Find the right expert for any task in Istanbul.</p>
            </div>
            <Link to="/services" className="group text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View all services <span>→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?categoryId=${cat.id}`}
                className="group relative overflow-hidden bg-white border border-slate-100 p-8 rounded-[2rem] transition-all hover:shadow-2xl hover:-translate-y-3"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <div className="bg-slate-50 group-hover:bg-white px-3 py-1 rounded-full text-[9px] font-black text-primary border border-slate-100">
                    {cat.count} TASKERS
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION - Restored high-impact stats */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black mb-8 italic tracking-tighter">"The Curated Precision"</h2>
            <p className="text-slate-400 text-xl leading-relaxed font-light">
              Every Tasker on Servecly undergoes a multi-step vetting process, ensuring the highest architectural standards for every job.
            </p>
          </div>
          
          <div className="flex gap-12 lg:gap-20">
            <div className="text-center group">
              <div className="text-6xl font-black mb-2 text-primary">99.8%</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">Satisfied Users</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl font-black mb-2 text-white">150k+</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">Tasks Completed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
