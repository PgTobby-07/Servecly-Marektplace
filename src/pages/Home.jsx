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
    
    // UI: Interactive parallax listener for the "Mind-Blowing" background
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 20, 
        y: (e.clientY / window.innerHeight - 0.5) * 20 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('storage', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // LOGIC: The "Bridge" - sends search text to /services via URL
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
  };

  // LOGIC: IDs matched to your SQL Database for immediate filtering
  const categories = [
    { id: 4, name: "Shelving", icon: "🛠️", count: "1.2k+", color: "from-blue-500/20" },
    { id: 3, name: "TV Mounting", icon: "🖼️", count: "800+", color: "from-purple-500/20" },
    { id: 1, name: "Beds", icon: "🛏️", count: "2.5k+", color: "from-orange-500/20" },
    { id: 2, name: "Desks", icon: "💻", count: "3k+", color: "from-cyan-500/20" },
  ];

  return (
    <div className="bg-[#f8fafc] overflow-hidden selection:bg-primary selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32">
        {/* PARALLAX AURA */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-primary/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
            
            <div className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-1000">
              {/* ROLE-BASED UX: Personalized Welcome */}
              {user && (
                <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white p-2 pr-6 rounded-full shadow-sm mb-8">
                  <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-black text-primary leading-none">
                      {user.role === 'admin' ? "System Core" : user.role === 'tasker' ? "Active Provider" : "Verified Client"}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{user.name}</span>
                  </div>
                </div>
              )}

              <h1 className="text-6xl md:text-8xl font-display text-slate-900 leading-[0.95] tracking-tight font-black mb-8">
                The standard of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
                  curated help.
                </span>
              </h1>
              
              <p className="text-slate-600 text-xl md:text-2xl mb-12 leading-relaxed max-w-2xl font-light">
                Connect instantly with vetted professionals for home assembly, mounting, and repairs in Istanbul.
              </p>

              {/* SEARCH: Redirects with encoded query */}
              <form onSubmit={handleSearch} className="relative max-w-2xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition"></div>
                <div className="relative flex items-center bg-white border border-slate-200 p-2 rounded-[2rem] shadow-xl">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What do you need help with?"
                    className="flex-grow bg-transparent px-8 py-5 text-lg outline-none font-medium"
                  />
                  <button type="submit" className="bg-primary text-white px-10 py-5 rounded-[1.5rem] font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/25">
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* FLOATING IMAGE COMPONENT */}
            <div className="hidden lg:block relative w-full max-w-xl">
              <img 
                src={fdxImage} 
                className="relative z-10 w-full h-[650px] object-cover shadow-2xl rounded-[100px_40px_100px_40px] hover:rotate-2 transition-transform duration-700"
                alt="Professional help"
              />
              <div className="absolute bottom-12 -left-12 z-20 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white flex items-center gap-5">
                <div className="h-14 w-14 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <span className="block text-lg font-black text-slate-900 tracking-tight">Vetted Expert</span>
                  <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest">Architectural Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-slate-900 mb-20 tracking-tighter">Popular Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?categoryId=${cat.id}`}
                className="relative overflow-hidden bg-slate-50 border border-slate-100 p-10 rounded-[3rem] transition-all hover:shadow-2xl hover:-translate-y-4 group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-8 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <div className="inline-block bg-white border border-slate-200 px-5 py-2 rounded-2xl text-xs font-black text-primary shadow-sm">
                    {cat.count} Providers
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
