import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';

import SkillTree from '../components/SkillTree';
import MarketGraph from '../components/MarketGraph';
import GapAnalyzer from '../components/GapAnalyzer';

const marketData = [
  { name: 'Frontend', demand: 85 },
  { name: 'Backend', demand: 78 },
  { name: 'Full Stack', demand: 95 },
  { name: 'AI/ML', demand: 92 },
  { name: 'DevOps', demand: 75 },
  { name: 'Mobile', demand: 70 },
];

const RoadmapPage = () => {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('roadmapData');
    if (!data) { navigate('/dashboard'); return; }
    setRoadmap(JSON.parse(data));
  }, [navigate]);

  if (!roadmap) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <div className="text-center">
        <div className="text-6xl mb-4 animate-spin">⏳</div>
        <p className="text-gray-400">Loading your roadmap...</p>
      </div>
    </div>
  );
  

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8' }}>
            🎯 Your Personalized Career Roadmap
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {roadmap.careerTitle}
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Total Duration: {roadmap.totalDuration}</p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {[
            { icon: '💰', label: 'Average Salary', value: roadmap.averageSalary },
            { icon: '📈', label: 'Market Demand', value: roadmap.marketDemand },
            { icon: '⏱️', label: 'Total Duration', value: roadmap.totalDuration },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className="text-xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-gray-400 text-sm">{card.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Roadmap Stages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">🗺️ Your Learning Roadmap</h2>
          <SkillTree stages={roadmap.stages} />
<MarketGraph career={roadmap.careerTitle} />
<GapAnalyzer
  userSkills={JSON.parse(localStorage.getItem('userSkills') || '[]')}
  stages={roadmap.stages}
/>

          {/* Stage Navigation */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {roadmap.stages?.map((stage, i) => (
              <button
                key={i}
                onClick={() => setActiveStage(i)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: activeStage === i
                    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                    : 'rgba(255,255,255,0.05)',
                  border: activeStage === i
                    ? '1px solid #6366f1'
                    : '1px solid rgba(255,255,255,0.1)',
                  color: activeStage === i ? '#fff' : '#9ca3af'
                }}
              >
                Stage {stage.stage}
              </button>
            ))}
          </div>

          {/* Active Stage Detail */}
          {roadmap.stages?.[activeStage] && (
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 rounded-3xl"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Stage {roadmap.stages[activeStage].stage}: {roadmap.stages[activeStage].title}
                  </h3>
                  <p className="text-gray-400">⏱️ Duration: {roadmap.stages[activeStage].duration}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                  style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}>
                  {roadmap.stages[activeStage].status}
                </span>
              </div>

              {/* Skills to Learn */}
              <div className="mb-6">
                <h4 className="text-gray-300 font-medium mb-3">🎯 Skills to Learn:</h4>
                <div className="flex flex-wrap gap-2">
                  {roadmap.stages[activeStage].skills?.map((skill, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: j * 0.05 }}
                      className="px-3 py-1 rounded-lg text-sm"
                      style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-gray-300 font-medium mb-3">📚 Learning Resources:</h4>
                <div className="flex flex-wrap gap-2">
                  {roadmap.stages[activeStage].resources?.map((res, j) => (
                    <span key={j} className="px-3 py-1 rounded-lg text-sm"
                      style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                      📖 {res}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* All Stages Timeline */}
          <div className="mt-8 space-y-4">
            {roadmap.stages?.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveStage(i)}
                className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all"
                style={{
                  background: activeStage === i ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)',
                  border: activeStage === i ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  {stage.stage}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{stage.title}</h4>
                  <p className="text-gray-400 text-sm">{stage.duration} • {stage.skills?.slice(0, 3).join(', ')}</p>
                </div>
                <span className="text-gray-500 text-sm">{stage.status}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Job Roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 p-8 rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h2 className="text-2xl font-bold mb-6">💼 Job Roles You Can Apply For</h2>
          <div className="flex flex-wrap gap-3">
            {roadmap.jobRoles?.map((role, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 rounded-xl font-medium"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8' }}
              >
                {role}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Market Demand Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 p-8 rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h2 className="text-2xl font-bold mb-6">📊 Job Market Demand</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ background: '#1f2937', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 12, color: '#fff' }}
              />
              <Bar dataKey="demand" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Back Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 rounded-xl font-medium"
            style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8' }}
          >
            ← Generate New Roadmap
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;