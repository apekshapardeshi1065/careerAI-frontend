import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const ResumePage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [pastResumes, setPastResumes] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPastResumes();
  }, []);

  const fetchPastResumes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/resume/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPastResumes(data.resumes || []);
    } catch (err) {
      console.log('Error fetching resumes');
    }
  };

  const handleUpload = async () => {
    if (!file) return setError('Please select a file first!');
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('resume', file);

      const res = await fetch('http://localhost:5000/api/resume/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setResult(data);
      fetchPastResumes();
    } catch (err) {
      setError('Upload failed: ' + err.message);
    }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 65) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return '🏆 Excellent!';
    if (score >= 65) return '👍 Good';
    return '⚠️ Needs Work';
  };

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-3">
            📄 AI <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Resume Scorer</span>
          </h1>
          <p className="text-gray-400 text-lg">Upload your resume and get instant AI-powered feedback!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Drag & Drop Box */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const dropped = e.dataTransfer.files[0];
                if (dropped) setFile(dropped);
              }}
              className="p-10 rounded-3xl text-center cursor-pointer mb-4 transition-all"
              style={{
                border: dragOver
                  ? '2px dashed #6366f1'
                  : file
                    ? '2px dashed #10b981'
                    : '2px dashed rgba(255,255,255,0.15)',
                background: dragOver
                  ? 'rgba(99,102,241,0.08)'
                  : 'rgba(255,255,255,0.02)'
              }}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <div className="text-5xl mb-4">
                {file ? '📄' : '☁️'}
              </div>
              <p className="text-white font-medium mb-2">
                {file ? file.name : 'Drag & Drop your Resume here'}
              </p>
              <p className="text-gray-500 text-sm">
                {file ? `Size: ${(file.size / 1024).toFixed(1)} KB` : 'or click to browse — PDF, DOC, DOCX'}
              </p>
              <input
                id="fileInput"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 rounded-lg text-red-400 text-sm"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                ⚠️ {error}
              </div>
            )}

            {/* Upload Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpload}
              disabled={loading || !file}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white"
              style={{
                background: !file
                  ? 'rgba(99,102,241,0.3)'
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: file ? '0 0 30px rgba(99,102,241,0.3)' : 'none',
                cursor: !file ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Analyzing Resume...' : '🚀 Analyze My Resume'}
            </motion.button>

            {/* Tips */}
            <div className="mt-6 p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-gray-300 font-medium mb-3">💡 Tips for better score:</h3>
              <ul className="space-y-2">
                {[
                  'Use clear section headings',
                  'Add quantifiable achievements',
                  'Include GitHub & LinkedIn links',
                  'Keep it to 1-2 pages',
                  'Use bullet points for experience'
                ].map((tip, i) => (
                  <li key={i} className="text-gray-500 text-sm flex items-center gap-2">
                    <span style={{ color: '#6366f1' }}>→</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Result Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {result ? (
              <div className="space-y-4">

                {/* Score Card */}
                <div className="p-8 rounded-3xl text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-gray-400 mb-3">Your Resume Score</p>

                  {/* Animated Score Circle */}
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <svg width="150" height="150">
                      <circle cx="75" cy="75" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                      <circle
                        cx="75" cy="75" r="60"
                        fill="none"
                        stroke={getScoreColor(result.score)}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 60}`}
                        strokeDashoffset={`${2 * Math.PI * 60 * (1 - result.score / 100)}`}
                        transform="rotate(-90 75 75)"
                        style={{ transition: 'stroke-dashoffset 1s ease' }}
                      />
                    </svg>
                    <div className="absolute text-center">
                      <div className="text-4xl font-bold" style={{ color: getScoreColor(result.score) }}>
                        {result.score}
                      </div>
                      <div className="text-gray-400 text-xs">/ 100</div>
                    </div>
                  </div>

                  <p className="text-xl font-bold" style={{ color: getScoreColor(result.score) }}>
                    {getScoreLabel(result.score)}
                  </p>
                </div>

                {/* Feedback */}
                <div className="p-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="font-semibold text-white mb-3">📋 AI Feedback</h3>
                  <ul className="space-y-2">
                    {result.feedback?.map((f, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-sm text-gray-300"
                      >
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="p-5 rounded-2xl"
                  style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
                  <h3 className="font-semibold text-white mb-3">🔧 Improvements Needed</h3>
                  <ul className="space-y-2">
                    {result.improvements?.map((imp, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-sm text-gray-400 flex items-center gap-2"
                      >
                        <span className="text-red-400">•</span> {imp}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Detected Skills */}
                <div className="p-5 rounded-2xl"
                  style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <h3 className="font-semibold text-white mb-3">🎯 Detected Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.skills?.map((skill, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-sm"
                        style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* Empty State */
              <div className="h-full flex flex-col items-center justify-center p-10 rounded-3xl text-center"
                style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.08)' }}>
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-white mb-2">Your Score Will Appear Here</h3>
                <p className="text-gray-500">Upload your resume to get instant AI feedback and score</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Past Resumes */}
        {pastResumes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">📁 Your Past Resumes</h2>
            <div className="space-y-3">
              {pastResumes.map((resume, i) => (
                <div key={i} className="p-4 rounded-2xl flex items-center justify-between"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">📄</div>
                    <div>
                      <p className="text-white font-medium">{resume.fileName}</p>
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
                    <div className="text-xs text-gray-500">{getScoreLabel(resume.score)}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumePage;