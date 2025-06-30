import React, { useState } from 'react';
import API from '../../api/api';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = localStorage.getItem('role');
      if (role !== 'admin') {
        setMessage('❌ Only admins can create a project');
        return;
      }

      await API.post('projects/', formData);
      setMessage('✅ Project created successfully');
      setFormData({ title: '', description: '' }); // Clear form
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to create project');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-10 transition-all">
        <h3 className="text-2xl font-extrabold text-emerald-600 mb-6 text-center">
          🚀 Create New Project
        </h3>

        {message && (
          <div
            className={`text-sm text-center mb-4 font-semibold ${
              message.startsWith('✅') ? 'text-emerald-600' : 'text-pink-600'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition-all shadow-md"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
