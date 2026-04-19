import React from 'react';
import TaskList from '../components/TaskList';

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
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
               className="w-full bg-surface-container-high px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
             />
          </div>
          <button className="bg-surface-container-highest px-6 py-2 rounded-xl text-sm font-semibold hover:bg-outline-variant/20 transition-colors">
            Map View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-primary font-bold">All Services</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Home Repair</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Furniture Assembly</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Moving Help</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Cleaning</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Price Range</h3>
            <input type="range" className="w-full accent-primary" />
            <div className="flex justify-between text-xs mt-2 opacity-60">
              <span>$15/hr</span>
              <span>$150/hr</span>
            </div>
          </div>
        </aside>

        {/* Task List Content */}
        <div className="lg:col-span-3">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Services;
