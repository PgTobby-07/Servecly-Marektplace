import React, { useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [liveData, setLiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'https://servecly-api.onrender.com';

  useEffect(() => {
    const initDashboard = async () => {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!savedUser || !token) {
        navigate("/login");
        return;
      }

      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      try {
        // Dynamic Endpoint Selection based on Role
        let endpoint = `${API_URL}/v1/tasks`; 
        if (parsedUser.role === 'admin') endpoint = `${API_URL}/v1/admin/vetting/pending`;
        if (parsedUser.role === 'user') endpoint = `${API_URL}/v1/bookings`;

        const response = await fetch(endpoint, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
        });

        const data = await response.json();
        if (response.ok) {
          setLiveData(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [navigate, API_URL]);

  const getGreeting = () => {
    if (user?.role === 'admin') return `System Control: ${user.name}`;
    if (user?.role === 'tasker') return `Workspace: ${user.name}`;
    return `Hello, ${user?.name?.split(' ')[0] || 'User'}`;
  };

  if (loading) return <div className="p-20 text-center font-display opacity-50">Syncing with Servecly...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold text-on-surface mb-2">
            {getGreeting()}
          </h1>
          <p className="text-on-surface-variant text-sm">
            {user?.role === 'admin' ? 'Marketplace integrity and oversight' : 'Your Servecly activity at a glance'}
          </p>
        </div>
        {user?.role === 'tasker' && (
          <button onClick={() => navigate('/availability')} className="btn-primary py-3 px-8 text-sm font-bold shadow-lg">
            Manage Availability
          </button>
        )}
      </div>

      {/* DYNAMIC CONTENT LOADERS */}
      {user?.role === 'admin' ? <AdminView navigate={navigate} data={liveData} /> : 
       user?.role === 'tasker' ? <TaskerView data={liveData} /> : 
       <CustomerView navigate={navigate} data={liveData} />}
    </div>
  );
};

/* --- SECTION 1: ADMIN VIEW (For Pg) --- */
const AdminView = ({ navigate, data }) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div onClick={() => navigate('/admin/vetting')} className="p-10 rounded-[32px] bg-primary/5 border border-primary/10 hover:border-primary/40 transition-all cursor-pointer group">
        <div className="text-4xl mb-4">🛡️</div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary">Vetting Pipeline</h3>
        <p className="text-on-surface-variant text-sm">{data.length} Taskers awaiting verification.</p>
      </div>
      <div onClick={() => navigate('/admin/taxonomy')} className="p-10 rounded-[32px] bg-surface-container-low border border-outline-variant/10 hover:border-primary/40 transition-all cursor-pointer group">
        <div className="text-4xl mb-4">🏷️</div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary">Manage Taxonomy</h3>
        <p className="text-on-surface-variant text-sm">Update service categories and classification rules.</p>
      </div>
    </div>
    
    <div className="bg-white p-8 rounded-[32px] border border-outline-variant/10">
       <h3 className="text-xl font-bold mb-6">Live Vetting Queue</h3>
       <div className="divide-y">
         {data.slice(0, 5).map((applicant, i) => (
           <TaskRow key={i} title={applicant.full_name || "New Applicant"} price={applicant.status || "Pending"} icon="👤" />
         ))}
       </div>
    </div>
  </div>
);

/* --- SECTION 2: TASKER VIEW (For Mo Salah) --- */
const TaskerView = ({ data }) => (
  <div className="space-y-12">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <StatCard label="Live Tasks" value={data.length} icon="🏃" />
      <StatCard label="Completed" value="--" icon="✅" />
      <StatCard label="Rating" value="5.0" icon="⭐" />
      <StatCard label="Revenue" value="--" icon="📈" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        <h3 className="text-xl font-bold mb-6">Active Task Stream</h3>
        <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-sm divide-y">
          {data.length > 0 ? data.map((task, i) => (
            <TaskRow key={i} title={task.title} price={task.status} icon="🛠️" />
          )) : (
            <p className="p-10 text-center text-sm text-on-surface-variant italic">No tasks assigned from the backend.</p>
          )}
        </div>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <p className="text-sm text-on-surface-variant">Backend check: {data.length} records found.</p>
      </div>
    </div>
  </div>
);

/* --- SECTION 3: CUSTOMER VIEW (For Messi) --- */
const CustomerView = ({ navigate, data }) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       <div className="md:col-span-2 bg-white p-10 rounded-[40px] border border-outline-variant/10 shadow-sm">
         
         <h2 onClick={() => navigate('/bookings')} className="text-2xl font-bold mb-4">My Bookings</h2>
           
          <div className="divide-y">
            {data.length > 0 ? data.map((booking, i) => (
              <TaskRow key={i} title={booking.service_name || "Task Request"} price={booking.status} icon="🤝" />
            )) : (
              <p className="py-10 text-on-surface-variant text-sm">You haven't posted any tasks yet.</p>
            )}
          </div>
       </div>
       <div className="bg-primary/5 p-10 rounded-[40px] border border-primary/10 text-center">
          <div className="text-5xl mb-6">✨</div>
          <h3 className="font-bold mb-4">Need Help?</h3>
          <button onClick={() => navigate('/services')} className="btn-primary w-full py-3 rounded-2xl text-xs">Post a New Task</button>
       </div>
    </div>
  </div>
);

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-3xl font-display font-bold">{value}</div>
    <div className="text-xs font-bold uppercase opacity-50 tracking-widest">{label}</div>
  </div>
);

const TaskRow = ({ title, price, icon }) => (
  <div className="flex justify-between p-6 hover:bg-primary/5 transition-colors cursor-pointer">
    <div className="flex gap-4 items-center">
      <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center">{icon}</div>
      <div className="text-sm font-bold">{title}</div>
    </div>
    <div className="text-primary font-bold text-xs uppercase tracking-widest">{price}</div>
  </div>
);

export default Dashboard;
