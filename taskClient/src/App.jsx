import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectList from './components/Dashboard/ProjectList';
import TaskList from './components/Dashboard/TaskList';
import CreateProject from './components/Dashboard/CreateProject';
import CreateTask from './components/Dashboard/CreateTask';
import ActivityLog from './components/Dashboard/ActivityLog';
import Navbar from './components/Layout/Navbar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
  };

  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-100 text-slate-800 transition-all">
      <Router>
        {token && (
          <div className="shadow-md sticky top-0 z-50">
            <Navbar onLogout={handleLogout} isAdmin={isAdmin} />
          </div>
        )}

        <main className="flex justify-center">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              {!token ? (
                <>
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage setToken={setToken} />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/projects" element={<ProjectList />} />
                  <Route path="/tasks" element={<TaskList />} />
                  <Route path="/create-project" element={<CreateProject />} />
                  <Route path="/create-task" element={<CreateTask />} />
                  <Route path="/activity-log" element={<ActivityLog />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              )}
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
