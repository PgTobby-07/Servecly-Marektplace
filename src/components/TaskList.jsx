import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // CHANGE: Added navigation hook
import TaskCard from './TaskCard';

const TaskList = ({ query = "" }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // CHANGE: Initialized navigate function

  const API_URL = import.meta.env.VITE_API_URL || 'https://servecly-api.onrender.com';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const endpoint = `${API_URL}/v1/services/search?q=${encodeURIComponent(query)}`;
        const response = await fetch(endpoint);
        
        if (!response.ok) throw new Error('Database connection failed');
        
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Unable to reach the Servecly marketplace.");
        setTasks([]); 
      } finally {
        setLoading(false);
      }
    };

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          /* CHANGE: Wrapped TaskCard in a div that redirects to the Post Task page 
             with the specific Service ID in the URL */
          <div 
            key={task.id} 
            onClick={() => navigate(`/post-task?serviceId=${task.id}`)}
            className="cursor-pointer transition-all duration-200"
          >
            <TaskCard task={task} />
          </div>
        ))}
      </div>
      
      {tasks.length === 0 && !error && (
        <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant">
          <p className="text-on-surface-variant font-medium">
            {query ? `No services found matching "${query}"` : "The marketplace is currently quiet."}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
