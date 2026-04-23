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

  // FIX 1: Prevent horizontal scroll globally (mobile overflow issue)
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
    // FIX 2: Prevent full page horizontal overflow
    <div className="bg-[#020617] text-slate-200 min-h-screen w-full overflow-x-hidden">

      {/* FIX 3: Reduce side padding on mobile */}
      <header className="relative z-30 pt-8 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        <Link
          to={!user ? "/login" : "/dashboard"}
          className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 p-4 rounded-2xl w-full md:w-auto"
        >

          {/* FIX 4: Avatar stays fixed size (prevents shrinking overflow issues) */}
          <div className={`h-12 w-12 bg-gradient-to-tr ${status.color} rounded-xl flex items-center justify-center font-black text-white`}>
            {status.initial}
          </div>

          {/* FIX 5: Allow text wrapping instead of forcing horizontal overflow */}
          <div className="pr-2 break-words min-w-0">
            <span className="block text-[8px] uppercase tracking-[0.3em] text-cyan-500">
              {status.label}
            </span>
            <span className="block text-sm font-bold text-white leading-tight">
              {status.message}
            </span>
            <span className="block text-[7px] text-slate-500 uppercase tracking-widest">
              {status.subtext}
            </span>
          </div>

        </Link>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-12 pb-16">

        {/* FIX 6: Prevent wide layout overflow on mobile */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">

          <div className="text-center lg:text-left">

            {/* FIX 7: Responsive typography (prevents 7xl overflow on small screens) */}
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[0.9] break-words text-white">
              Expert help, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                curated precision.
              </span>
            </h1>

            <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto lg:mx-0">

              {/* FIX 8: input + button must shrink properly on mobile */}
              <div className="flex items-center bg-white/5 border border-white/10 p-2 rounded-[2.5rem] w-full">

                {/* FIX 9: min-w-0 prevents input overflow pushing layout */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Locate vetted expertise..."
                  className="flex-1 min-w-0 bg-transparent px-4 sm:px-6 py-4 text-white outline-none placeholder:text-slate-500"
                />

                {/* FIX 10: prevent button shrinking weirdly */}
                <button
                  type="submit"
                  className="bg-cyan-500 text-white p-3 sm:p-5 rounded-full shrink-0"
                >
                  🔍
                </button>

              </div>
            </form>
          </div>

          {/* FIX 11: hide image on mobile to prevent layout overflow */}
          <div className="hidden lg:block">
            <img
              src={fdxImage}
              className="w-full h-[450px] object-cover rounded-[60px_30px]"
              alt="Hero"
            />
          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20">

        {/* FIX 12: responsive grid to prevent right-side cutoff */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">

          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/services?categoryId=${cat.id}`}
              className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-3xl"
            >

              {/* FIX 13: icon scales properly on small screens */}
              <div className="text-3xl sm:text-5xl mb-3">{cat.icon}</div>

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

    </div>
  );
};

export default Home;
