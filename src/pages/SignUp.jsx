import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
  fullname: '',
  email: '',
  password: '',
  isTasker: false
});
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  // 1. Add error state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
     ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
};
   const navigate = useNavigate();
  
  // 1. Add error state
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); // Clear old errors
  setLoading(true);

  const payload = {
    name: formData.fullname,
    email: formData.email,
    password: formData.password,
    role: formData.isTasker ? "tasker" : "users"
  };

  try {
    const response = await axios.post(`${API_URL}/v1/auth/signup`, payload);
    
    localStorage.setItem("user", JSON.stringify({ 
      ...response.data.user, 
      name: formData.fullname,
      role: payload.role 
    }));

    navigate("/home"); 
  } catch (err) {
    // 2. Capture the specific error message from your backend
    const message = err.response?.data?.message || "Something went wrong. Please try again.";
    setError(message); 
    console.error("Signup failed:", err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-6 py-12">
      <div className="w-full max-w-md card-tonal bg-white p-10 flex flex-col gap-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-2xl font-display font-bold text-primary">Servecly</span>
          </Link>
          <h1 className="text-2xl font-display text-on-surface">Create an account</h1>
          <p className="text-on-surface-variant text-sm">Join the marketplace of curated precision</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="text-sm font-bold text-on-surface-variant">Full Name</label>
            <input 
              id="fullname"
              name="fullname"
              type="text" 
              value={formData.fullname}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Enter your full name" 
              className="w-full bg-surface-container-highest px-4 py-3 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold text-on-surface-variant">Email</label>
            <input 
              id="email"
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="Enter your email" 
              className="w-full bg-surface-container-highest px-4 py-3 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-bold text-on-surface-variant">Password</label>
            <input 
              id="password"
              name="password"
              type="password" 
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="••••••••" 
              className="w-full bg-surface-container-highest px-4 py-3 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
            <p className="text-[10px] text-on-surface-variant opacity-60">Must be at least 8 characters.</p>
          </div>

          <div className="flex flex-col gap-3">
  <label className="text-sm font-bold text-on-surface-variant">Account Type</label>
  
  <div className="grid grid-cols-2 gap-4">
    {/* Customer Option */}
    <button
      type="button"
      onClick={() => setFormData({ ...formData, isTasker: false })}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
        !formData.isTasker 
          ? "border-primary bg-primary/5 ring-1 ring-primary" 
          : "border-outline-variant hover:border-primary/50"
      }`}
    >
      <span className="text-2xl">👤</span>
      <span className={`text-xs font-bold ${!formData.isTasker ? "text-primary" : "text-on-surface-variant"}`}>
        Hire Help
      </span>
    </button>

    {/* Tasker Option */}
    <button
      type="button"
      onClick={() => setFormData({ ...formData, isTasker: true })}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
        formData.isTasker 
          ? "border-primary bg-primary/5 ring-1 ring-primary" 
          : "border-outline-variant hover:border-primary/50"
      }`}
    >
      <span className="text-2xl">🛠️</span>
      <span className={`text-xs font-bold ${formData.isTasker ? "text-primary" : "text-on-surface-variant"}`}>
        Work as Tasker
      </span>
    </button>
  </div>
  
  {/* Dynamic Helper Text */}
  <p className="text-[10px] text-center text-on-surface-variant opacity-70 italic">
    {formData.isTasker 
      ? "You will be redirected to our vetting application." 
      : "Start posting tasks and getting help today."}
  </p>
</div>
        {/* Error Message Display */}
{error && (
  <div className="bg-error-container/10 border border-error/20 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
    <span className="text-xl">⚠️</span>
    <p className="text-xs font-bold text-error">
      {error.includes("email") ? "This email is already registered." : error}
    </p>
  </div>
)}

<button 
  type="submit" 
  disabled={loading}
  className={`btn-primary py-4 text-sm font-bold w-full transition-opacity ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  {loading ? "Creating account..." : "Get Started"}
</button>
          
       
        <div className="text-center">
          <p className="text-sm text-on-surface-variant">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
