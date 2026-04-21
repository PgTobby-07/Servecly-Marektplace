import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  /* 1. STATE MANAGEMENT: Fetch user from localStorage to fix the blank screen */
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const Logout = () => {
    localStorage.clear(); // Wipes everything for a clean logout
    navigate('/login');
  };

  /* 2. DYNAMIC STATS: These could eventually come from an API */
  const stats = [
    { label: "This Month", value: "$2,450", change: "+12%", icon: "📈" },
    { label: "Completed", value: "38", icon: "✅" },
    { label: "Rating", value: "4.95", icon: "⭐" },
    { label: "Active Tasks", value: "3", icon: "🏃" },
  ];

  const notifications = [
    { id: 1, text: "New task request: 'Bookshelf Assembly'", time: "2m ago", unread: true },
    { id: 2, text: "Payment received for 'TV Mounting'", time: "1h ago", unread: false },
    { id: 3, text: "Review left by Sarah Miller: 'Great job!'", time: "5h ago", unread: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 3. PENDING BANNER: Only appears if the user is a tasker awaiting approval */}
      {user?.status === 'pending' && (
        <div className="mb-12 p-8 rounded-3xl bg-amber-50 border border-amber-100 animate-in fade-in zoom-in duration-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">⏳</div>
            <div>
              <h2 className="text-xl font-bold text-amber-900">Application Under Review</h2>
              <p className="text-amber-700 text-sm">The Servecly Admin team is currently vetting your profile.</p>
            </div>
          </div>
          <p className="text-sm text-amber-800/80 leading-relaxed max-w-2xl">
            You'll get full access to the Marketplace once your skills are verified. 
            This usually takes 24-48 hours.
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          {/* 4. DYNAMIC NAME: Replaced 'Alex' with the actual user's name */}
          <h1 className="text-4xl font-display text-on-surface mb-2">
            Welcome, {user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-on-surface-variant text-sm">
            {user?.role === 'admin' ? 'System Administrator Overview' : 'Here is an overview of your performance'}
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/availability')}
          className="btn-primary py-3 px-8 text-sm font-bold shadow-xl shadow-primary/20"
        >
          Open New Slots
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm group hover:bg-surface-container-low transition-all">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl group-hover:scale-110 transition-transform">{stat.icon}</span>
              {stat.change && <span className="text-xs font-bold text-emerald-600">{stat.change}</span>}
            </div>
            <div className="text-3xl font-display font-bold text-on-surface">{stat.value}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Active Tasks Section */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-on-surface">Active Task Stream</h3>
          <div className="bg-white rounded-3xl border border-outline-variant/10 overflow-hidden shadow-sm">
            <div className="divide-y divide-outline-variant/10">
              {['Heavy Furniture Move', 'Picture Frame Mounting', 'Office Setup'].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-xl">
                      {i === 0 ? "🛋️" : i === 1 ? "🖼️" : "💻"}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{task}</div>
                      <div className="text-xs text-on-surface-variant">Client: Jane Doe • Today, 4:00 PM</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-primary">$45.00/hr</span>
                    <div className="text-[10px] uppercase font-bold text-on-surface-variant opacity-50 text-emerald-600">Active</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-on-surface">Recent Activity</h3>
          <div className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm space-y-6">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex gap-4 relative">
                {notif.unread && <div className="absolute -left-4 top-2 w-2 h-2 bg-primary rounded-full" />}
                <div className="flex-grow space-y-1">
                  <p className={`text-sm leading-relaxed ${notif.unread ? "font-bold text-on-surface" : "text-on-surface-variant"}`}>
                    {notif.text}
                  </p>
                  <span className="text-[10px] font-bold text-on-surface-variant opacity-50 uppercase">{notif.time}</span>
                </div>
              </div>
            ))}
            <button className="w-full text-center text-xs font-bold text-primary hover:underline pt-4">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
