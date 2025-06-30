import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get('activity-logs/');
        setLogs(res.data.results);
      } catch (err) {
        console.error('Failed to fetch activity logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">📋 Activity Log</h2>
      
      {loading ? (
        <p className="text-slate-600">Loading logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-slate-600">No recent activity to show.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-600">Task</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-600">Prev Assignee</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-600">Prev Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-600">Prev Due Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-600">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-4 py-2 text-sm text-slate-800">{log.task}</td>
                  <td className="px-4 py-2 text-sm text-slate-800">{log.previous_assignee?.username || '—'}</td>
                  <td className="px-4 py-2 text-sm text-slate-800">{log.previous_status}</td>
                  <td className="px-4 py-2 text-sm text-slate-800">{log.previous_due_date || '—'}</td>
                  <td className="px-4 py-2 text-sm text-slate-600">{new Date(log.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
