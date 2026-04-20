import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const bookings = [
    {
      id: 'BK-1024',
      task: 'IKEA Malm Bed Assembly',
      tasker: 'Alex Johnson',
      date: 'March 25, 2026',
      time: '10:00 AM',
      status: 'Confirmed',
      price: '$85.00',
      type: 'upcoming'
    },
    {
      id: 'BK-1011',
      task: 'TV Wall Mounting',
      tasker: 'Sarah Miller',
      date: 'March 18, 2026',
      time: '2:30 PM',
      status: 'Completed',
      price: '$120.00',
      type: 'past'
    },
    {
      id: 'BK-0988',
      task: 'Kitchen Deep Cleaning',
      tasker: 'David Chen',
      date: 'March 10, 2026',
      time: '9:00 AM',
      status: 'Completed',
      price: '$210.00',
      type: 'past'
    }
  ];

  const filteredBookings = bookings.filter(b => b.type === activeTab);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-primary-fixed text-primary';
      case 'Completed':
        return 'bg-tertiary-fixed text-tertiary';
      default:
        return 'bg-surface-container-highest text-on-surface-variant';
    }
  };

  return (
      <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-display text-on-surface mb-2">Your Bookings</h1>
            <p className="text-on-surface-variant">Track and manage your scheduled services</p>
          </div>
          
          <div className="flex bg-surface-container-low p-1 rounded-2xl">
            {['upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl text-sm font-bold capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="card-tonal group hover:bg-surface-container-low transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-8 py-8 px-10">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="w-16 h-16 bg-surface-container-highest rounded-2xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {booking.task.includes('Assembly') ? '🛠️' : booking.task.includes('Mounting') ? '📺' : '✨'}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-on-surface">{booking.task}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant">
                      Tasker: <span className="font-semibold text-on-surface">{booking.tasker}</span> • ID: {booking.id}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 border-t md:border-t-0 border-outline-variant/10 pt-6 md:pt-0">
                  <div className="text-right">
                    <div className="text-sm font-bold text-on-surface">{booking.date}</div>
                    <div className="text-xs text-on-surface-variant">{booking.time}</div>
                  </div>
                  <div className="text-2xl font-display font-bold text-primary-container">
                    {booking.price}
                  </div>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                   <button className="flex-1 md:flex-none px-6 py-3 bg-surface-container-high rounded-xl text-xs font-bold hover:bg-surface-container-highest transition-colors">
                     Details
                   </button>
                   {activeTab === 'upcoming' && (
                     <button className="flex-1 md:flex-none px-6 py-3 border border-outline-variant/20 rounded-xl text-xs font-bold hover:bg-error-container hover:text-error hover:border-transparent transition-all">
                       Cancel
                     </button>
                   )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-surface-container-low/50 rounded-3xl border border-dashed border-outline-variant/20">
              <div className="text-5xl mb-4 opacity-20">📅</div>
              <p className="text-on-surface-variant font-medium">No {activeTab} bookings found.</p>
              <button className="mt-6 btn-primary py-3 px-8 text-xs font-bold">
                Book a New Task
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default Bookings;
