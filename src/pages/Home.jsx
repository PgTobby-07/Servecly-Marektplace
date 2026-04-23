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

  // FIX 1: Prevent horizontal scroll globally
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

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

    const firstName = user.name?.split(" ")[0] || "User";

    if (user.role === "admin") {
      return {
        label: "SYSTEM ADMIN",
        message: `Root Control: ${firstName}`,
        subtext: "SYSTEM CORE OPERATIONAL",
        color: "from-cyan-500 to-blue-600 shadow-cyan-500/20",
        initial: user.name?.charAt(0)
      };
    }

    if (user.role === "tasker") {
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
    { id: 1, name: "Beds", icon: "🛏️", count: "200+" },
    { id: 5, name: "Deep Cleaning", icon: "✨", count: "150+" },
    { id: 2, name: "Desks", icon: "💻", count: "340+" },
    { id: 4, name: "Shelving", icon: "🛠️", count: "100+" },
    { id: 3, name: "TV Mounting", icon: "🖼️", count: "500+" },
  ];

  return (
    // FIX 2: ensure full page never clips bottom content
    <div className="bg-[#020617] text-slate-200 min-h-screen w-full overflow-x-hidden flex flex-col">

      {/* FIX 3: allow proper vertical flow instead of hidden clipping */}
      <main className="flex-1 w-full">

        {/* TOP NAV */}
        <header className="relative z-30 pt-8 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          <Link
            to={!user ? "/login" : "/dashboard"}
            className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-full md:w-auto"
          >
            <div className={`h-12 w-12 bg-gradient-to-tr ${status.color} rounded-xl flex items-center justify-center font-black text-white`}>
              {status.initial}
            </div>

            {/* FIX 4: prevent text overflow */}
            <div className="min-w-0 break-words">
              <span className="block text-[8px] uppercase text-cyan-500">
                {status.label}
              </span>
              <span className="block text-sm font-bold text-white">
                {status.message}
              </span>
              <span className="block text-[7px] text-slate-500 uppercase">
                {status.subtext}
              </span>
            </div>
          </Link>
        </header>

        {/* HERO */}
        <section className="pt-12 pb-16">

          {/* FIX 5: add safe padding on mobile + prevent cut-off */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">

            <div>

              {/* FIX 6: responsive text prevents horizontal overflow */}
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[0.9] text-white break-words">
                Expert help, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  curated precision.
                </span>
              </h1>

              <form onSubmit={handleSearch} className="mt-10 max-w-2xl">

                {/* FIX 7: input shrink fix */}
                <div className="flex items-center bg-white/5 border border-white/10 p-2 rounded-[2.5rem]">

                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Locate vetted expertise..."
                    className="flex-1 min-w-0 bg-transparent px-4 py-4 text-white outline-none"
                  />

                  <button className="bg-cyan-500 p-3 rounded-full shrink-0">
                    🔍
                  </button>

                </div>
              </form>
            </div>

            {/* FIX 8: hide image on mobile prevents overflow */}
            <div className="hidden lg:block">
              <img
                src={fdxImage}
                className="w-full h-[450px] object-cover rounded-3xl"
              />
            </div>

          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-20">

          {/* FIX 9: grid stays safe on small screens */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">

            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?categoryId=${cat.id}`}
                className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-3xl"
              >
                <div className="text-3xl sm:text-5xl">{cat.icon}</div>
                <h3 className="text-sm sm:text-xl font-black text-white">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-cyan-500 uppercase">
                  {cat.count}
                </span>
              </Link>
            ))}

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
              <span className="block text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 italic">Founder, Servecly</span>
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
            <span className="text-slate-500 text-[10px] font-bold uppercase mt-2"> CTO, Servecly</span>
          </div>
        </div>
      </footer>
        </main>
    </div>
  );
};

export default Home;
