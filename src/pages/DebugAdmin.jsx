import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useState } from 'react';
import toast from 'react-hot-toast';

const DebugAdmin = () => {
  const { user, userRole } = useAuth();
  const [updating, setUpdating] = useState(false);
  
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];

  const updateToAdmin = async () => {
    if (!user) {
      toast.error('No user logged in');
      return;
    }

    setUpdating(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        role: 'admin'
      });
      toast.success('Role updated! Please refresh the page.');
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update role: ' + error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Debug Page</h1>
        
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Current User Info</h2>
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> {user?.email || 'Not logged in'}</p>
              <p><strong>UID:</strong> {user?.uid || 'N/A'}</p>
              <p><strong>Current Role:</strong> <span className={userRole === 'admin' ? 'text-green-500' : 'text-yellow-500'}>{userRole || 'Not set'}</span></p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Environment Config</h2>
            <div className="space-y-2 text-gray-300">
              <p><strong>Admin Emails from .env:</strong></p>
              <ul className="list-disc list-inside ml-4">
                {adminEmails.length > 0 ? (
                  adminEmails.map((email, i) => (
                    <li key={i} className={email === user?.email ? 'text-green-500' : ''}>{email}</li>
                  ))
                ) : (
                  <li className="text-red-500">No admin emails configured!</li>
                )}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Status Check</h2>
            <div className="space-y-2">
              <p className={`${user ? 'text-green-500' : 'text-red-500'}`}>
                {user ? '✅' : '❌'} User logged in
              </p>
              <p className={`${adminEmails.includes(user?.email) ? 'text-green-500' : 'text-red-500'}`}>
                {adminEmails.includes(user?.email) ? '✅' : '❌'} Email in admin list
              </p>
              <p className={`${userRole === 'admin' ? 'text-green-500' : 'text-red-500'}`}>
                {userRole === 'admin' ? '✅' : '❌'} Has admin role
              </p>
            </div>
          </div>

          {user && userRole !== 'admin' && (
            <div className="pt-6 border-t border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Fix Admin Access</h2>
              <p className="text-gray-300 mb-4">
                Your email is in the admin list but your role is not set to admin. Click below to update:
              </p>
              <button
                onClick={updateToAdmin}
                disabled={updating}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update Role to Admin'}
              </button>
            </div>
          )}

          {userRole === 'admin' && (
            <div className="pt-6 border-t border-gray-700">
              <p className="text-green-500 text-xl font-bold">✅ You have admin access!</p>
              <a href="/admin/dashboard" className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                Go to Admin Dashboard
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-3">Troubleshooting Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Make sure .env file has: <code className="bg-gray-900 px-2 py-1 rounded">VITE_ADMIN_EMAILS=grtuhwik44@gmail.com,admin@bvrit.ac.in</code></li>
            <li>Restart the dev server after changing .env</li>
            <li>Logout and login again</li>
            <li>Or use the "Update Role to Admin" button above</li>
            <li>Refresh the page after updating</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DebugAdmin;
