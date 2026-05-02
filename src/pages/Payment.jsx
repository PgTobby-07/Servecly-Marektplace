import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const Payment = () => {
  const [method, setMethod] = useState('card');
 if(!user ||user.role!='users'){
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low p-6">
        <div className="text-center p-12 bg-white max-w-md rounded-3xl shadow-lg border border-slate-100">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-slate-500 mb-8">This area is reserved for the Customer or user.</p>
          <Link to="/" className="px-8 py-3 bg-primary text-white rounded-xl inline-block font-bold">Go Back Home</Link>
        </div>
      </div>
    );
 }
  return (
      <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-display text-on-surface mb-8">Review & Pay</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Task Summary */}
            <div className="card-tonal p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6">Task Summary</h3>
              <div className="flex gap-6">
                <div className="w-20 h-20 bg-surface-container-high rounded-2xl flex items-center justify-center text-3xl">🛠️</div>
                <div>
                  <h2 className="text-xl font-bold text-on-surface">IKEA Malm Bed Assembly</h2>
                  <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">
                    Tasker: <span className="text-on-surface font-semibold">Alex Johnson</span><br />
                    Date: March 25, 2026 at 10:00 AM<br />
                    Location: 123 Architecture Lane, Metro City
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card-tonal p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6">Payment Method</h3>
              <div className="space-y-4">
                {['card', 'paypal', 'apple'].map((m) => (
                  <label 
                    key={m}
                    className={`flex items-center justify-between p-6 rounded-2xl cursor-pointer transition-all border ${
                      method === m 
                        ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/10' 
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container-high'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={method === m}
                        onChange={() => setMethod(m)}
                        className="accent-primary w-4 h-4" 
                      />
                      <span className="font-bold text-on-surface capitalize">
                        {m === 'card' ? 'Credit / Debit Card' : m}
                      </span>
                    </div>
                    <div className="text-2xl opacity-50">
                      {m === 'card' ? '💳' : m === 'paypal' ? '🅿️' : '🍎'}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Price Breakdown */}
          <aside className="space-y-6">
            <div className="card-tonal bg-primary-container text-white p-8 sticky top-24 shadow-xl shadow-primary/10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-70 mb-8 text-center">Price Details</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">Hourly Rate</span>
                  <span className="font-bold">$40.00/hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">Estimated Time</span>
                  <span className="font-bold">2.0 hrs</span>
                </div>
                <div className="flex justify-between text-sm pt-4 border-t border-white/10">
                  <span className="opacity-80">Subtotal</span>
                  <span className="font-bold">$80.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">Trust & Support Fee</span>
                  <span className="font-bold">$5.00</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-xs uppercase font-bold opacity-70">Total</span>
                <span className="text-4xl font-display font-extrabold">$85.00</span>
              </div>

              <button className="w-full bg-primary-fixed text-primary py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-black/10">
                Confirm & Pay
              </button>
              
              <p className="text-[10px] text-center mt-6 opacity-50 px-4">
                By clicking "Confirm & Pay", you agree to the Servecly terms of service and architectural standards.
              </p>
            </div>
          </aside>
        </div>
      </div>
  );
};

export default Payment;
