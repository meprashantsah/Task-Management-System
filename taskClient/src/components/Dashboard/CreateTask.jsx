import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const CreateTask = () => {
  const [projects, setProjects] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO',
    due_date: '',
    project: '',
    assigned_to_id: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, userRes] = await Promise.all([
          API.get('projects/'),
          API.get('users/?role=contributor'),
        ]);
        setProjects(projectRes.data.results || projectRes.data);
        setContributors(userRes.data.results || userRes.data);
      } catch (err) {
        console.error('Failed to load data', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('tasks/', formData);
      setMessage('✅ Task created successfully');

      setFormData({
        title: '',
        description: '',
        status: 'TODO',
        due_date: '',
        project: '',
        assigned_to_id: '',
      });

    } catch (err) {
      setMessage('❌ Failed to create task');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-10 transition-all">
        <h3 className="text-2xl font-extrabold text-emerald-600 mb-6 text-center">
          ➕ Create New Task
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
              Task Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
              Task Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            ></textarea>
          </div>

          {/* Status and Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <div>
              <label htmlFor="due_date" className="block text-sm font-medium text-slate-700 mb-1">
                Due Date
              </label>
              <input
                id="due_date"
                type="date"
                name="due_date"
                value={formData.due_date}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Project */}
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-slate-700 mb-1">
              Project
            </label>
            <select
              id="project"
              name="project"
              required
              value={formData.project}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Assigned To */}
          <div>
            <label htmlFor="assigned_to_id" className="block text-sm font-medium text-slate-700 mb-1">
              Assign To
            </label>
            <select
              id="assigned_to_id"
              name="assigned_to_id"
              value={formData.assigned_to_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            >
              <option value="">Select User</option>
              {contributors.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 transition-all shadow-md"
          >
            Create Task
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateTask;
