import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              BVRIT Hackathon 2026
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
            <Link to="/schedule" className="text-gray-300 hover:text-white transition">Schedule</Link>
            <Link to="/sponsors" className="text-gray-300 hover:text-white transition">Sponsors</Link>
            <Link to="/faq" className="text-gray-300 hover:text-white transition">FAQ</Link>
            
            {user ? (
              <>
                {userRole === 'admin' && (
                  <Link to="/admin/dashboard" className="text-gray-300 hover:text-white transition">Admin</Link>
                )}
                <Link to="/apply" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition">Apply</Link>
                <button onClick={handleLogout} className="text-gray-300 hover:text-white transition">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition">Login</Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">Home</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">About</Link>
            <Link to="/schedule" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">Schedule</Link>
            <Link to="/sponsors" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">Sponsors</Link>
            <Link to="/faq" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">FAQ</Link>
            {user ? (
              <>
                {userRole === 'admin' && (
                  <Link to="/admin/dashboard" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">Admin</Link>
                )}
                <Link to="/apply" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">Apply</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
