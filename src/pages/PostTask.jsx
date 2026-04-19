import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const PostTask = () => {
  const [step, setStep] = useState(1);

  return (
      <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-12">
          <h1 className="text-4xl font-display text-on-surface mb-2">Post a Task</h1>
          <p className="text-on-surface-variant">Describe what you need help with to receive offers from vetted taskers.</p>
        </div>

        <form className="card-tonal bg-white p-8 md:p-12 space-y-10" onSubmit={(e) => e.preventDefault()}>
          {/* Section 1: Task Basics */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Task Basics</h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-xs font-bold text-on-surface">Task Title</label>
              <input 
                id="title"
                name="title"
                type="text" 
                placeholder="e.g., Assemble IKEA Malm Bed Frame" 
                className="w-full bg-surface-container-low px-4 py-4 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none text-lg font-medium" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xs font-bold text-on-surface">Category</label>
                <select id="category" name="category" className="w-full bg-surface-container-low px-4 py-4 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none">
                  <option>Furniture Assembly</option>
                  <option>Mounting</option>
                  <option>Cleaning</option>
                  <option>Moving Help</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="text-xs font-bold text-on-surface">Location</label>
                <input 
                  id="location"
                  name="location"
                  type="text" 
                  placeholder="Street Address or Neighborhood" 
                  className="w-full bg-surface-container-low px-4 py-4 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Details */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Task Details</h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-xs font-bold text-on-surface">Description</label>
              <textarea 
                id="description"
                name="description"
                rows="5" 
                placeholder="Provide details about the task, including size, weight, or specific instructions..." 
                className="w-full bg-surface-container-low px-4 py-4 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none resize-none"
              ></textarea>
            </div>
            <div className="flex flex-col gap-4">
               <label className="text-xs font-bold text-on-surface">Add Photos (Optional)</label>
               <div className="w-full h-32 border-2 border-dashed border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">
                  <span className="text-2xl mb-1">📷</span>
                  <span className="text-xs font-bold">Click to upload photos</span>
               </div>
            </div>
          </div>

          {/* Section 3: Scheduling */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Scheduling & Budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-xs font-bold text-on-surface">Preferred Date</label>
                <input id="date" name="date" type="date" className="w-full bg-surface-container-low px-4 py-4 rounded-xl outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="hours" className="text-xs font-bold text-on-surface">Estimated Hours</label>
                <input id="hours" name="hours" type="number" placeholder="2" className="w-full bg-surface-container-low px-4 py-4 rounded-xl outline-none" />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-outline-variant/10 flex justify-end">
             <button type="submit" className="btn-primary py-4 px-12 text-sm font-bold shadow-xl shadow-primary/20">
               Preview & Post Task
             </button>
          </div>
        </form>
      </div>
  );
};

export default PostTask;
