import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    waitlisted: 0
  });
  const [collegeData, setCollegeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'applications'));
      const applications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const newStats = {
        total: applications.length,
        pending: applications.filter(app => app.status === 'pending').length,
        accepted: applications.filter(app => app.status === 'accepted').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
        waitlisted: applications.filter(app => app.status === 'waitlisted').length
      };
      setStats(newStats);

      const collegeCount = {};
      applications.forEach(app => {
        collegeCount[app.college] = (collegeCount[app.college] || 0) + 1;
      });

      const chartData = Object.entries(collegeCount)
        .map(([college, count]) => ({ college, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setCollegeData(chartData);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">Overview of all hackathon applications</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-800">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Total</div>
            <div className="text-3xl font-semibold text-white">{stats.total}</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-yellow-900/50">
            <div className="text-xs font-medium text-yellow-400 uppercase tracking-wide mb-2">Pending</div>
            <div className="text-3xl font-semibold text-yellow-400">{stats.pending}</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-green-900/50">
            <div className="text-xs font-medium text-green-400 uppercase tracking-wide mb-2">Accepted</div>
            <div className="text-3xl font-semibold text-green-400">{stats.accepted}</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-red-900/50">
            <div className="text-xs font-medium text-red-400 uppercase tracking-wide mb-2">Rejected</div>
            <div className="text-3xl font-semibold text-red-400">{stats.rejected}</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-blue-900/50">
            <div className="text-xs font-medium text-blue-400 uppercase tracking-wide mb-2">Waitlisted</div>
            <div className="text-3xl font-semibold text-blue-400">{stats.waitlisted}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Link
            to="/admin/applications"
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            View All Applications
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* College Distribution Chart */}
        <div className="bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-6">Top Colleges</h2>
          {collegeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={collegeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="college" 
                  stroke="#9ca3af" 
                  angle={-45} 
                  textAnchor="end" 
                  height={150}
                  interval={0}
                  style={{ fontSize: '12px' }} 
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151', 
                    borderRadius: '8px',
                    color: '#f3f4f6'
                  }}
                  labelStyle={{ color: '#f3f4f6', fontWeight: '500' }}
                />
                <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 py-12">No data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
