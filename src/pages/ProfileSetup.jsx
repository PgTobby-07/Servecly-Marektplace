import React, { useState } from 'react';
/* Added axios for API calls and useNavigate to redirect after submission */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const ProfileSetup = () => {
  /* Added navigate to redirect user to dashboard upon completion */
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  
  const [step, setStep] = useState(1);
  /* Added loading state to disable buttons during API submission */
  const [loading, setLoading] = useState(false);

  /* 1. FORM STATE: Captures all inputs to match the columns 
     in your AdminVetting table (Name, Service, Experience) 
  */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    services: [],
    experience: '1-3 years', // Default selection
  });

  const steps = [
    { id: 1, name: 'Personal Info' },
    { id: 2, name: 'Skills & Experience' },
    { id: 3, name: 'Verification' },
  ];

  /* 2. CHANGE HANDLER: Dynamically updates the formData object based on input name */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* 3. SERVICE TOGGLE: Handles adding/removing skills from the services array */
  const handleServiceToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(skill)
        ? prev.services.filter(s => s !== skill)
        : [...prev.services, skill]
    }));
  };

  /* 4. SUBMISSION LOGIC: Connects to your PATCH /v1/admin/vetting/{userId} endpoint.
     It sends the status 'pending' so the admin sees this user in the pipeline.
  */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id || storedUser?.userId;

      if (!userId) {
        alert("User session not found. Please log in.");
        return;
      }

      const payload = {
        bio: formData.bio,
        experience: formData.experience,
        // Combines selected checkboxes into a single string for the Admin table
        service: formData.services.length > 0 ? formData.services.join(', ') : 'General Handyman',
        // This 'pending' status is the key to making them appear in AdminVetting.jsx
        status: 'pending',
        appliedDate: new Date().toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        })
      };
// --- PUT THE NEW CODE HERE ---
      // 1. Send the data to your backend
      await axios.patch(`${API_URL}/v1/admin/vetting/${userId}`, payload);
      
      // 2. Show a quick confirmation (Optional)
      alert("Profile submitted! Please wait for admin approval.");
      
      // 3. Redirect the user to the Dashboard
      // We pass 'submitted: true' so the Dashboard knows to show a success message
      navigate('/dashboard', { state: { submitted: true } }); 
      // -----------------------------
      
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit profile. Check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="card-tonal bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-outline-variant/10">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-center border-b border-outline-variant/10 pb-8">
                <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center text-3xl">👤</div>
                <div className="flex-grow space-y-2">
                   <h3 className="font-bold text-on-surface">Profile Photo</h3>
                   <p className="text-sm text-on-surface-variant">A clear photo helps build trust with clients.</p>
                   <button className="text-primary text-sm font-bold hover:underline">Upload Image</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">First Name</label>
                  {/* Added value and onChange to track First Name */}
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Last Name</label>
                  {/* Added value and onChange to track Last Name */}
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none" 
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Professional Bio</label>
                   {/* Added value and onChange to track Bio */}
                   <textarea 
                     name="bio"
                     rows="4" 
                     value={formData.bio}
                     onChange={handleInputChange}
                     className="w-full bg-surface-container-low px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none resize-none" 
                     placeholder="Tell clients about your experience..."
                   ></textarea>
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
                      {/* Added checked and onChange to handle skill array management */}
                      <input 
                        type="checkbox" 
                        checked={formData.services.includes(skill)}
                        onChange={() => handleServiceToggle(skill)}
                        className="accent-primary w-4 h-4" 
                      />
                      <span className="text-sm text-on-surface font-medium">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Work Experience (Years)</label>
                {/* Added value and onChange to select menu */}
                <select 
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low px-4 py-3 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none"
                >
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
                  Servecly maintains architectural precision. You will need to upload a valid ID and background check authorization.
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
              disabled={step === 1 || loading}
              className={`text-sm font-bold transition-opacity ${step === 1 ? 'opacity-0' : 'opacity-100 hover:text-primary'}`}
            >
              ← Back
            </button>
            <button 
              /* Updated button to trigger handleSubmit on step 3 */
              onClick={() => step < 3 ? setStep(s => s + 1) : handleSubmit()}
              disabled={loading}
              className="btn-primary py-3 px-10 text-sm font-bold disabled:opacity-50"
            >
              {loading ? 'Submitting...' : step === 3 ? 'Submit Profile' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
  );
};

export default ProfileSetup;
