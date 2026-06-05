import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
// import { generateRoadmap } from '../utils/api';

const skillOptions = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++',
  'HTML/CSS', 'SQL', 'MongoDB', 'Git', 'Docker', 'AWS',
  'Machine Learning', 'Data Analysis', 'UI/UX Design', 'PHP'
];

const careerOptions = [
  'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
  'Data Scientist', 'AI/ML Engineer', 'DevOps Engineer',
  'Mobile App Developer', 'Cybersecurity Expert', 'Cloud Engineer',
  'UI/UX Designer'
];

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [interest, setInterest] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleGenerate = async () => {
  if (selectedSkills.length === 0) return setError('Please select at least one skill!');
  if (!interest) return setError('Please select a career interest!');
  if (!experience) return setError('Please select experience level!');

  setLoading(true);
  setError('');
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('https://careerai-backend-2umd.onrender.com/api/roadmap/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        skills: selectedSkills,
        interest,
        experience
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed');
    }

    localStorage.setItem('roadmapData', JSON.stringify(data.roadmap));
    navigate('/roadmap');
  } catch (err) {
    console.error('Error:', err);
    setError('Failed to generate roadmap: ' + err.message);
  }
  setLoading(false);
};

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user.name || 'User'}! 👋</span>
          </h1>
          <p className="text-gray-400 text-lg">Let's generate your personalized AI career roadmap</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: '🗺️', label: 'Roadmaps Generated', value: '0' },
            { icon: '🎯', label: 'Skills Selected', value: selectedSkills.length },
            { icon: '📈', label: 'Career Paths', value: '200+' },
          ].map((stat, i) => (
            <div key={i} className="p-5 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold" style={{ color: '#6366f1' }}>{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h2 className="text-2xl font-bold mb-6">🧠 Generate Your Career Roadmap</h2>

          {/* Skills */}
          <div className="mb-6">
            <label className="text-gray-300 font-medium mb-3 block">
              1. Select Your Current Skills
              <span className="text-gray-500 text-sm ml-2">({selectedSkills.length} selected)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(skill => (
                <motion.button
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSkill(skill)}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: selectedSkills.includes(skill)
                      ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                      : 'rgba(255,255,255,0.05)',
                    border: selectedSkills.includes(skill)
                      ? '1px solid #6366f1'
                      : '1px solid rgba(255,255,255,0.1)',
                    color: selectedSkills.includes(skill) ? '#fff' : '#9ca3af'
                  }}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Career Interest */}
          <div className="mb-6">
            <label className="text-gray-300 font-medium mb-3 block">
              2. Select Career Interest
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {careerOptions.map(career => (
                <motion.button
                  key={career}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setInterest(career)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-left transition-all"
                  style={{
                    background: interest === career
                      ? 'rgba(99,102,241,0.2)'
                      : 'rgba(255,255,255,0.03)',
                    border: interest === career
                      ? '1px solid #6366f1'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: interest === career ? '#818cf8' : '#9ca3af'
                  }}
                >
                  {career}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <label className="text-gray-300 font-medium mb-3 block">
              3. Select Experience Level
            </label>
            <div className="flex gap-3">
              {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                <motion.button
                  key={level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExperience(level)}
                  className="flex-1 py-3 rounded-xl font-medium transition-all"
                  style={{
                    background: experience === level
                      ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                      : 'rgba(255,255,255,0.05)',
                    border: experience === level
                      ? '1px solid #6366f1'
                      : '1px solid rgba(255,255,255,0.1)',
                    color: experience === level ? '#fff' : '#9ca3af'
                  }}
                >
                  {level === 'Beginner' ? '🌱' : level === 'Intermediate' ? '🚀' : '⚡'} {level}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-lg text-red-400 text-sm"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-lg text-white"
            style={{
              background: loading
                ? 'rgba(99,102,241,0.5)'
                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: loading ? 'none' : '0 0 30px rgba(99,102,241,0.4)'
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="animate-spin">⏳</span>
                AI is generating your roadmap...
              </span>
            ) : (
              '🚀 Generate My Career Roadmap'
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;