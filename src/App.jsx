import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import Landing from './pages/Landing';
import About from './pages/About';
import Schedule from './pages/Schedule';
import Sponsors from './pages/Sponsors';
import FAQ from './pages/FAQ';
import Apply from './pages/Apply';
import Login from './pages/Login';
import DebugAdmin from './pages/DebugAdmin';

// Admin Pages
import Dashboard from './admin/Dashboard';
import Applications from './admin/Applications';
import ApplicationDetail from './admin/ApplicationDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="/debug-admin" element={<DebugAdmin />} />
              
              {/* Protected Routes */}
              <Route
                path="/apply"
                element={
                  <ProtectedRoute>
                    <Apply />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/applications"
                element={
                  <ProtectedRoute adminOnly>
                    <Applications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/applications/:id"
                element={
                  <ProtectedRoute adminOnly>
                    <ApplicationDetail />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1F2937',
              color: '#F3F4F6',
              border: '1px solid #374151',
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
