import React, { useState } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'contributor',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('register/', formData);
      alert('Registered successfully! Now login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed!');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 transition-all">
        <h2 className="text-3xl font-extrabold text-center text-emerald-600 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Email"
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
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-slate-700 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            >
              <option value="admin">Admin</option>
              <option value="contributor">Contributor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition-all shadow-md"
          >
            Register
          </button>

          <p className="text-sm text-center text-slate-600 mt-4">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-pink-600 font-medium hover:underline transition-all"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
