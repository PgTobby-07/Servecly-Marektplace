import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 1. Dynamic Greeting based on role
  const getGreeting = () => {
    if (user?.role === 'admin') return `System Control: ${user.name}`;
    if (user?.role === 'tasker') return `Workspace: ${user.name}`;
    return `Hello, ${user?.name?.split(' ')[0] || 'User'}`;
  };

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
      {user?.role === 'admin' ? <AdminView navigate={navigate} /> : 
       user?.role === 'tasker' ? <TaskerView /> : 
       <CustomerView navigate={navigate} />}
    </div>
  );
};

/* --- SECTION 1: ADMIN VIEW (For Pg) --- */
const AdminView = ({ navigate }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div 
      onClick={() => navigate('/admin/vetting')}
      className="p-10 rounded-[32px] bg-primary/5 border border-primary/10 hover:border-primary/40 transition-all cursor-pointer group"
    >
      <div className="text-4xl mb-4">🛡️</div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary">Vetting Pipeline</h3>
      <p className="text-on-surface-variant text-sm">Review applications and maintain marketplace quality.</p>
    </div>
    <div 
      onClick={() => navigate('/admin/taxonomy')}
      className="p-10 rounded-[32px] bg-surface-container-low border border-outline-variant/10 hover:border-primary/40 transition-all cursor-pointer group"
    >
      <div className="text-4xl mb-4">🏷️</div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary">Manage Taxonomy</h3>
      <p className="text-on-surface-variant text-sm">Update service categories and classification rules.</p>
    </div>
  </div>
);

/* --- SECTION 2: TASKER VIEW (For Mo - Your current layout) --- */
const TaskerView = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <StatCard label="This Month" value="$2,450" icon="📈" />
      <StatCard label="Completed" value="38" icon="✅" />
      <StatCard label="Rating" value="4.95" icon="⭐" />
      <StatCard label="Active Tasks" value="3" icon="🏃" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        <h3 className="text-xl font-bold mb-6">Active Task Stream</h3>
        <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-sm divide-y">
          <TaskRow title="Heavy Furniture Move" price="$45.00/hr" icon="🛋️" />
          <TaskRow title="Picture Frame Mounting" price="$45.00/hr" icon="🖼️" />
        </div>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <p className="text-sm text-on-surface-variant italic">New task request: 'Bookshelf Assembly' (2m ago)</p>
      </div>
    </div>
  </div>
);

/* --- SECTION 3: CUSTOMER VIEW (General User) --- */
const CustomerView = ({ navigate }) => (
  <div className="text-center py-20 bg-surface-container-lowest rounded-[40px] border-2 border-dashed border-outline-variant/20">
    <div className="text-6xl mb-6">🤝</div>
    <h2 className="text-2xl font-bold mb-4">Ready to get things done?</h2>
    <p className="text-on-surface-variant mb-8 max-w-md mx-auto">Post a task today and connect with vetted professionals like Mo.</p>
    <button onClick={() => navigate('/services')} className="btn-primary px-10 py-4 rounded-full font-bold">
      Find a Professional
    </button>
  </div>
);

// Helper Components for clean code
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
    <div className="text-primary font-bold text-sm">{price}</div>
  </div>
);

export default Dashboard;
