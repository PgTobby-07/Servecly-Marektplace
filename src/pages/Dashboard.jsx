import React, { useState, useEffect } from "react";
import axios from "axios";

// 1. Configure the API connection
const api = axios.create({
  baseURL: "https://servecly-api.onrender.com",
});

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealData = async () => {
      // Get the token from your login session
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        let response;
        /* 2. LOGIC: Route the request based on the logged-in user's role */
        if (user.role === 'admin') {
          response = await api.get('/v1/admin/vetting/pending', config);
        } else if (user.role === 'tasker') {
          response = await api.get('/v1/tasks', config);
        } else {
          response = await api.get('/v1/bookings', config);
        }

        // Apply real data from Render backend
        setDataList(response.data || []);
      } catch (err) {
        console.error("Connection to Render failed:", err);
        setDataList([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role) fetchRealData();
  }, [user]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FBFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold opacity-50 uppercase tracking-widest">Waking up Render Server...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FBFC] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* HEADER: Professional & Tight */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{user.role} Portal</span>
            <h1 className="text-3xl font-display font-bold mt-1">
              {user.role === 'admin' ? 'Marketplace Oversight' : 'Your Dashboard'}
            </h1>
            <p className="text-slate-500 text-sm italic">Active: {user.name}</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-primary transition-all shadow-lg shadow-primary/10">
              Refresh Feed
            </button>
          </div>
        </div>

        {/* CONTENT GRID: 8 columns for feed, 4 for stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* MAIN COLUMN (The Feed) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xs font-bold uppercase text-slate-400">Live Action Stream</h2>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>

              <div className="divide-y divide-slate-100">
                {dataList.length > 0 ? dataList.map((item, idx) => (
                  <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50/80 transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                        {user.role === 'admin' ? '🛡️' : '📋'}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{item.title || item.full_name || "System Entry"}</h4>
                        <p className="text-[11px] text-slate-400 font-medium">
                          ID: #{item.id} • Status: <span className="text-primary">{item.status || 'Active'}</span>
                        </p>
                      </div>
                    </div>
                    <button className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">
                      View Details →
                    </button>
                  </div>
                )) : (
                  <div className="py-24 text-center">
                    <p className="text-sm text-slate-400 italic">No real data found at {user.role} endpoints yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR COLUMN (The Stats) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Real Stats Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
               <div className="relative z-10">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-6">Marketplace Standing</p>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-display font-bold">4.95</h3>
                      <p className="text-[10px] font-bold text-primary uppercase">Average Rating</p>
                    </div>
                    <div className="pt-6 border-t border-slate-100">
                      <h3 className="text-3xl font-display font-bold">{dataList.length}</h3>
                      <p className="text-[10px] font-bold text-primary uppercase">Total Records Found</p>
                    </div>
                  </div>
               </div>
               {/* Design decoration */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-all"></div>
            </div>

            {/* Support/Quick Links */}
            <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl shadow-slate-900/10">
              <h4 className="text-sm font-bold mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full py-3 bg-white/10 rounded-xl text-[11px] font-bold hover:bg-white/20 transition-all">Support Center</button>
                <button className="w-full py-3 bg-white/10 rounded-xl text-[11px] font-bold hover:bg-white/20 transition-all">System Settings</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
