import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ query = "" }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reverted to your production Render URL
  const API_URL = import.meta.env.VITE_API_URL || 'https://servecly-api.onrender.com';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        // Logic: Use /search?q= for both filtering and "get all" (if q is empty)
        // If query is empty, the backend SQL returns all services by default
        const endpoint = `${API_URL}/v1/services/search?q=${encodeURIComponent(query)}`;

        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error('Database connection failed');
        }
        
        const data = await response.json();
        
        // Update with REAL data from the DB
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        // Step 1: Updated error message to be honest—no more "Showing demo data"
        setError("Unable to reach the Servecly marketplace. Please check your connection.");
        // Step 2: Clear the tasks array so no fake cards are shown
        setTasks([]); 
      } finally {
        setLoading(false);
      }
    };

    // Debounce: Wait 300ms after typing before hitting the API to save Render resources
    const timeoutId = setTimeout(() => {
      fetchTasks();
    }, 300); 

    return () => clearTimeout(timeoutId);
  }, [query, API_URL]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium border border-red-100">
          ⚠️ {error}
        </div>
      )}
      
      {/* This grid now only maps what is returned by services.py 
        If the 'Service' table in SQL is empty, this will be empty.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      
      {/* Honest Empty State: Only shows if the DB actually has 0 results */}
      {tasks.length === 0 && !error && (
        <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant">
          <p className="text-on-surface-variant font-medium">
            {query ? `No services found matching "${query}"` : "The marketplace is currently quiet. Add a service in the Admin Panel to see it here!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
