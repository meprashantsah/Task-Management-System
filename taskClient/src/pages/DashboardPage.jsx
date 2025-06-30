import React, { useEffect, useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import ProjectList from '../components/Dashboard/ProjectList';
import TaskList from '../components/Dashboard/TaskList';
import CreateTask from '../components/Dashboard/CreateTask';
import API from '../api/api';
import ActivityLog from '../components/Dashboard/ActivityLog';

const DashboardPage = ({ onLogout }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('me/');
        setRole(res.data.role);
      } catch (err) {
        console.error('Failed to get user role');
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-100">


      {/* <Navbar onLogout={onLogout} isAdmin={role === 'admin'} /> */}

      {/* <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-8">
          🎯 Welcome to the Dashboard!
        </h2>

        <section className="bg-white rounded-2xl shadow-md p-6">
          <ProjectList />
        </section>

        {role === 'admin' && (
          <section className="bg-white rounded-2xl shadow-md p-6">
            <CreateTask />
          </section>
        )}

        <section className="bg-white rounded-2xl shadow-md p-6">
          <TaskList />
        </section>

        <section className="bg-white rounded-2xl shadow-md p-6">
          <ActivityLog />
        </section>

      </main> */}

        <h1 className="text-2xl font-extrabold text-emerald-600 tracking-tight">
          Analytics will be added in dashboard
        </h1>
        <h1 className="text-2xl font-extrabold text-emerald-600 tracking-tight">
          In Future
        </h1>


    </div>
  );
};

export default DashboardPage;
