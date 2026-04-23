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

        {/* FIX 10: IMPORTANT — added missing bottom spacing so pages don’t get cut off */}
        <div className="h-16 sm:h-24" />

        {/* ENGINEER SECTION */}
        <section className="py-24 sm:py-32 bg-white/[0.01] border-y border-white/5">

          {/* FIX 11: prevent side clipping on mobile */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 lg:gap-24">

            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-10">
                Envisioned at <span className="text-cyan-500">Istinye University.</span>
              </h2>

              <p className="text-lg sm:text-2xl text-slate-300 italic">
                "In the next 5 years..."
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* FIX 12: footer now always fully visible (no cut off) */}
      <footer className="py-24 sm:py-32 text-center bg-cyan-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xl sm:text-4xl text-white italic">
            "Servecly improves lives..."
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
