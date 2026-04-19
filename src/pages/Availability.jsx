import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const Availability = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  
  const [schedule, setSchedule] = useState({});

  const toggleSlot = (day, slot) => {
    const key = `${day}-${slot}`;
    setSchedule(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-display text-on-surface mb-2">Availability</h1>
            <p className="text-on-surface-variant">Set your working hours to receive task requests</p>
          </div>
          <button className="btn-primary py-3 px-8 text-sm font-bold shadow-xl shadow-primary/10">
            Save Changes
          </button>
        </div>

        <div className="card-tonal bg-white p-8 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-8 gap-4 mb-8">
              <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-50 flex items-center">Time Slot</div>
              {days.map(day => (
                <div key={day} className="text-sm font-bold text-center text-on-surface py-2 bg-surface-container-low rounded-lg">
                  {day.substring(0, 3)}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="space-y-4">
              {timeSlots.map(slot => (
                <div key={slot} className="grid grid-cols-8 gap-4 items-center">
                  <div className="text-xs font-bold text-on-surface-variant">{slot}</div>
                  {days.map(day => {
                    const isActive = schedule[`${day}-${slot}`];
                    return (
                      <button
                        key={`${day}-${slot}`}
                        onClick={() => toggleSlot(day, slot)}
                        className={`h-12 rounded-xl transition-all border-2 flex items-center justify-center ${
                          isActive 
                            ? 'bg-primary border-primary text-white shadow-md shadow-primary/20' 
                            : 'bg-surface-container-low border-transparent hover:border-outline-variant/30 text-transparent hover:text-on-surface-variant/20'
                        }`}
                      >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                         </svg>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-surface-container-low rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl">☕</div>
              <div>
                 <h4 className="text-sm font-bold text-on-surface">Auto-Lunch</h4>
                 <p className="text-xs text-on-surface-variant">Block 12 PM - 1 PM daily</p>
              </div>
           </div>
           <div className="p-6 bg-surface-container-low rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl">📅</div>
              <div>
                 <h4 className="text-sm font-bold text-on-surface">Weekend Warrior</h4>
                 <p className="text-xs text-on-surface-variant">Enable Sat & Sun only</p>
              </div>
           </div>
           <div className="p-6 bg-surface-container-low rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl">🏠</div>
              <div>
                 <h4 className="text-sm font-bold text-on-surface">Standard Week</h4>
                 <p className="text-xs text-on-surface-variant">Apply 9 AM - 5 PM (M-F)</p>
              </div>
           </div>
        </div>
      </div>
  );
};

export default Availability;
