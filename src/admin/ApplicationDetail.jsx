import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const docRef = doc(db, 'applications', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setApplication({ id: docSnap.id, ...docSnap.data() });
      } else {
        toast.error('Application not found');
        navigate('/admin/applications');
      }
    } catch (error) {
      console.error('Error fetching application:', error);
      toast.error('Failed to load application');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    if (!application) return;

    setUpdating(true);
    try {
      const docRef = doc(db, 'applications', id);
      await updateDoc(docRef, { status: newStatus });
      
      setApplication({ ...application, status: newStatus });
      toast.success(`Application ${newStatus} successfully`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!application) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500';
      case 'accepted': return 'text-green-500 bg-green-500/10 border-green-500';
      case 'rejected': return 'text-red-500 bg-red-500/10 border-red-500';
      case 'waitlisted': return 'text-blue-500 bg-blue-500/10 border-blue-500';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/admin/applications')}
          className="text-gray-400 hover:text-white mb-6 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Applications
        </button>

        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{application.fullName}</h1>
              <span className={`inline-block px-4 py-2 rounded-full text-sm border ${getStatusColor(application.status)}`}>
                {application.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-gray-700">
            <button
              onClick={() => updateStatus('accepted')}
              disabled={updating || application.status === 'accepted'}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Accept
            </button>
            <button
              onClick={() => updateStatus('rejected')}
              disabled={updating || application.status === 'rejected'}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reject
            </button>
            <button
              onClick={() => updateStatus('waitlisted')}
              disabled={updating || application.status === 'waitlisted'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Waitlist
            </button>
            <button
              onClick={() => updateStatus('pending')}
              disabled={updating || application.status === 'pending'}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset to Pending
            </button>
          </div>

          {/* Application Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Email</h3>
                <p className="text-white">{application.email}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Phone</h3>
                <p className="text-white">{application.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">College</h3>
                <p className="text-white">{application.college}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Degree</h3>
                <p className="text-white">{application.degree}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Graduation Year</h3>
                <p className="text-white">{application.graduationYear}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Applied On</h3>
                <p className="text-white">{new Date(application.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Team Name</h3>
                <p className="text-white">{application.teamName}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Team Size</h3>
                <p className="text-white">{application.teamSize} member(s)</p>
              </div>
            </div>

            <div>
              <h3 className="text-gray-400 text-sm mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-400 text-sm mb-1">GitHub Profile</h3>
              <a
                href={application.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {application.github}
              </a>
            </div>

            {application.linkedIn && (
              <div>
                <h3 className="text-gray-400 text-sm mb-1">LinkedIn Profile</h3>
                <a
                  href={application.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {application.linkedIn}
                </a>
              </div>
            )}

            <div>
              <h3 className="text-gray-400 text-sm mb-2">Why do they want to participate?</h3>
              <p className="text-white bg-gray-900 p-4 rounded-lg border border-gray-700">
                {application.whyParticipate}
              </p>
            </div>

            <div>
              <h3 className="text-gray-400 text-sm mb-1">MLH Code of Conduct</h3>
              <p className="text-white">
                {application.mlhAccepted ? '✓ Accepted' : '✗ Not Accepted'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
