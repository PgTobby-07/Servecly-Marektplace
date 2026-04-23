import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const categories = [
    { id: 1, name: "Assembly", icon: "🛠️", count: "1.2k+ Taskers" },
    { id: 2, name: "Mounting", icon: "🖼️", count: "800+ Taskers" },
    { id: 3, name: "Cleaning", icon: "🧹", count: "2k+ Taskers" },
    { id: 4, name: "Moving", icon: "🚚", count: "1.5k+ Taskers" },
    { id: 5, name: "Plumbing", icon: "🚿", count: "900+ Taskers" },
    { id: 6, name: "Electrical", icon: "⚡", count: "700+ Taskers" },
  ];

  // UPDATED: Prevent horizontal scroll issues on mobile
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      
      {/* UPDATED: Safe container to prevent overflow on mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO SECTION */}
        <section className="py-10 sm:py-16">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
              Welcome{user?.name ? `, ${user.name}` : ""} 👋
            </h1>

            <p className="text-gray-600 text-sm sm:text-base max-w-xl">
              Find trusted taskers for anything you need done around your home.
            </p>

            <Link
              to="/post-task"
              className="mt-2 inline-block w-fit bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Post a Task
            </Link>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="py-6 sm:py-10">
          <h2 className="text-lg sm:text-2xl font-semibold mb-4">
            Popular Services
          </h2>

          {/* UPDATED: Responsive grid prevents right-side cutoff */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 sm:p-5 flex flex-col gap-2"
              >
                <div className="text-2xl sm:text-3xl">{cat.icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {cat.count}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EXTRA SECTION (optional placeholder for layout balance) */}
        <section className="py-10">
          <div className="bg-blue-50 rounded-xl p-6 sm:p-10">
            <h3 className="text-lg sm:text-xl font-semibold">
              Need something done fast?
            </h3>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Post your task and get offers from nearby taskers in minutes.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
