import React from 'react';

const TaskCard = ({ task }) => {
  // CHANGE: Included category_name from our updated SQL JOIN
  const { title, description, price, category_name } = task;

  return (
    <div className="group relative flex flex-col gap-4 p-6 rounded-3xl bg-white border border-outline-variant shadow-sm hover:shadow-xl hover:border-primary transition-all duration-300 min-h-[240px]">
      
      {/* CHANGE: Added a 'Book Now' arrow that appears only when the user hovers over the card */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white p-2 rounded-full">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>

      <div className="flex flex-col gap-1">
        {/* CHANGE: Added category label at the top for better context */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary opacity-80">
          {category_name || 'Service'}
        </span>
        
        <h3 className="text-xl font-display text-on-surface leading-tight font-bold group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
      
      <p className="text-on-surface-variant text-sm line-clamp-3 leading-relaxed">
        {description}
      </p>

      <div className="mt-auto pt-4 border-t border-dashed border-outline-variant flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[10px] text-on-surface-variant uppercase font-medium">Starting at</span>
          {/* CHANGE: Price now uses the alias from services.py and is styled more prominently */}
          <div className="flex items-center gap-1 font-display font-black text-2xl text-on-surface">
            ${price}
            <span className="text-xs font-normal text-on-surface-variant">/hr</span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-3 py-1 bg-surface-container rounded-lg text-[11px] font-medium text-on-surface-variant">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          Istanbul
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
