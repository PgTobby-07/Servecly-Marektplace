import React, { useState, useEffect } from "react"; // Added useState and useEffect
import { Link, useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const [user, setUser] = useState(null); // Create a state for the user
  const navigate = useNavigate();

  // This runs every time the component renders or the route changes
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user"); // Using session for security
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, []);

  const Logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null); // Clear state so the UI updates immediately
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Header with Frosted Glass Effect */}
      <header className="sticky top-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/15">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-container rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-primary">
              Servecly
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-variant">
            <Link to="/" className="hover:text-primary transition-colors">
              Categories
            </Link>
            <Link
              to="/services"
              className="hover:text-primary transition-colors"
            >
              Find Help
            </Link>
            <Link
              to="/post-task"
              className="hover:text-primary transition-colors"
            >
              Post a Task
            </Link>
          </div>
          {user ? null : (
            <div className="flex items-center gap-4">
              <Link
                to="/signup"
                className="btn-primary text-sm font-semibold shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
          <nav>
            {user ? (
              <button onClick={Logout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/15 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white text-xs font-bold">
                S
              </div>
              <span className="text-lg font-display font-bold text-primary">
                Servecly
              </span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-xs">
              Built with professional-grade precision for a two-sided service
              economy.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Marketplace</h4>
            <ul className="text-sm text-on-surface-variant flex flex-col gap-2">
              <li>
                <Link to="/services" className="hover:text-primary">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/post-task" className="hover:text-primary">
                  How to Post
                </Link>
              </li>
              <li>
                <Link to="/profile-setup" className="hover:text-primary">
                  Become a Tasker
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Support</h4>
            <ul className="text-sm text-on-surface-variant flex flex-col gap-2">
              <li>
                <Link to="/admin/vetting" className="hover:text-primary">
                  Admin Access
                </Link>
              </li>
              <li>
                <Link to="/admin/taxonomy" className="hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-outline-variant/5 text-xs text-on-surface-variant flex justify-between">
          <p>© 2026 Servecly Marketplace. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
