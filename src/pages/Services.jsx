import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // CHANGE: Essential for Step 4 (Hot-Zone Navigation)
import TaskList from '../components/TaskList';
import { useLocation } from 'react-router-dom';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // CHANGE: Step 2 - Tracking the 'Active' category
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // CHANGE: Step 4 - Initializing the "Bridge" to Post Task

  const API_URL = import.meta.env.VITE_API_URL || 'https://servecly-api.onrender.com';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCat = queryParams.get('categoryId');

   useEffect(() => {
  if (initialCat) {
    setSelectedCategoryId(parseInt(initialCat)); // Automatically clicks the category for the user!
  }
}, [initialCat]);
  // CHANGE: Step 5 - Optional Role-Based Logic (Retrieving role from local storage)
  const userRole = localStorage.getItem('userRole') || 'client'; 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setError(null);
        const response = await fetch(`${API_URL}/v1/services/categories`);
        if (!response.ok) throw new Error('Could not synchronize with Servecly Cloud');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Marketplace connectivity lost. Please refresh.");
      }
    };
    fetchCategories();
  }, [API_URL]);

  return (
    /* CHANGE: Step 1 & "Glass" Layout - Added 'min-h-screen' and relative positioning for the Aura Background */
    <div className="min-h-screen relative overflow-hidden bg-surface text-on-surface">
      
      {/* CHANGE: The "Aura" Background - Animated-style mesh gradient blobs using theme colors */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 animate-in slide-in-from-bottom-4 duration-700">
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-8 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-display text-on-surface mb-3 tracking-tight font-bold">
              Find Help
            </h1>
            <p className="text-on-surface-variant text-lg">
              Explore professional services in <span className="text-primary font-medium">Istanbul</span>
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-grow md:w-80 group">
               {/* CHANGE: Visuals - Search bar now uses glassmorphism (bg-white/40 + backdrop-blur) */}
               <input 
                 type="text" 
                 placeholder="Search services (e.g. Shelving)..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-white/40 backdrop-blur-md border border-outline-variant px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm group-hover:shadow-md"
               />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Step 2: Category Sidebar */}
          <aside className="hidden lg:block space-y-8">
            <div className="bg-white/30 backdrop-blur-md p-6 rounded-3xl border border-outline-variant/30 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-6 opacity-70">
                Categories
              </h3>
              <ul className="space-y-3">
                {/* CHANGE: Logic - Clicking 'All' resets the filter */}
                <li 
                  onClick={() => setSelectedCategoryId(null)}
                  className={`cursor-pointer px-4 py-3 rounded-xl transition-all font-medium text-sm border-2 ${!selectedCategoryId ? 'bg-primary text-white border-primary shadow-lg' : 'border-transparent hover:bg-primary/10 text-on-surface-variant'}`}
                >
                  All Services
                </li>
                
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    /* CHANGE: Logic - onClick updates the state, triggering Step 3 (Filtering Logic) */
                    <li 
                      key={cat.id} 
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`group cursor-pointer px-4 py-3 rounded-xl transition-all flex justify-between items-center text-sm border-2
                        ${selectedCategoryId === cat.id ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'border-transparent hover:bg-primary/5 text-on-surface-variant hover:text-primary'}
                      `}
                    >
                      <span>{cat.name}</span>
                      {/* CHANGE: Dynamic sidebar numbers from the updated SQL query */}
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md transition-colors ${selectedCategoryId === cat.id ? 'bg-white/20' : 'bg-surface-container-high'}`}>
                        {cat.taskerCount || 0}
                      </span>
                    </li>
                  ))
                ) : (
                  <p className="text-xs italic opacity-50 px-4">Syncing categories...</p>
                )}
              </ul>
            </div>

            {/* Visual Change: Informational "Glass" Card */}
            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 backdrop-blur-sm">
              <h4 className="text-sm font-bold text-primary mb-2">
                {userRole === 'tasker' ? "Market Insights" : "Custom Request?"}
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {userRole === 'tasker' 
                  ? "See what clients in Istanbul are currently searching for to optimize your skills." 
                  : "Can't find exactly what you need? Describe your task and get custom offers."}
              </p>
            </div>
          </aside>

          {/* Step 3 & 4: Task List & Navigation */}
          <div className="lg:col-span-3">
            {/* CHANGE: Logic - TaskList is now 'Reactive'. It updates when selectedCategoryId changes */}
            <TaskList 
              query={searchQuery} 
              categoryId={selectedCategoryId}
              /* CHANGE: Step 4 - The "Secret Sauce" Navigation link passed to each card */
              onCardClick={(serviceId) => navigate(`/post-task?serviceId=${serviceId}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
