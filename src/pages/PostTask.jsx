import React, { useState, useEffect } from 'react';
// change: Added Link import for the guest redirection
import { Link } from 'react-router-dom'; 

const PostTask = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // change: Added state to track the logged-in user and their role
  const [user, setUser] = useState(null); 
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    location: '',
    description: '',
    scheduled_time: '',
    budget: ''
  });

  const API_URL = import.meta.env.VITE_API_URL || 'https://servecly-api.onrender.com';

  // change: Combined user check and category fetch into one effect
  useEffect(() => {
    // change: Logic to check user status from localStorage on component mount
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/v1/services/categories`);
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) setFormData(prev => ({ ...prev, category_id: data[0].id }));
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [API_URL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // change: Security check - ensure only 'user' role can even trigger the fetch
    if (!user || user.role !== 'users') {
      alert("Only 'Hire Help' accounts can post tasks.");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");

      const payload = {
        categoryId: parseInt(formData.category_id), 
        title: formData.title,
        description: formData.description,
        location: formData.location,
        budget: parseFloat(formData.budget),
        client_id: parseInt(user.id), 
        service_id: 1, 
        scheduled_time: formData.scheduled_time 
      };

      const response = await fetch(`${API_URL}/v1/tasks`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Task posted successfully!");
        window.location.href = "/services";
      } else {
        const errorData = await response.json();
        alert(`Validation Error: ${JSON.stringify(errorData.detail)}`);
      }
    } catch (err) {
      alert("Connection error. Check your backend status.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-display text-on-surface mb-2">Post a Task</h1>
        <p className="text-on-surface-variant">Describe what you need help with to receive offers.</p>
      </div>

      <form className="card-tonal bg-white p-8 md:p-12 space-y-10" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Task Basics</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-xs font-bold text-on-surface">Task Title</label>
            <input 
              id="title"
              name="title"
              type="text" 
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Repair leaking kitchen faucet" 
              className="w-full bg-surface-container-low px-4 py-4 rounded-xl outline-none text-lg font-medium" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="category_id" className="text-xs font-bold text-on-surface">Category</label>
              <select 
                id="category_id" 
                name="category_id" 
                value={formData.category_id}
                onChange={handleChange}
                className="w-full bg-surface-container-low px-4 py-4 rounded-xl outline-none"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-xs font-bold text-on-surface">Location</label>
              <input 
                id="location"
                name="location"
                type="text" 
                value={formData.location}
                onChange={handleChange}
                placeholder="Neighborhood or City" 
                className="w-full bg-surface-container-low px-4 py-4 rounded-xl outline-none" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Task Details</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-xs font-bold text-on-surface">Description</label>
            <textarea 
              id="description"
              name="description"
              rows="5" 
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide specific instructions..." 
              className="w-full bg-surface-container-low px-4 py-4 rounded-xl outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Scheduling & Budget</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="scheduled_time" className="text-xs font-bold text-on-surface">Preferred Date</label>
              <input 
                id="scheduled_time" 
                name="scheduled_time" 
                type="datetime-local" 
                onChange={handleChange}
                className="w-full bg-surface-container-low px-4 py-4 rounded-xl outline-none" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-xs font-bold text-on-surface">Your Budget ($)</label>
              <input 
                id="budget" 
                name="budget" 
                type="number" 
                value={formData.budget}
                onChange={handleChange}
                placeholder="50" 
                className="w-full bg-surface-container-low px-4 py-4 rounded-xl outline-none" 
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/10 flex justify-end">
          {/* change: Added the conditional Submit area logic */}
          {!user ? (
            // State 1: Guest User - Show CTA to Sign Up
            <div className="flex flex-col items-end gap-2">
              <p className="text-on-surface-variant text-sm">Need to post this task?</p>
              <Link 
                to="/signup?role=user" 
                className="btn-primary py-4 px-12 text-sm font-bold shadow-xl shadow-primary/20 bg-primary text-white rounded-xl"
              >
                Sign Up as "Hire Help" to Post
              </Link>
            </div>
          ) : user.role === 'users' ? (
            // State 2: Logged in as User - Show Active Button
            <button type="submit" className="btn-primary py-4 px-12 text-sm font-bold shadow-xl shadow-primary/20 bg-primary text-white rounded-xl">
              Post Task to Marketplace
            </button>
          ) : (
            // State 3: Logged in as Admin/Tasker - Show Restriction
            <div className="text-error bg-error/10 p-4 rounded-xl text-sm font-medium">
              Only 'Hire Help' accounts are permitted to post tasks.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostTask;
