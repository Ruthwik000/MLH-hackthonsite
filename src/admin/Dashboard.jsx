import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

      // Calculate stats
      const newStats = {
        total: applications.length,
        pending: applications.filter(app => app.status === 'pending').length,
        accepted: applications.filter(app => app.status === 'accepted').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
        waitlisted: applications.filter(app => app.status === 'waitlisted').length
      };
      setStats(newStats);

      // Calculate college distribution
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Admin <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Dashboard</span>
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-2">Total Applications</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-yellow-600">
            <div className="text-gray-400 text-sm mb-2">Pending</div>
            <div className="text-3xl font-bold text-yellow-500">{stats.pending}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-green-600">
            <div className="text-gray-400 text-sm mb-2">Accepted</div>
            <div className="text-3xl font-bold text-green-500">{stats.accepted}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-red-600">
            <div className="text-gray-400 text-sm mb-2">Rejected</div>
            <div className="text-3xl font-bold text-red-500">{stats.rejected}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-blue-600">
            <div className="text-gray-400 text-sm mb-2">Waitlisted</div>
            <div className="text-3xl font-bold text-blue-500">{stats.waitlisted}</div>
          </div>
        </div>

        {/* College Distribution Chart */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Top 10 Colleges by Applications</h2>
          {collegeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={collegeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="college" stroke="#9CA3AF" angle={-45} textAnchor="end" height={120} />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Legend />
                <Bar dataKey="count" fill="#f97316" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-400 py-12">No data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
