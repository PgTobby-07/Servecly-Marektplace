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

  const categories = [
    { id: 4, name: "Shelving", icon: "🛠️", count: "1.2k+", color: "from-blue-500/10" },
    { id: 3, name: "TV Mounting", icon: "🖼️", count: "800+", color: "from-purple-500/10" },
    { id: 1, name: "Beds", icon: "🛏️", count: "2.5k+", color: "from-orange-500/10" },
    { id: 2, name: "Desks", icon: "💻", count: "3k+", color: "from-cyan-500/10" },
  ];

  return (
    // Boring fixed: Soft gradient background instead of flat white
    <div className="bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] overflow-hidden">
      
      {/* HERO SECTION - Tighter padding to show search bar early */}
      <section className="relative min-h-[85vh] flex items-center pt-10 pb-20">
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="max-w-2xl text-center lg:text-left">
              {/* User Badge - Reduced margin */}
              {user && (
                <div className="inline-flex items-center gap-3 bg-white border border-slate-100 p-1.5 pr-5 rounded-full shadow-sm mb-6">
                  <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest font-black text-primary leading-none">
                      {user.role === 'admin' ? "System Core" : "Member"}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{user.name}</span>
                  </div>
                </div>
              )}

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
                The standard of <br />
                <span className="text-primary">curated help.</span>
              </h1>
              
              <p className="text-slate-500 text-lg md:text-xl mb-8 leading-relaxed max-w-xl font-light">
                Professional assembly and repairs for your home in Istanbul.
              </p>

              {/* SEARCH BAR - Positioned higher */}
              <form onSubmit={handleSearch} className="relative group max-w-xl mx-auto lg:mx-0">
                <div className="relative flex items-center bg-white border border-slate-200 p-1.5 rounded-2xl shadow-lg focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="flex-grow bg-transparent px-6 py-3 text-base outline-none"
                  />
                  <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* IMAGE - Tighter sizing to prevent scroll */}
            <div className="hidden lg:block relative w-full max-w-md">
              <img 
                src={fdxImage} 
                className="relative z-10 w-full h-[500px] object-cover rounded-[60px_20px_60px_20px] shadow-xl"
                alt="Expert"
              />
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3">
                <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-sm font-black text-slate-900">Vetted Pro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES - Clean break */}
      <section className="py-20 bg-white/50 backdrop-blur-sm border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tight">Popular Categories</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?categoryId=${cat.id}`}
                className="group relative overflow-hidden bg-white border border-slate-200 p-8 rounded-3xl transition-all hover:shadow-xl hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-6">{cat.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.name}</h3>
                  <p className="text-xs font-bold text-primary">{cat.count} Taskers</p>
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
