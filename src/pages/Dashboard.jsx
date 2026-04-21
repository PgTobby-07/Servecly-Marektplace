import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      // Get token from where you store it during /v1/auth/login
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        let response;
        
        /* AUTH-BASED ROUTING FROM SWAGGER */
        if (user.role === 'admin') {
          console.log("Admin detected: Fetching pending vetting...");
          response = await axios.get('/v1/admin/vetting/pending', config);
        } else if (user.role === 'tasker') {
          console.log("Tasker detected: Fetching assigned tasks...");
          response = await axios.get('/v1/tasks', config);
        } else {
          console.log("User detected: Fetching bookings...");
          response = await axios.get('/v1/bookings', config);
        }

        // Set the real data from your backend
        setItems(response.data); 
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        // We set items to empty so the UI still renders the "No Data" state instead of a white screen
        setItems([]); 
      } finally {
        setLoading(false);
      }
    };

    if (user?.role) getDashboardData();
  }, [user]);

  if (loading) return <div className="p-20 text-center font-bold">Connecting to Servecly API...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-10 bg-white p-8 rounded-[32px] border border-outline-variant/10 shadow-sm">
        <div>
          <h1 className="text-3xl font-display font-bold">
            {user.role === 'admin' ? 'Management Console' : 'Your Workspace'}
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Logged in as <span className="font-bold text-primary">{user.name}</span>
          </p>
        </div>
        {user.role === 'tasker' && (
          <button className="btn-primary px-6 py-2 text-xs font-bold rounded-xl shadow-lg">
            Update Availability
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* DATA FEED COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold px-2">
            {user.role === 'admin' ? 'Vetting Queue' : 'Active Items'}
          </h2>
          
          <div className="bg-white rounded-[32px] border border-outline-variant/10 shadow-sm overflow-hidden">
            {items.length > 0 ? items.map((item) => (
              <div key={item.id} className="p-6 flex justify-between items-center border-b border-outline-variant/5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-high rounded-2xl flex items-center justify-center text-xl">
                    {user.role === 'admin' ? '🆔' : '📋'}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">{item.title || item.full_name || "New Request"}</p>
                    <p className="text-[11px] text-on-surface-variant uppercase font-bold tracking-tighter">
                      Status: {item.status || 'Pending'}
                    </p>
                  </div>
                </div>
                <button className="text-xs font-bold text-primary hover:underline">Manage</button>
              </div>
            )) : (
              <div className="p-20 text-center">
                <p className="text-on-surface-variant italic text-sm">No data returned from {user.role} endpoints.</p>
              </div>
            )}
          </div>
        </div>

        {/* STATS COLUMN */}
        <div className="space-y-6">
          <div className="bg-surface-container-high p-8 rounded-[32px] border border-outline-variant/10">
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mb-4">Account Metadata</p>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-outline-variant/5 pb-2">
                <span className="text-xs text-on-surface-variant">Role</span>
                <span className="text-xs font-bold capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/5 pb-2">
                <span className="text-xs text-on-surface-variant">User ID</span>
                <span className="text-xs font-bold">#00{user.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
