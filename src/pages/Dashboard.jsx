// =========================
// Dashboard.jsx (FULL UPDATED VERSION)
// =========================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [liveData, setLiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://servecly-api.onrender.com";

  useEffect(() => {
    const initDashboard = async () => {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!savedUser || !token) {
        navigate("/login");
        return;
      }

      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      try {
        let endpoint = `${API_URL}/v1/tasks`;

        if (parsedUser.role === "admin") {
          endpoint = `${API_URL}/v1/admin/vetting/pending`;
        }

        // CHANGE: Customer now fetches THEIR tasks, not all bookings
        if (parsedUser.role === "user") {
          endpoint = `${API_URL}/v1/tasks/my`;
        }

        // CHANGE: Tasker keeps bookings/tasks feed
        if (parsedUser.role === "tasker") {
          endpoint = `${API_URL}/v1/bookings`;
        }

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setLiveData(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [navigate, API_URL]);

  const getGreeting = () => {
    if (user?.role === "admin") return `System Control: ${user.name}`;
    if (user?.role === "tasker") return `Workspace: ${user.name}`;
    return `Hello, ${user?.name?.split(" ")[0] || "User"}`;
  };

  if (loading) {
    return (
      <div className="p-20 text-center font-display opacity-50">
        Syncing with Servecly...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">{getGreeting()}</h1>

      {user?.role === "user" && (
        <CustomerView navigate={navigate} data={liveData} />
      )}

      {user?.role === "tasker" && <TaskerView data={liveData} />}

      {user?.role === "admin" && <AdminView data={liveData} />}
    </div>
  );
};

const CustomerView = ({ navigate, data }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">My Tasks</h2>

    <div className="space-y-4">
      {data.length > 0 ? (
        data.map((task, i) => (
          <TaskRow
            key={i}
            // CHANGE: use title from Task table
            title={task.title || "Task Request"}
            price={task.status || "Open"}
            icon="🤝"
          />
        ))
      ) : (
        <p>You haven't posted any tasks yet.</p>
      )}
    </div>

    <button
      onClick={() => navigate("/services")}
      className="mt-8 btn-primary px-6 py-3"
    >
      Post New Task
    </button>
  </div>
);

const TaskerView = ({ data }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

    {data.map((item, i) => (
      <TaskRow
        key={i}
        title={item.title || "Assigned Task"}
        price={item.booking_status_id || "Booked"}
        icon="🛠️"
      />
    ))}
  </div>
);

const AdminView = ({ data }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
    <p>{data.length} records found.</p>
  </div>
);

const TaskRow = ({ title, price, icon }) => (
  <div className="flex justify-between p-5 border rounded-xl">
    <div className="flex gap-4 items-center">
      <div>{icon}</div>
      <div>{title}</div>
    </div>
    <div>{price}</div>
  </div>
);

export default Dashboard;
