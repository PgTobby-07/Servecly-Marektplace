import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const AdminVetting = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const [filter, setFilter] = useState('pending');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. SECURITY: Retrieves user from localStorage to check admin role before rendering.
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  // 2. FETCH DATA: Calls your FastAPI GET endpoint specifically for pending applications.
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const response = await axios.get(`${API_URL}/v1/admin/vetting/pending`);
        setApplicants(response.data);
      } catch (err) {
        setError("Unable to connect to the backend.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, [API_URL]);

  // 3. PATCH LOGIC: Sends the update to your backend and removes the user from the local list upon success.
  const handleApprove = async (userId) => {
    try {
      await axios.patch(`${API_URL}/v1/admin/vetting/${userId}`, { status: 'approved' });
      // Filter out the approved user immediately so the UI feels fast.
      setApplicants(prev => prev.filter(a => a.id !== userId)); 
    } catch (err) {
      alert("Failed to update status. Please try again.");
    }
  };

  // 4. HELPER: Maps status strings to your Servecly design system colors.
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'reviewing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  // 5. EARLY RETURN: If not an admin, we block the entire page for security.
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low p-6">
        <div className="text-center p-12 bg-white max-w-md rounded-3xl shadow-lg border border-slate-100">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-slate-500 mb-8">This area is reserved for the Servecly Administrative Team.</p>
          <Link to="/" className="px-8 py-3 bg-primary text-white rounded-xl inline-block font-bold">Go Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 6. ERROR HANDLING: Consistent with your 'Find Help' error banners. */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 mb-8">
          <span className="text-xl">⚠️</span>
          <p className="text-xs font-bold text-red-600 uppercase tracking-wider">{error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display text-slate-900 mb-2">Vetting Pipeline</h1>
          <p className="text-slate-500">Review and approve new tasker applications</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          {['pending', 'reviewing', 'approved'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                filter === t ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* Table Headings */}
        <div className="hidden md:grid grid-cols-6 px-10 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
          <span>Applicant</span>
          <span>Service</span>
          <span>Experience</span>
          <span>Vetting Score</span>
          <span>Date Applied</span>
          <span className="text-right">Action</span>
        </div>

        {/* 7. DYNAMIC LIST: We filter the backend data based on the selected tab button. */}
        {applicants.filter(a => a.status === filter).length > 0 ? (
          applicants.filter(a => a.status === filter).map((app) => (
            <div key={app.id} className="bg-white border border-slate-100 flex flex-col md:grid md:grid-cols-6 items-center px-10 py-6 rounded-2xl hover:shadow-md transition-all duration-300">
              
              {/* Applicant Info Column */}
              <div className="flex items-center gap-3 w-full md:w-auto mb-4 md:mb-0">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-primary">
                  {app.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{app.name}</div>
                  <div className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider mt-1 ${getStatusColor(app.status)}`}>
                    {app.status}
                  </div>
                </div>
              </div>

              {/* Service Column */}
              <div className="text-sm font-medium text-slate-600 w-full md:w-auto mb-2 md:mb-0">
                {app.service || 'General Service'}
              </div>

              {/* Experience Column */}
              <div className="text-sm text-slate-500 w-full md:w-auto mb-2 md:mb-0">
                {app.experience || 'Not specified'}
              </div>

              {/* Score Column: Fallback to "N/A" if score is missing from your DB. */}
              <div className="w-full md:w-auto mb-2 md:mb-0">
                <span className="px-3 py-1 bg-slate-50 rounded-lg text-xs font-bold text-primary">
                  {app.score || 'N/A'}
                </span>
              </div>

              {/* Date Column */}
              <div className="text-xs text-slate-400 w-full md:w-auto mb-4 md:mb-0">
                {app.appliedDate || 'New Application'}
              </div>

              {/* Action Column: The button now triggers the database update. */}
              <div className="flex justify-end gap-2 w-full md:w-auto">
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
          /* Empty State: Shown when no users match the current database query for that status. */
          <div className="text-center py-20 opacity-40 font-bold uppercase tracking-widest text-[10px]">
            No {filter} applications found in database
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVetting;
