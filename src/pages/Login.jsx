import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-6">
      <div className="w-full max-w-md card-tonal bg-white p-10 flex flex-col gap-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-2xl font-display font-bold text-primary">Servecly</span>
          </Link>
          <h1 className="text-2xl font-display text-on-surface">Welcome back</h1>
          <p className="text-on-surface-variant text-sm">Please enter your details</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
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
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-bold text-on-surface-variant">Password</label>
              <a href="#" className="text-xs text-primary font-semibold hover:underline">Forgot?</a>
            </div>
            <input 
              id="password"
              name="password"
              type="password" 
              autoComplete="current-password"
              placeholder="••••••••" 
              className="w-full bg-surface-container-highest px-4 py-3 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" name="remember" className="accent-primary" />
            <label htmlFor="remember" className="text-xs text-on-surface-variant">Remember for 30 days</label>
          </div>

          <button type="submit" className="btn-primary py-4 text-sm font-bold w-full">
            Log In
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-on-surface-variant">
            Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
