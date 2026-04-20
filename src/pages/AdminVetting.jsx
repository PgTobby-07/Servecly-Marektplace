import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const AdminVetting = () => {
  const [filter, setFilter] = useState('pending');

  const applicants = [
    {
      id: 'USR-882',
      name: 'James Wilson',
      service: 'Electrical Repair',
      experience: '8 years',
      status: 'pending',
      appliedDate: 'March 20, 2026',
      score: '92/100'
    },
    {
      id: 'USR-890',
      name: 'Maria Garcia',
      service: 'General Cleaning',
      experience: '3 years',
      status: 'reviewing',
      appliedDate: 'March 19, 2026',
      score: '85/100'
    },
    {
      id: 'USR-875',
      name: 'Robert Brown',
      service: 'Furniture Assembly',
      experience: '5 years',
      status: 'approved',
      appliedDate: 'March 15, 2026',
      score: '98/100'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-tertiary-fixed text-tertiary';
      case 'pending': return 'bg-secondary-container text-on-secondary-container';
      case 'reviewing': return 'bg-primary-fixed text-primary';
      default: return 'bg-surface-container-highest text-on-surface-variant';
    }
  };

  return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
          <div className="hidden md:grid grid-cols-6 px-10 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-on-surface-variant opacity-50">
            <span>Applicant</span>
            <span>Service</span>
            <span>Experience</span>
            <span>Vetting Score</span>
            <span>Date Applied</span>
            <span className="text-right">Action</span>
          </div>

          {applicants.filter(a => a.status === filter).map((app) => (
            <div key={app.id} className="card-tonal flex flex-col md:grid md:grid-cols-6 items-center px-10 py-6 hover:bg-surface-container-low transition-all duration-300">
              <div className="flex items-center gap-3 w-full md:w-auto mb-4 md:mb-0">
                <div className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center font-bold text-primary">
                  {app.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-on-surface">{app.name}</div>
                  <div className="text-[10px] opacity-50">{app.id}</div>
                </div>
              </div>

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
                 <button className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-primary-container transition-colors">
                   Review
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default AdminVetting;
