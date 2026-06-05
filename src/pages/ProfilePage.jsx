import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [roadmapRes, resumeRes] = await Promise.all([
        fetch('https://careerai-backend-2umd.onrender.com/api/roadmap/my', { headers }),
        fetch('https://careerai-backend-2umd.onrender.com/api/resume/my', { headers })
      ]);

      const roadmapData = await roadmapRes.json();
      const resumeData = await resumeRes.json();

      setRoadmaps(roadmapData.roadmaps || []);
      setResumes(resumeData.resumes || []);
    } catch (err) {
      console.log('Error fetching data');
    }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 65) return '#f59e0b';
    return '#ef4444';
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <div className="text-center">
        <div className="text-6xl mb-4 animate-spin">⏳</div>
        <p className="text-gray-400">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl mb-8 flex items-center gap-8"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(99,102,241,0.3)' }}
        >
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>
            {getInitials(user?.name)}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-1">{user?.name}</h1>
            <p className="text-gray-400 mb-3">📧 {user?.email}</p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}>
                🚀 Active User
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>
                ✅ Verified
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 flex-shrink-0">
            {[
              { label: 'Roadmaps', value: roadmaps.length, icon: '🗺️' },
              { label: 'Resumes', value: resumes.length, icon: '📄' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {[
            { icon: '🗺️', label: 'Total Roadmaps', value: roadmaps.length, color: '#6366f1' },
            { icon: '📄', label: 'Resumes Uploaded', value: resumes.length, color: '#8b5cf6' },
            { icon: '⭐', label: 'Best Resume Score', value: resumes.length > 0 ? Math.max(...resumes.map(r => r.score)) + '/100' : 'N/A', color: '#10b981' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* My Roadmaps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-5">🗺️ My Career Roadmaps</h2>
          {roadmaps.length === 0 ? (
            <div className="p-8 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.08)' }}>
              <div className="text-4xl mb-3">🗺️</div>
              <p className="text-gray-400">No roadmaps generated yet!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {roadmaps.map((roadmap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="p-5 rounded-2xl flex items-center justify-between"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                      🎯
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{roadmap.interest}</h3>
                      <p className="text-gray-500 text-sm">
                        Skills: {roadmap.skills?.slice(0, 3).join(', ')}
                        {roadmap.skills?.length > 3 ? ` +${roadmap.skills.length - 3} more` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs capitalize"
                      style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>
                      {roadmap.experience}
                    </span>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(roadmap.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* My Resumes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-5">📄 My Resume History</h2>
          {resumes.length === 0 ? (
            <div className="p-8 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.08)' }}>
              <div className="text-4xl mb-3">📄</div>
              <p className="text-gray-400">No resumes uploaded yet!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {resumes.map((resume, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl flex items-center justify-between"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: 'rgba(99,102,241,0.2)' }}>
                      📄
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{resume.fileName}</h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(resume.uploadedAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold"
                      style={{ color: getScoreColor(resume.score) }}>
                      {resume.score}/100
                    </div>
                    <div className="text-xs text-gray-500">
                      {resume.score >= 80 ? '🏆 Excellent' : resume.score >= 65 ? '👍 Good' : '⚠️ Needs Work'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default ProfilePage;