import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminTaxonomy = () => {
  // 1. Get user and setup API URL
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // 2. Fetch real categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/v1/categories`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to load taxonomy from database:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [API_URL]);

  // 3. Security Gate
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low">
        <div className="text-center p-12 card-tonal bg-white max-w-md rounded-3xl shadow-lg">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="text-2xl font-display text-error mb-4 font-bold">Access Denied</h2>
          <p className="text-on-surface-variant mb-8 leading-relaxed">
            This area is reserved for the Servecly Architectural Team. 
          </p>
          <Link to="/" className="btn-primary py-3 px-10 rounded-xl inline-block font-bold shadow-md">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  // 4. Live API Logic for the "Add Category" Button
  const handleAddCategory = async () => {
    const categoryName = prompt("Enter the name of the new service category:");
    if (!categoryName) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/v1/categories`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          name: categoryName, 
          icon: '📁', 
          subcategories: [],
          active: true 
        }),
      });

      const newCat = await response.json();

      if (response.ok) {
        // Update the UI state immediately with the real record from the DB
        setCategories([...categories, newCat]);
      } else {
        alert(newCat.detail || "Error adding category to the backend.");
      }
    } catch (err) {
      console.error("Connection to Render failed:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-display text-on-surface mb-2">Service Taxonomy</h1>
          <p className="text-on-surface-variant">Manage categories and marketplace hierarchy</p>
        </div>
        
        {/* ADD CATEGORY NOW TRIGGERS THE API CALL */}
        <button 
          onClick={handleAddCategory}
          className="btn-primary py-3 px-8 text-sm font-bold shadow-xl shadow-primary/10"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-3 text-center py-20 opacity-50 font-bold">Connecting to Servecly Database...</div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="card-tonal p-8 flex flex-col h-full hover:bg-surface-container-low transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                 <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                   {cat.icon || '📁'}
                 </div>
                 <div className="flex gap-2">
                   <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">✏️</button>
                   <button className="p-2 hover:bg-error-container hover:text-error rounded-lg transition-colors">🗑️</button>
                 </div>
              </div>

              <h3 className="text-xl font-bold text-on-surface mb-4">{cat.name}</h3>
              
              <div className="space-y-2 flex-grow">
                 <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant opacity-50 mb-2">Sub-categories</h4>
                 <div className="flex flex-wrap gap-2">
                    {cat.subcategories?.map((sub, idx) => (
                      <span key={idx} className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-medium text-on-surface-variant">
                        {sub}
                      </span>
                    ))}
                    <button className="px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold hover:bg-primary/10 transition-colors">
                      + Add
                    </button>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                 <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-md ${cat.active ? 'bg-tertiary-fixed text-tertiary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                   {cat.active ? 'Active' : 'Inactive'}
                 </span>
                 <button className="text-primary text-xs font-bold hover:underline">Manage Rules →</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTaxonomy;
