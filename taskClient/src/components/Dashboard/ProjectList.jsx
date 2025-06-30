import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('projects/');
        setProjects(res.data.results);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-10 transition-all">
        <h3 className="text-2xl font-extrabold text-emerald-600 mb-6 text-center">
          Projects
        </h3>

        {loading ? (
          <p className="text-center text-slate-600">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-slate-500">No projects available.</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm hover:bg-indigo-100 transition-all"
              >
                <h4 className="text-lg font-semibold text-slate-800">
                  {project.title}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {project.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectList;














// import React, { useEffect, useState } from 'react';
// import API from '../../api/api';

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProject, setEditingProject] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [message, setMessage] = useState('');

//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get('projects/');
//       setProjects(res.data.results || res.data);
//     } catch (err) {
//       console.error('Failed to fetch projects:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (project) => {
//     setEditingProject(project.id);
//     setFormData(project);
//     setMessage('');
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put(`projects/${editingProject}/`, formData);
//       setMessage('✅ Project updated successfully');
//       setEditingProject(null);
//       fetchProjects();
//     } catch (err) {
//       setMessage('❌ Failed to update project');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-100 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 sm:p-10 transition-all">
//         <h3 className="text-2xl font-extrabold text-emerald-600 mb-6 text-center">
//           Projects
//         </h3>

//         {message && (
//           <div
//             className={`text-center mb-4 font-semibold ${
//               message.startsWith('✅') ? 'text-emerald-600' : 'text-pink-600'
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         {loading ? (
//           <p className="text-center text-slate-600">Loading projects...</p>
//         ) : projects.length === 0 ? (
//           <p className="text-center text-slate-500">No projects available.</p>
//         ) : (
//           <ul className="space-y-4">
//             {projects.map((project) =>
//               editingProject === project.id ? (
//                 <li key={project.id} className="p-4 bg-emerald-50 rounded-lg border shadow">
//                   <form onSubmit={handleSubmit} className="space-y-2">
//                     {role === 'admin' && (
//                       <>
//                         <input
//                           name="title"
//                           value={formData.title}
//                           onChange={handleChange}
//                           className="w-full border px-3 py-2 rounded-md"
//                         />
//                         <textarea
//                           name="description"
//                           value={formData.description}
//                           onChange={handleChange}
//                           className="w-full border px-3 py-2 rounded-md"
//                         />
//                       </>
//                     )}

//                     <select
//                       name="status"
//                       value={formData.status}
//                       onChange={handleChange}
//                       className="w-full border px-3 py-2 rounded-md"
//                     >
//                       <option value="TODO">Todo</option>
//                       <option value="IN_PROGRESS">In Progress</option>
//                       <option value="DONE">Done</option>
//                     </select>

//                     {role === 'admin' && (
//                       <>
//                         <input
//                           type="date"
//                           name="due_date"
//                           value={formData.due_date}
//                           onChange={handleChange}
//                           className="w-full border px-3 py-2 rounded-md"
//                         />
//                         <input
//                           type="number"
//                           name="assigned_to_id"
//                           value={formData.assigned_to_id || ''}
//                           onChange={handleChange}
//                           className="w-full border px-3 py-2 rounded-md"
//                           placeholder="Assign To (User ID)"
//                         />
//                       </>
//                     )}

//                     <button
//                       type="submit"
//                       className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setEditingProject(null)}
//                       className="ml-2 text-sm text-red-500 underline"
//                     >
//                       Cancel
//                     </button>
//                   </form>
//                 </li>
//               ) : (
//                 <li
//                   key={project.id}
//                   className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm hover:bg-indigo-100 transition-all"
//                 >
//                   <h4 className="text-lg font-semibold text-slate-800">
//                     {project.title}
//                   </h4>
//                   <p className="text-sm text-slate-600 mt-1">
//                     {project.description}
//                   </p>
//                   <p className="text-xs mt-1 text-slate-500">Status: {project.status}</p>

//                   {(role === 'admin' || role === 'contributor') && (
//                     <button
//                       onClick={() => handleEditClick(project)}
//                       className="mt-2 text-sm text-emerald-600 hover:underline"
//                     >
//                       Edit
//                     </button>
//                   )}
//                 </li>
//               )
//             )}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectList;
