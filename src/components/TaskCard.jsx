import React from 'react';

const TaskCard = ({ task }) => {
  // logic: Destructure fields returned by your SQLAlchemy search query
  // change: Added 'base_price' fallback to ensure price shows correctly from SQL column name
  const { title, description, location, scheduled_time, status, price, base_price } = task;

  const displayPrice = price || base_price;

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-secondary-container text-on-surface-variant';
      case 'confirmed': return 'bg-primary-fixed text-primary';
      case 'completed': return 'bg-tertiary-fixed text-tertiary';
      case 'cancelled': return 'bg-error-container text-error'; // logic: Matches your SQL 'cancelled' spelling
      default: return 'bg-surface-container-highest text-on-surface-variant';
    }
  };

  return (
    <div className="card-tonal card-hover flex flex-col gap-4 border-none shadow-none p-5 rounded-2xl bg-white min-h-[220px]">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-xl font-display text-on-surface leading-tight font-semibold">
          {title}
        </h3>
        {/* change: Matches status names in your 'BookingStatus' table */}
        {status && (
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${getStatusStyles(status)}`}>
            {status}
          </span>
        )}
      </div>
      
      <p className="text-on-surface-variant text-sm line-clamp-3">
        {description}
      </p>

      <div className="mt-auto pt-4 flex flex-col gap-2 text-xs text-on-surface-variant">
        {/* logic: Displays price from Service table 'base_price' */}
        {displayPrice && (
          <div className="flex items-center gap-2 font-bold text-primary text-base">
            ${displayPrice}/hr
          </div>
        )}

        {/* logic: Fallback if Address table data isn't joined yet */}
        {location ? (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {location}
          </div>
        ) : (
          <div className="flex items-center gap-2 italic opacity-50">
             Remote / To be decided
          </div>
        )}

        {scheduled_time && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date(scheduled_time).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
