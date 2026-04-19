import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Fetching from the FastAPI backend at http://localhost:8000/tasks
        const response = await fetch('http://localhost:8000/tasks');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setTasks(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Unable to connect to the backend. Showing demo data.");
        
        // Fallback demo data for preview
        setTasks([
          {
            task_id: 1,
            title: "Move Heavy Furniture",
            description: "Need help moving a sofa and 3 heavy boxes from the 2nd floor to the garage. Careful with the walls.",
            location: "Downtown, Metro City",
            scheduled_time: new Date().toISOString(),
            status: "Pending"
          },
          {
            task_id: 2,
            title: "Garden Weeding & Cleanup",
            description: "Overgrown backyard needs thorough weeding and disposal of green waste. Tools provided.",
            location: "Suburban Heights",
            scheduled_time: new Date().toISOString(),
            status: "Confirmed"
          },
          {
            task_id: 3,
            title: "IKEA Bed Frame Assembly",
            description: "Malm bed frame assembly. Should take about 2 hours. Looking for someone experienced.",
            location: "North Side",
            scheduled_time: new Date().toISOString(),
            status: "Completed"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

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
        <div className="bg-error-container text-error px-4 py-3 rounded-xl text-sm font-medium">
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
          No tasks available at the moment.
        </div>
      )}
    </div>
  );
};

export default TaskList;
