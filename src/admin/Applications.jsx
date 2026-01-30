import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { exportToCSV } from '../utils/exportCSV';
import toast from 'react-hot-toast';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, statusFilter, searchTerm]);

  const fetchApplications = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'applications'));
      const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      apps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setApplications(apps);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.college.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApps(filtered);
  };

  const handleExport = () => {
    if (filteredApps.length === 0) {
      toast.error('No applications to export');
      return;
    }

    const exportData = filteredApps.map(app => ({
      Name: app.fullName,
      Email: app.email,
      Phone: app.phone,
      College: app.college,
      Degree: app.degree,
      'Graduation Year': app.graduationYear,
      'Team Name': app.teamName,
      'Team Size': app.teamSize,
      Skills: app.skills.join(', '),
      GitHub: app.github,
      Status: app.status,
      'Applied On': new Date(app.createdAt).toLocaleDateString()
    }));

    exportToCSV(exportData, `applications_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Applications exported successfully');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500';
      case 'accepted': return 'text-green-500 bg-green-500/10 border-green-500';
      case 'rejected': return 'text-red-500 bg-red-500/10 border-red-500';
      case 'waitlisted': return 'text-blue-500 bg-blue-500/10 border-blue-500';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500';
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            All <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Applications</span>
          </h1>
          <button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name, email, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="waitlisted">Waitlisted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-gray-400 mb-4">
          Showing {filteredApps.length} of {applications.length} applications
        </div>

        {/* Applications Table */}
        {filteredApps.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
            <p className="text-gray-400 text-lg">No applications found</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">College</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Team</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Year</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-700/50 transition">
                      <td className="px-6 py-4 text-white">{app.fullName}</td>
                      <td className="px-6 py-4 text-gray-300">{app.college}</td>
                      <td className="px-6 py-4 text-gray-300">{app.teamName}</td>
                      <td className="px-6 py-4 text-gray-300">{app.graduationYear}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/admin/applications/${app.id}`}
                          className="text-primary hover:text-primary/80 font-semibold"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
