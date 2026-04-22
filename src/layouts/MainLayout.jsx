import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); 
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/15">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-container rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-primary">
                Servecly
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-variant">
              <Link to="/" className="hover:text-primary transition-colors">Categories</Link>
              <Link to="/services" className="hover:text-primary transition-colors">Find Help</Link>
              {/* logic: Show for Guests (no user) OR Clients (role 'user') */}
             {(!user || user.role === 'users') && (
              <Link to="/post-task" className="hover:text-primary transition-colors">Post a Task</Link>
              )}
              {/* FIXED: Added a general Dashboard link for logged-in users */}
              {user && (
                <Link to="/dashboard" className="text-primary font-bold hover:underline">Dashboard</Link>
              )}

              {/* FIXED: Neatly integrated 'Complete Setup' so it doesn't distort the nav */}
              {user?.role === 'tasker' && (user?.status === 'new' || !user?.status) && (
                <Link 
                  to="/profile-setup" 
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold animate-pulse"
                >
                  ✨ Complete Setup
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                {/* Admin Quick Link */}
                {user.role === 'admin' && (
                  <Link to="/admin/vetting" className="text-xs font-bold text-error border border-error/20 px-2 py-1 rounded">ADMIN PANEL</Link>
                )}
                <span className="text-sm font-medium text-on-surface-variant">
                  Hi, {user.name?.split(' ')[0] || 'User'}
                </span>
                <button 
                  onClick={Logout}
                  className="text-sm font-semibold text-primary hover:text-primary-dim transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium text-on-surface-variant hover:text-primary">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-primary/90 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
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
              Built with professional-grade precision for a two-sided service economy.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Marketplace</h4>
            <ul className="text-sm text-on-surface-variant flex flex-col gap-2">
              <li><Link to="/dashboard" className="hover:text-primary">My Dashboard</Link></li>
              <li><Link to="/services" className="hover:text-primary">All Services</Link></li>
              <li><Link to="/profile-setup" className="hover:text-primary">Become a Tasker</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Admin</h4>
            <ul className="text-sm text-on-surface-variant flex flex-col gap-2">
              <li><Link to="/admin/vetting" className="hover:text-primary">Vetting Pipeline</Link></li>
              <li><Link to="/admin/taxonomy" className="hover:text-primary">Categories</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-outline-variant/5 text-xs text-on-surface-variant flex justify-between">
          <p>© 2026 Servecly Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
