import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const AdminTaxonomy = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Furniture Assembly',
      icon: '🛠️',
      subcategories: ['Beds', 'Desks', 'Chairs', 'Wardrobes'],
      active: true
    },
    {
      id: 2,
      name: 'Mounting',
      icon: '📺',
      subcategories: ['TV Mounting', 'Art & Photos', 'Shelving'],
      active: true
    },
    {
      id: 3,
      name: 'Cleaning',
      icon: '✨',
      subcategories: ['Deep Cleaning', 'Move-out Cleaning', 'Office Cleaning'],
      active: true
    }
  ]);

  return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-display text-on-surface mb-2">Service Taxonomy</h1>
            <p className="text-on-surface-variant">Manage categories and marketplace hierarchy</p>
          </div>
          <button className="btn-primary py-3 px-8 text-sm font-bold shadow-xl shadow-primary/10">
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.id} className="card-tonal p-8 flex flex-col h-full hover:bg-surface-container-low transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                 <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                   {cat.icon}
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
                    {cat.subcategories.map(sub => (
                      <span key={sub} className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-medium text-on-surface-variant">
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
          ))}
        </div>
      </div>
  );
};

export default AdminTaxonomy;
