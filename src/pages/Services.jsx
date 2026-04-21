import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  // Consistency check with your Login.jsx environment variables
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setError(null);
        // Updated to match your Swagger UI prefix: /v1/services/categories
        const response = await fetch(`${API_URL}/v1/services/categories`);
        
        if (!response.ok) throw new Error('Failed to connect to backend');

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to connect to the backend. Showing demo data.");
      }
    };

    fetchCategories();
  }, [API_URL]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
      {/* Error Alert */}
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
               placeholder="Filter services..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-surface-container-high px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
             />
          </div>
          <button className="bg-surface-container-highest px-6 py-2 rounded-xl text-sm font-semibold">
            Map View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="hidden lg:block space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-primary font-bold cursor-pointer">All Services</li>
              {/* Map backend categories */}
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id} className="hover:text-primary cursor-pointer transition-colors flex justify-between">
                    <span>{cat.name}</span>
                    <span className="opacity-50">({cat.taskerCount})</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="hover:text-primary cursor-pointer">Home Repair</li>
                  <li className="hover:text-primary cursor-pointer">Furniture Assembly</li>
                </>
              )}
            </ul>
          </div>
          {/* Price Range Slider */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Price Range</h3>
            <input type="range" className="w-full accent-primary" />
            <div className="flex justify-between text-xs mt-2 opacity-60">
              <span>$15/hr</span>
              <span>$150/hr</span>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          {/* We pass the search query to TaskList to fetch filtered results */}
          <TaskList query={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Services;
