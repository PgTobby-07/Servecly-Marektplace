import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ query = "" }) => { // 1. Accept query as a prop
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Consistency check: Get API_URL from env or fallback
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        // 2. Logic to switch between 'search' and 'all tasks'
        // If there is a query, use the search endpoint; otherwise, get all categories/tasks
        const endpoint = query 
          ? `${API_URL}/v1/services/search?q=${encodeURIComponent(query)}`
          : `${API_URL}/v1/services/search?q=`; // Or your specific "get all" endpoint

        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Unable to connect to the backend. Showing demo data.");
        
        // Fallback demo data
        setTasks([
          {
            task_id: 1,
            title: "Move Heavy Furniture",
            description: "Need help moving a sofa and 3 heavy boxes from the 2nd floor to the garage.",
            location: "Downtown, Metro City",
            scheduled_time: new Date().toISOString(),
            status: "Pending"
          },
          {
            task_id: 2,
            title: "Garden Weeding & Cleanup",
            description: "Overgrown backyard needs thorough weeding and disposal of green waste.",
            location: "Suburban Heights",
            scheduled_time: new Date().toISOString(),
            status: "Confirmed"
          },
          {
            task_id: 3,
            title: "IKEA Bed Frame Assembly",
            description: "Malm bed frame assembly. Should take about 2 hours.",
            location: "North Side",
            scheduled_time: new Date().toISOString(),
            status: "Completed"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    // 3. Add a small debounce or timeout if you want to prevent excessive API calls while typing
    const timeoutId = setTimeout(() => {
      fetchTasks();
    }, 300); 

    return () => clearTimeout(timeoutId);
  }, [query, API_URL]); // 4. Refetch whenever the search query changes

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
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.task_id} task={task} />
        ))}
      </div>
      
      {tasks.length === 0 && !error && (
        <div className="text-center py-12 text-on-surface-variant">
          No tasks found matching "{query}".
        </div>
      )}
    </div>
  );
};

export default TaskList;
