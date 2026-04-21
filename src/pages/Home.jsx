import React, { useState, useEffect } from "react"; // 1. Added useState and useEffect here
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import fdxImage from "../assets/fdx.png"; // Adjust path if your folder is named 'assets'

const Home = () => {
  // 2. This creates a "Live" variable that React watches
  const [user, setUser] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate();

  const handleSearch = (e) => {
   e.preventDefault();
  if (!searchQuery.trim()) return;
  
  // Navigate to your services page with the search term in the URL
  navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
}; 
  // 3. This runs automatically when the page loads
 useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };

    checkUser();
    // This adds an extra layer of protection if the storage changes
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);
  
  const categories = [
    { id: 1, name: "Assembly", icon: "🛠️", count: "1.2k+ Taskers" },
    { id: 2, name: "Mounting", icon: "🖼️", count: "800+ Taskers" },
    { id: 3, name: "Moving", icon: "📦", count: "2.5k+ Taskers" },
    { id: 4, name: "Cleaning", icon: "✨", count: "3k+ Taskers" },
    { id: 5, name: "Outdoor", icon: "🌳", count: "1.5k+ Taskers" },
    { id: 6, name: "Home Repair", icon: "🏠", count: "1k+ Taskers" },
    { id: 7, name: "Painting", icon: "🎨", count: "600+ Taskers" },
    { id: 8, name: "Office", icon: "💻", count: "400+ Taskers" },
  ];

 return (
    <div className="animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <section className="bg-surface-container-low py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* 1. Alignment Fix: 'items-center' ensures text and image are vertically centered */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            
            {/* Left Side: Text Content */}
            <div className="max-w-2xl w-full"> 
              {user && (
                <p className="text-lg text-primary font-semibold mb-4 tracking-wide">
                  {user.role === 'admin' && "System Administrator: "}
                  {user.role === 'tasker' && "Ready to work, "}
                  {user.role === 'users' && "Welcome back, "} 
                  {user.name}
                </p>
              )}

              {/* 2. Typography Fix: 'tracking-tight' and 'font-bold' for a premium look */}
              <h1 className="text-5xl md:text-7xl text-on-surface mb-6 leading-[1.1] tracking-tight font-bold">
                Expert help, <br />
                <span className="text-primary font-extrabold">
                  curated precision.
                </span>
              </h1>
              
              {/* 3. Spacing Fix: 'max-w-xl' and 'opacity-90' for better readability */}
              <p className="text-on-surface-variant text-xl mb-10 leading-relaxed max-w-xl opacity-90">
                Connect {user?.name || "today"} with vetted professionals for home
                repairs, moving, assembly, and more. The architectural standard
                for service marketplaces.
              </p>

              {/* 4. Search Bar Fix: 'max-w-md' prevents it from stretching too far */}
              <form onSubmit={handleSearch} className="relative w-full max-w-lg group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you need help with?"
                  className="w-full bg-surface-container-highest px-6 py-5 rounded-2xl outline-none border-2 border-transparent focus:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-xl hover:brightness-110 active:scale-95 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right Side: Your Image */}
            <div className="hidden md:block w-full max-w-lg relative">
              {/* Decorative "Soft" Glow behind the image */}
              <div className="absolute -inset-4 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
              
              <img 
                src={fdxImage} 
                alt="Expert lighting installation" 
                className="relative z-10 w-full h-[550px] object-cover shadow-2xl transition-all duration-700 hover:scale-[1.03]"
                style={{
                  borderRadius: "80px 20px 80px 20px" 
                }}
              />
              
              <div className="absolute -bottom-6 -left-8 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 animate-in slide-in-from-left duration-1000">
                <div className="bg-green-500 text-white rounded-full p-1.5 shadow-sm">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-800">Vetted Professional</span>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-tighter">Identity & Background Checked</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-display text-on-surface mb-2">
              Popular Categories
            </h2>
            <p className="text-on-surface-variant">
              Find the right expert for any task
            </p>
          </div>
          <Link
            to="/services"
            className="text-primary font-semibold hover:underline"
          >
            View all services →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/services?cat=${cat.name.toLowerCase()}`}
              className="card-tonal group hover:bg-surface-container-low transition-all duration-300 flex flex-col items-center text-center py-10"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-on-surface-variant opacity-70">
                {cat.count}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-primary-container text-white py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-display mb-4 italic">
              "The Curated Precision"
            </h2>
            <p className="text-primary-fixed text-lg opacity-90">
              Every Tasker on Servecly undergoes a rigorous multi-step vetting
              process, ensuring the highest architectural standards for every
              job.
            </p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">99.8%</div>
              <div className="text-xs uppercase tracking-widest opacity-70">
                Satisfied
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">150k+</div>
              <div className="text-xs uppercase tracking-widest opacity-70">
                Tasks Done
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
