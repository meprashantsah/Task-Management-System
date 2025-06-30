import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem('role'); // 'admin' or 'contributor'

  const fetchData = async () => {
    setLoading(true);
    try {
      const projectQuery = selectedProject ? `?project=${selectedProject}` : '';
      const [taskRes, projectRes] = await Promise.all([
        API.get(`tasks/${projectQuery}`),
        API.get('projects/')
      ]);

      setTasks(taskRes.data.results || taskRes.data);
      setProjects(projectRes.data.results || projectRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedProject]);

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setFormData({ ...task, assigned_to_id: task.assigned_to?.id || '', project: task.project?.id || task.project });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`tasks/${editingTaskId}/`, formData);
      setMessage('✅ Task updated successfully');
      setEditingTaskId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update task');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 sm:p-10 transition-all">
        <h3 className="text-2xl font-extrabold text-emerald-600 mb-6 text-center">Task List</h3>

        {/* Filter */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Filter by Project:
          </label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm"
          >
            <option value="">-- All Projects --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        {message && (
          <p className={`text-center font-semibold mb-4 ${message.startsWith('✅') ? 'text-emerald-600' : 'text-pink-600'}`}>
            {message}
          </p>
        )}

        {/* Task List */}
        {loading ? (
          <p className="text-center text-slate-600">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-slate-500">No tasks found.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) =>
              editingTaskId === task.id ? (
                <li key={task.id} className="p-4 border rounded-lg bg-emerald-50">
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Admin Fields */}
                    {role === 'admin' && (
                      <>
                        <input
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md"
                          placeholder="Title"
                        />
                        <input
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md"
                          placeholder="Description"
                        />
                        <input
                          type="date"
                          name="due_date"
                          value={formData.due_date}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md"
                        />
                        <input
                          type="number"
                          name="assigned_to_id"
                          value={formData.assigned_to_id}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md"
                          placeholder="Assign To ID"
                        />
                        <select
                          name="project"
                          value={formData.project}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md"
                        >
                          {projects.map((p) => (
                            <option key={p.id} value={p.id}>{p.title}</option>
                          ))}
                        </select>
                      </>
                    )}

                    {/* Status for both */}
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="border px-3 py-2 rounded-md"
                    >
                      <option value="TODO">Todo</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </select>

                    <div className="col-span-full flex gap-4 mt-2">
                      <button
                        type="submit"
                        className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTaskId(null)}
                        className="text-red-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </li>
              ) : (
                <li
                  key={task.id}
                  className="p-4 border border-indigo-100 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-all"
                >
                  <h4 className="text-lg font-semibold text-slate-800 mb-1">{task.title}</h4>
                  <p className="text-sm text-slate-700 mb-1">
                    Status:{' '}
                    <span className="font-medium text-emerald-600">
                      {task.status}
                    </span>
                  </p>
                  <p className="text-sm text-slate-600 mb-1">Due: {task.due_date}</p>
                  <p className="text-sm text-slate-600">
                    Assigned to:{' '}
                    <span className="font-medium text-pink-600">
                      {task.assigned_to?.username || 'Unassigned'}
                    </span>
                  </p>
                  {(role === 'admin' || role === 'contributor') && (
                    <button
                      onClick={() => handleEditClick(task)}
                      className="mt-2 text-sm text-emerald-600 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
