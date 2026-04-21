import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  // Reverting to your production Render URL as requested
  const API_URL = import.meta.env.VITE_API_URL || 'https://servecly-api.onrender.com';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setError(null);
        // Step 1: Hit the specific categories endpoint
        const response = await fetch(`${API_URL}/v1/services/categories`);
        
        if (!response.ok) throw new Error('Could not synchronize with Servecly Cloud');

        const data = await response.json();
        // Step 2: Update state with REAL database rows
        setCategories(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Marketplace connectivity lost. Please refresh.");
      }
    };

    fetchCategories();
  }, [API_URL]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* change: Alert now only shows for actual errors, no more "Showing Demo Data" msg */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-8 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display text-on-surface mb-2">Find Help</h1>
          <p className="text-on-surface-variant">Available tasks and services in your area</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-grow md:w-64">
             <input 
               type="text" 
               placeholder="Search live tasks..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-surface-container-high px-4 py-2 rounded-xl text-sm focus:outline-none"
             />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-primary font-bold cursor-pointer">All Services</li>
              
              {/* change: Removed hardcoded "Home Repair" and "Furniture" list items */}
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id} className="hover:text-primary cursor-pointer transition-colors flex justify-between">
                    <span>{cat.name}</span>
                    <span className="opacity-40 text-[10px] font-bold">[{cat.taskerCount || 0}]</span>
                  </li>
                ))
              ) : (
                <p className="text-xs italic opacity-50">No categories found in DB.</p>
              )}
            </ul>
          </div>
        </aside>

        <div className="lg:col-span-3">
          {/* change: TaskList now handles only real API data. 
              If DB is empty, TaskList will show "No services found" */}
          <TaskList query={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Services;
