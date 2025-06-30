import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Navbar = ({ onLogout, isAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  // Base styles for links
  const navLinkBase =
    'text-slate-700 hover:text-emerald-600 px-3 py-2 rounded-lg text-sm font-medium transition-all';
  const activeClass =
    'bg-indigo-100 text-emerald-700 font-semibold shadow-md';

  return (
    <nav className="bg-white shadow-lg px-6 py-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Brand */}
        <h1 className="text-2xl font-extrabold text-emerald-600 tracking-tight">
          Smart Task Tracker
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : ''}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : ''}`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : ''}`
            }
          >
            Tasks
          </NavLink>

          {isAdmin && (
            <>
              <NavLink
                to="/create-project"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? activeClass : ''}`
                }
              >
                Create Project
              </NavLink>

              <NavLink
                to="/create-task"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? activeClass : ''}`
                }
              >
                Create Task
              </NavLink>

              <NavLink
                to="/activity-log"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? activeClass : ''}`
                }
              >
                Activity Log
              </NavLink>
            </>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-600 transition-all shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
