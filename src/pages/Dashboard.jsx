import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // API Call logic based on your Swagger routes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        if (user.role === 'admin') {
          const res = await axios.get('/v1/admin/vetting/pending', { headers });
          setTasks(res.data);
        } else if (user.role === 'tasker') {
          const res = await axios.get('/v1/tasks', { headers });
          setTasks(res.data);
        } else {
          const res = await axios.get('/v1/bookings', { headers });
          setTasks(res.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP BAR: Ultra-compact header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
          <div>
            <h1 className="text-2xl font-display font-bold text-on-surface">
              {user.role === 'admin' ? 'Admin Console' : 'My Dashboard'}
            </h1>
            <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest mt-1">
              Active Session: {user.name}
            </p>
          </div>
          <div className="flex gap-3">
            {user.role === 'tasker' && (
              <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all">
                + Add Availability
              </button>
            )}
          </div>
        </div>

        {/* MAIN GRID: No more wasted space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Main Activity (Takes 8/12 of the width) */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-white rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-outline-variant/5 bg-surface-container-low flex justify-between items-center">
                <h3 className="text-sm font-bold opacity-70">
                  {user.role === 'admin' ? 'Pending Verifications' : 'Active Task Stream'}
                </h3>
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded">
                  {tasks.length} Total
                </span>
              </div>
              
              <div className="divide-y divide-outline-variant/5">
                {tasks.length > 0 ? tasks.map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg">
                        {user.role === 'admin' ? '👤' : '🛠️'}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{item.title || item.name || "System Task"}</p>
                        <p className="text-[11px] text-on-surface-variant">{item.date || "Just now"} • {item.location || "Remote"}</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-bold text-primary border border-primary/20 px-3 py-1 rounded-md hover:bg-primary hover:text-white transition-all">
                      Details
                    </button>
                  </div>
                )) : (
                  <div className="p-12 text-center text-sm text-on-surface-variant italic">
                    No data found in {user.role} stream.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Quick Stats & Tools (Takes 4/12 of the width) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Performance Card */}
            <div className="bg-primary text-white p-6 rounded-2xl shadow-lg shadow-primary/20 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-bold opacity-70 uppercase mb-4">Total Revenue</p>
                <h2 className="text-3xl font-display font-bold">$2,450.00</h2>
                <div className="mt-6 flex justify-between items-end">
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded">Top Rated</span>
                  <p className="text-xs opacity-80">4.95 ⭐</p>
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
            </div>

            {/* Role-Specific Toolbox */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
              <h3 className="text-sm font-bold mb-4">Quick Toolbox</h3>
              <div className="grid grid-cols-1 gap-2">
                {user.role === 'admin' ? (
                  <>
                    <ToolButton label="System Logs" icon="📑" />
                    <ToolButton label="User Database" icon="👥" />
                    <ToolButton label="Financial Audits" icon="💰" />
                  </>
                ) : (
                  <>
                    <ToolButton label="Support Center" icon="🎧" />
                    <ToolButton label="Tax Info" icon="📝" />
                    <ToolButton label="Settings" icon="⚙️" />
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const ToolButton = ({ label, icon }) => (
  <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-outline-variant/10 text-left">
    <span className="text-lg">{icon}</span>
    <span className="text-xs font-bold text-on-surface-variant">{label}</span>
  </button>
);

export default Dashboard;
