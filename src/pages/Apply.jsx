import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import { FadeIn, ScaleIn } from '../components/AnimatedSection';

const Apply = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    college: '',
    degree: '',
    graduationYear: '',
    teamName: '',
    teamSize: '1',
    skills: [],
    github: '',
    linkedIn: '',
    whyParticipate: '',
    mlhAccepted: false
  });

  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js',
    'Machine Learning', 'AI', 'Blockchain', 'Mobile Development',
    'UI/UX Design', 'DevOps', 'Cloud Computing', 'Cybersecurity'
  ];

  useEffect(() => {
    checkExistingApplication();
  }, [user]);

  const checkExistingApplication = async () => {
    if (!user) return;
    
    try {
      const q = query(collection(db, 'applications'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setHasApplied(true);
        toast.error('You have already submitted an application');
      }
    } catch (error) {
      console.error('Error checking application:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSkillToggle = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.includes(skill)
        ? formData.skills.filter(s => s !== skill)
        : [...formData.skills, skill]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }

    if (hasApplied) {
      toast.error('You have already submitted an application');
      return;
    }

    if (!formData.mlhAccepted) {
      toast.error('Please accept the MLH Code of Conduct');
      return;
    }

    if (formData.skills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }

    setLoading(true);

    try {
      // Save application
      await addDoc(collection(db, 'applications'), {
        userId: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        degree: formData.degree,
        graduationYear: formData.graduationYear,
        teamName: formData.teamName,
        teamSize: parseInt(formData.teamSize),
        skills: formData.skills,
        github: formData.github,
        linkedIn: formData.linkedIn,
        whyParticipate: formData.whyParticipate,
        mlhAccepted: formData.mlhAccepted,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      toast.success('Application submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Please login to apply</h2>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (hasApplied) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">You have already applied!</h2>
          <p className="text-gray-400 mb-6">We'll review your application and get back to you soon.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn delay={0.1}>
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            Apply for <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">BVRIT Hackathon 2026</span>
          </h1>
          <p className="text-gray-400 text-center mb-8">Fill out the form below to register</p>
        </FadeIn>

        <ScaleIn delay={0.2}>
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 border border-gray-700 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">College *</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Degree *</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="e.g., B.Tech CSE"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Graduation Year *</label>
              <input
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                min="2024"
                max="2030"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Team Name *</label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Team Size *</label>
              <select
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                required
              >
                <option value="1">1 (Solo)</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Skills * (Select all that apply)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillOptions.map((skill) => (
                <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="w-4 h-4 text-primary bg-gray-900 border-gray-700 rounded focus:ring-primary"
                  />
                  <span className="text-gray-300 text-sm">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">GitHub Profile *</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">LinkedIn Profile (Optional)</label>
            <input
              type="url"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Why do you want to participate? *</label>
            <textarea
              name="whyParticipate"
              value={formData.whyParticipate}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="mlhAccepted"
              checked={formData.mlhAccepted}
              onChange={handleChange}
              className="w-5 h-5 mt-1 text-primary bg-gray-900 border-gray-700 rounded focus:ring-primary"
              required
            />
            <label className="text-gray-300 text-sm">
              I have read and agree to the{' '}
              <a
                href="https://mlh.io/code-of-conduct"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                MLH Code of Conduct
              </a>
              . *
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
          </form>
        </ScaleIn>
      </div>
    </div>
  );
};

export default Apply;
