import React from 'react';

const TaskCard = ({ task }) => {
  // Destructure with fallbacks to avoid errors if a field is missing
  const { title, description, location, scheduled_time, status, price } = task;

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-secondary-container text-on-surface-variant';
      case 'confirmed':
        return 'bg-primary-fixed text-primary';
      case 'completed':
        return 'bg-tertiary-fixed text-tertiary';
      case 'canceled':
        return 'bg-error-container text-error';
      default:
        // Default style for when status is undefined (like in your search results)
        return 'bg-surface-container-highest text-on-surface-variant';
    }
  };

  return (
    <div className="card-tonal card-hover flex flex-col gap-4 border-none shadow-none p-5 rounded-2xl bg-white">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-xl font-display text-on-surface leading-tight font-semibold">
          {title}
        </h3>
        {/* Only show status badge if status exists */}
        {status && (
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${getStatusStyles(status)}`}>
            {status}
          </span>
        )}
      </div>
      
      <p className="text-on-surface-variant text-sm line-clamp-2">
        {description}
      </p>

      <div className="mt-auto pt-2 flex flex-col gap-2 text-xs text-on-surface-variant">
        {/* Show Price if it exists (from your Search endpoint) */}
        {price && (
          <div className="flex items-center gap-2 font-bold text-primary text-sm">
            ${price}/hr
          </div>
        )}

        {/* Location Section */}
        {location && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
        )}

        {/* Time Section */}
        {scheduled_time && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date(scheduled_time).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
