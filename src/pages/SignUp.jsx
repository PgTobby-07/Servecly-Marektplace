import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
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

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="text-sm font-bold text-on-surface-variant">Full Name</label>
            <input 
              id="fullname"
              name="fullname"
              type="text" 
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
              autoComplete="new-password"
              placeholder="••••••••" 
              className="w-full bg-surface-container-highest px-4 py-3 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
            <p className="text-[10px] text-on-surface-variant opacity-60">Must be at least 8 characters.</p>
          </div>

          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
             <div className="flex items-center gap-3">
                <input type="checkbox" id="isTasker" name="isTasker" className="accent-primary w-4 h-4" />
                <label htmlFor="isTasker" className="text-sm font-bold text-primary">I want to work as a Tasker</label>
             </div>
             <p className="text-[10px] text-on-surface-variant mt-2 pl-7">
               Select this to go through our vetting pipeline after registration.
             </p>
          </div>

          <button type="submit" className="btn-primary py-4 text-sm font-bold w-full">
            Get Started
          </button>
        </form>

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
