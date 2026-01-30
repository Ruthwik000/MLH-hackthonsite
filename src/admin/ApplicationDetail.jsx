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
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!application) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'accepted': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'waitlisted': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/applications')}
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Applications
        </button>

        {/* Header */}
        <div className="bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-800 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold text-white tracking-tight">{application.fullName}</h1>
              <p className="mt-1 text-sm text-gray-400">{application.email}</p>
            </div>
            <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(application.status)}`}>
              {application.status.toUpperCase()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-800">
            <button
              onClick={() => updateStatus('accepted')}
              disabled={updating || application.status === 'accepted'}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Accept
            </button>
            <button
              onClick={() => updateStatus('rejected')}
              disabled={updating || application.status === 'rejected'}
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reject
            </button>
            <button
              onClick={() => updateStatus('waitlisted')}
              disabled={updating || application.status === 'waitlisted'}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Waitlist
            </button>
            <button
              onClick={() => updateStatus('pending')}
              disabled={updating || application.status === 'pending'}
              className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Application Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">Phone</dt>
                <dd className="mt-1 text-sm text-gray-200">{application.phone}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">College</dt>
                <dd className="mt-1 text-sm text-gray-200">{application.college}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">Degree</dt>
                <dd className="mt-1 text-sm text-gray-200">{application.degree}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">Graduation Year</dt>
                <dd className="mt-1 text-sm text-gray-200">{application.graduationYear}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">Applied On</dt>
                <dd className="mt-1 text-sm text-gray-200">{new Date(application.createdAt).toLocaleString()}</dd>
              </div>
            </dl>
          </div>

          {/* Team Information */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">Team Information</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">Team Name</dt>
                <dd className="mt-1 text-sm text-gray-200">{application.teamName}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">Team Size</dt>
                <dd className="mt-1 text-sm text-gray-200">{application.teamSize} member(s)</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">GitHub</dt>
                <dd className="mt-1">
                  <a
                    href={application.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-orange-400 hover:text-orange-300"
                  >
                    {application.github}
                  </a>
                </dd>
              </div>
              {application.linkedIn && (
                <div>
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">LinkedIn</dt>
                  <dd className="mt-1">
                    <a
                      href={application.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-400 hover:text-orange-300"
                    >
                      {application.linkedIn}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide">MLH Code of Conduct</dt>
                <dd className="mt-1 text-sm text-gray-200">
                  {application.mlhAccepted ? '✓ Accepted' : '✗ Not Accepted'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Skills */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {application.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex px-3 py-1 bg-orange-500/10 text-orange-400 text-sm font-medium rounded-full border border-orange-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Motivation */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">Why Participate?</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {application.whyParticipate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
