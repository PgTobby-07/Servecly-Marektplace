import React, { useState, useEffect } from "react"; // 1. Added useState and useEffect here
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
      <section className="bg-surface-container-low py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            {user && ( //NEW CHANGE
              <p className="text-lg text-primary font-semibold mb-4">
                Welcome back, {user?.name || "User"}
              </p>
            )}

            <h1 className="text-5xl md:text-7xl text-on-surface mb-6 leading-tight">
              Expert help, <br />
              <span className="text-primary-container font-extrabold">
                curated precision.
              </span>
            </h1>
            <p className="text-on-surface-variant text-xl mb-10 leading-relaxed">
              Connect {user?.name || "today"} with vetted professionals for home
              repairs, moving, assembly, and more. The architectural standard
              for service marketplaces.
            </p>

          <form onSubmit={handleSearch} className="flex-grow relative">
           <input
                type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you need help with?"
              className="w-full bg-surface-container-highest px-6 py-5 rounded-2xl ..."
           />
          <button type="submit" className="absolute right-4 top-4 bg-primary p-3 ...">
              {/* Magnifying glass icon */}
           </button>
</form>
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
