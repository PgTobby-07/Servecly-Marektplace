import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TaskList from '../components/TaskList';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation(); 
  const API_URL = import.meta.env.VITE_API_URL || 'https://servecly-api.onrender.com';

  // LOGIC: THE SYNC LISTENER
  // This effect watches the URL and automatically filters the page if you came from Home
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catId = params.get('categoryId');
    const search = params.get('search');

    if (catId) {
      setSelectedCategoryId(parseInt(catId)); // Sets the sidebar active state
    }
    if (search) {
      setSearchQuery(decodeURIComponent(search)); // Populates the search input
    }
  }, [location.search]);

  // ROLE LOGIC: Used for custom UI hints
  const userRole = localStorage.getItem('userRole') || 'client'; 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setError(null);
        const response = await fetch(`${API_URL}/v1/services/categories`);
        if (!response.ok) throw new Error('Cloud sync failed');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Marketplace connectivity lost. Please refresh.");
      }
    };
    fetchCategories();
  }, [API_URL]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-surface text-on-surface">
      
      {/* THE AURA: High-end mesh background */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 animate-in slide-in-from-bottom-4 duration-700">
        
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-8 text-sm font-medium">⚠️ {error}</div>
        )}

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-display font-bold text-on-surface mb-3 tracking-tight">Find Help</h1>
            <p className="text-on-surface-variant text-lg">Explore professional services in <span className="text-primary font-medium">Istanbul</span></p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-grow md:w-80 group">
               <input 
                 type="text" 
                 placeholder="Search services..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-white/40 backdrop-blur-md border border-outline-variant px-6 py-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all shadow-sm"
               />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* SIDEBAR */}
          <aside className="hidden lg:block space-y-8">
            <div className="bg-white/30 backdrop-blur-md p-6 rounded-3xl border border-outline-variant/30 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-6 opacity-70">Categories</h3>
              <ul className="space-y-3">
  <li
    onClick={() => {
      setSelectedCategoryId(null);
      navigate('/services');
    }}
    className={`cursor-pointer px-4 py-3 rounded-xl transition-all text-sm font-medium border-2 ${
      !selectedCategoryId
        ? 'bg-primary text-white border-primary shadow-lg'
        : 'border-transparent hover:bg-primary/10 text-on-surface-variant'
    }`}
  >
    All Services
  </li>

  {categories.map((cat) => (
    <li
      key={cat.id}
      onClick={() => {
        setSelectedCategoryId(cat.id);
        navigate(`/services?categoryId=${cat.id}`);
      }}
      className={`group cursor-pointer px-4 py-3 rounded-xl transition-all flex justify-between items-center text-sm border-2
        ${
          selectedCategoryId === cat.id
            ? 'bg-primary text-white border-primary shadow-lg'
            : 'border-transparent hover:bg-primary/5 text-on-surface-variant hover:text-primary'
        }
      `}
    >
      <span>{cat.name}</span>

      <span
        className={`text-[10px] font-bold px-2 py-1 rounded-md ${
          selectedCategoryId === cat.id
            ? 'bg-white/20'
            : 'bg-surface-container-high'
        }`}
      >
        {cat.taskerCount || 0}
      </span>
    </li>
  ))}
</ul>
            </div>

            {/* INSIGHT CARD */}
            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 backdrop-blur-sm">
              <h4 className="text-sm font-bold text-primary mb-2">
                {userRole === 'tasker' ? "Market Rate" : "Special Request?"}
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed opacity-80">
                {userRole === 'tasker' ? "See the current average for services." : "Describe your custom task to get offers."}
              </p>
            </div>
          </aside>

          {/* TASK LIST AREA */}
          <div className="lg:col-span-3">
            <TaskList 
              query={searchQuery} 
              categoryId={selectedCategoryId}
              /* THE SECRET SAUCE: Redirecting to post-task with the selected service */
              onCardClick={(serviceId) => navigate(`/post-task?serviceId=${serviceId}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
