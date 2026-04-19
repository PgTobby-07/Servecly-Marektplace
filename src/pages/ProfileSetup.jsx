import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const ProfileSetup = () => {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: 'Personal Info' },
    { id: 2, name: 'Skills & Experience' },
    { id: 3, name: 'Verification' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Progress Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-display text-on-surface mb-2">Become a Tasker</h1>
          <p className="text-on-surface-variant">Complete your profile to start receiving tasks</p>
          
          <div className="mt-8 flex items-center gap-4">
            {steps.map((s) => (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= s.id ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant'
                  }`}>
                    {s.id}
                  </div>
                  <span className={`text-sm font-medium ${step === s.id ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {s.name}
                  </span>
                </div>
                {s.id !== 3 && <div className="h-px w-12 bg-outline-variant/30" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="card-tonal bg-white p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-center border-b border-outline-variant/10 pb-8">
                <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center text-3xl">
                  👤
                </div>
                <div className="flex-grow space-y-2">
                   <h3 className="font-bold text-on-surface">Profile Photo</h3>
                   <p className="text-sm text-on-surface-variant">A clear photo helps build trust with clients.</p>
                   <button className="text-primary text-sm font-bold hover:underline">Upload Image</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">First Name</label>
                  <input type="text" className="w-full bg-surface-container-low px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Last Name</label>
                  <input type="text" className="w-full bg-surface-container-low px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Professional Bio</label>
                   <textarea rows="4" className="w-full bg-surface-container-low px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none resize-none" placeholder="Tell clients about your experience..."></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-on-surface mb-4">What services do you provide?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Furniture Assembly', 'Moving Help', 'Cleaning', 'Handyman', 'Mounting', 'Yard Work'].map(skill => (
                    <label key={skill} className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl cursor-pointer hover:bg-surface-container-high transition-colors">
                      <input type="checkbox" className="accent-primary w-4 h-4" />
                      <span className="text-sm text-on-surface font-medium">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Work Experience (Years)</label>
                <select className="w-full bg-surface-container-low px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none">
                   <option>Less than 1 year</option>
                   <option>1-3 years</option>
                   <option>3-5 years</option>
                   <option>5+ years</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <h3 className="text-primary font-bold mb-2">Vetting Process</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Servecly maintains architectural precision in our workforce. You will need to upload a valid ID and background check authorization.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-outline-variant/10 rounded-xl">
                  <span className="text-sm font-medium">Government Issued ID</span>
                  <button className="text-primary text-sm font-bold">Upload</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-outline-variant/10 rounded-xl">
                  <span className="text-sm font-medium">Background Check Consent</span>
                  <button className="text-primary text-sm font-bold">Sign PDF</button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between">
            <button 
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className={`text-sm font-bold transition-opacity ${step === 1 ? 'opacity-0' : 'opacity-100 hover:text-primary'}`}
            >
              ← Back
            </button>
            <button 
              onClick={() => step < 3 ? setStep(s => s + 1) : alert("Profile submitted for review!")}
              className="btn-primary py-3 px-10 text-sm font-bold"
            >
              {step === 3 ? 'Submit Profile' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
  );
};

export default ProfileSetup;
