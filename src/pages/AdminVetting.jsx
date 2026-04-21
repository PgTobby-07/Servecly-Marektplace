import React, { useState, useEffect } from 'react'; // Added useEffect
import axios from 'axios'; // Added for API calls
import { Link } from 'react-router-dom'; // Added for the security gate
import MainLayout from '../layouts/MainLayout';

const AdminVetting = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const [filter, setFilter] = useState('pending');
  
  // 1. Live state for applicants
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Admin Security Check
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

 
  // 3. Fetch live data from your Swagger endpoint
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const response = await axios.get(`${API_URL}/v1/admin/vetting/pending`);
        setApplicants(response.data);
      } catch (err) {
        setError("Unable to connect to the backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, [API_URL]);

  // 4. Update status using PATCH
  const handleApprove = async (userId) => {
    try {
      await axios.patch(`${API_URL}/v1/admin/vetting/${userId}`, { status: 'approved' });
      setApplicants(prev => prev.filter(a => a.id !== userId)); // Remove from list immediately
    } catch (err) {
      alert("Failed to update status.");
    }
  };
 
  const getStatusColor = (status) => {
    switch (status) {
    case 'approved': return 'bg-green-100 text-green-700'; // Success green
    case 'pending': return 'bg-amber-100 text-amber-700'; // Warning orange/yellow
    case 'reviewing': return 'bg-blue-100 text-blue-700'; // Info blue
    default: return 'bg-slate-100 text-slate-600';
  }
  };
 // --- START OF RETURN FUNCTION ---
  
  // 1. Security Gate (NEW): This prevents the page from rendering at all if the user isn't an admin.
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low p-6">
        <div className="text-center p-12 card-tonal bg-white max-w-md rounded-3xl shadow-lg">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="text-2xl font-display text-error mb-4 font-bold">Access Denied</h2>
          <p className="text-on-surface-variant mb-8 leading-relaxed">
            This area is reserved for the Servecly Architectural Team. 
            You do not have administrative privileges.
          </p>
          <Link 
            to="/" 
            className="btn-primary py-3 px-10 rounded-xl inline-block shadow-md hover:shadow-xl transition-all font-bold"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 2. Error Banner (NEW): Displays if the backend connection fails, matching the 'Find Help' style. */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 mb-8">
          <span className="text-xl">⚠️</span>
          <p className="text-xs font-bold text-red-600 uppercase tracking-wider">{error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display text-on-surface mb-2">Vetting Pipeline</h1>
          <p className="text-on-surface-variant">Review and approve new tasker applications</p>
        </div>
        
        <div className="flex bg-surface-container-low p-1 rounded-2xl">
          {['pending', 'reviewing', 'approved'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                filter === t 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-6 px-10 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-on-surface-variant opacity-50">
          <span>Applicant</span>
          <span>Service</span>
          <span>Experience</span>
          <span>Vetting Score</span>
          <span>Date Applied</span>
          <span className="text-right">Action</span>
        </div>

        {/* 3. Dynamic List (CHANGED): Now filters the 'applicants' state which is populated from your backend. */}
        {applicants.filter(a => a.status === filter).length > 0 ? (
          applicants.filter(a => a.status === filter).map((app) => (
            <div key={app.id} className="card-tonal flex flex-col md:grid md:grid-cols-6 items-center px-10 py-6 hover:bg-surface-container-low transition-all duration-300">
              {/* --- REPLACE THE APPLICANT COLUMN WITH THIS --- */}
    <div className="flex items-center gap-3 w-full md:w-auto mb-4 md:mb-0">
      <div className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center font-bold text-primary">
        {app.name?.charAt(0) || 'U'}
      </div>
      <div>
        <div className="text-sm font-bold text-on-surface">{app.name}</div>
        <div className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${getStatusColor(app.status)}`}>
          {app.status}
        </div>
      </div>
    </div>
    {/* ---------------------------------------------- */}

              <div className="text-sm font-medium text-on-surface-variant w-full md:w-auto mb-2 md:mb-0">
                {app.service}
              </div>

              <div className="text-sm text-on-surface-variant w-full md:w-auto mb-2 md:mb-0">
                {app.experience}
              </div>

              <div className="w-full md:w-auto mb-2 md:mb-0">
  <span className="px-3 py-1 bg-surface-container-highest rounded-lg text-xs font-bold text-primary">
    {app.score}
  </span>
</div>

              <div className="text-xs text-on-surface-variant w-full md:w-auto mb-4 md:mb-0">
                {app.appliedDate}
              </div>

              <div className="flex justify-end gap-2 w-full md:w-auto">
                {/* 4. Action Button (CHANGED): Now triggers handleApprove which calls your PATCH endpoint. */}
                <button 
                  onClick={() => handleApprove(app.id)}
                  className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  Approve Tasker
                </button>
              </div>
            </div>
          ))
        ) : (
          /* 5. Empty State (NEW): Shows if no applicants match the current filter. */
          <div className="text-center py-20 opacity-50 font-bold uppercase tracking-widest text-xs">
            No {filter} applications found
          </div>
        )}
      </div>
    </div>
  );
  
  // --- END OF RETURN FUNCTION ---
