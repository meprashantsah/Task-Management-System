import React, { useState } from 'react';
import API from '../../api/api';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('login/', credentials);
      const token = res.data.access;
      const role = res.data.role;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      onLogin(token);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 transition-all">
        <h2 className="text-3xl font-extrabold text-center text-emerald-600 mb-6">
          Smart Task Tracker
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition-all shadow-md"
          >
            Login
          </button>

          <p className="text-sm text-center text-slate-600 mt-4">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="text-pink-600 font-medium hover:underline transition-all"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
