import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/leaderboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      console.log('Error:', err);
    }
    setLoading(false);
  };

  const getRankIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getRankColor = (index) => {
    if (index === 0) return '#f59e0b';
    if (index === 1) return '#94a3b8';
    if (index === 2) return '#cd7c3f';
    return '#6366f1';
  };

  const getTier = (points) => {
    if (points >= 500) return { label: '💎 Diamond', color: '#06b6d4' };
    if (points >= 300) return { label: '🥇 Gold', color: '#f59e0b' };
    if (points >= 150) return { label: '🥈 Silver', color: '#94a3b8' };
    return { label: '🥉 Bronze', color: '#cd7c3f' };
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <div className="text-center">
        <div className="text-6xl mb-4">⏳</div>
        <p className="text-gray-400">Loading leaderboard...</p>
      </div>
    </div>
  );

  const myRank = leaderboard.findIndex(u => u.email === currentUser.email) + 1;

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-3">
            🏆 <span style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Leaderboard
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Top career builders on CareerAI</p>
        </motion.div>

        {/* Points System Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: '🗺️', label: 'Roadmap Generated', points: '+100 pts' },
            { icon: '📄', label: 'Resume Uploaded', points: '+50 pts' },
            { icon: '⭐', label: 'Resume Score', points: '+score pts' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-sm text-gray-300 mb-1">{item.label}</div>
              <div className="text-sm font-bold" style={{ color: '#f59e0b' }}>{item.points}</div>
            </div>
          ))}
        </motion.div>

        {/* My Rank Card */}
        {myRank > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-5 rounded-2xl mb-8 flex items-center gap-4"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(99,102,241,0.3)' }}
          >
            <div className="text-3xl font-bold" style={{ color: '#6366f1' }}>#{myRank}</div>
            <div className="flex-1">
              <p className="text-white font-semibold">Your Current Rank</p>
              <p className="text-gray-400 text-sm">
                Points: {leaderboard[myRank - 1]?.points || 0} •
                Tier: {getTier(leaderboard[myRank - 1]?.points || 0).label}
              </p>
            </div>
            <div className="text-2xl">🎯</div>
          </motion.div>
        )}

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-end justify-center gap-4 mb-10"
          >
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-2"
                style={{ background: 'linear-gradient(135deg, #94a3b8, #64748b)', border: '3px solid #94a3b8' }}>
                {getInitials(leaderboard[1]?.name)}
              </div>
              <p className="text-white text-sm font-medium mb-1">{leaderboard[1]?.name?.split(' ')[0]}</p>
              <p className="text-gray-400 text-xs mb-2">{leaderboard[1]?.points} pts</p>
              <div className="w-20 rounded-t-xl flex items-center justify-center text-2xl font-bold text-white"
                style={{ height: 80, background: 'linear-gradient(135deg, #94a3b8, #64748b)' }}>
                🥈
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-1">👑</div>
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold mb-2"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: '3px solid #f59e0b', boxShadow: '0 0 20px rgba(245,158,11,0.4)' }}>
                {getInitials(leaderboard[0]?.name)}
              </div>
              <p className="text-white font-semibold mb-1">{leaderboard[0]?.name?.split(' ')[0]}</p>
              <p className="text-yellow-400 text-sm mb-2">{leaderboard[0]?.points} pts</p>
              <div className="w-20 rounded-t-xl flex items-center justify-center text-2xl font-bold"
                style={{ height: 110, background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                🥇
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-2"
                style={{ background: 'linear-gradient(135deg, #cd7c3f, #a16207)', border: '3px solid #cd7c3f' }}>
                {getInitials(leaderboard[2]?.name)}
              </div>
              <p className="text-white text-sm font-medium mb-1">{leaderboard[2]?.name?.split(' ')[0]}</p>
              <p className="text-gray-400 text-xs mb-2">{leaderboard[2]?.points} pts</p>
              <div className="w-20 rounded-t-xl flex items-center justify-center text-2xl font-bold"
                style={{ height: 60, background: 'linear-gradient(135deg, #cd7c3f, #a16207)' }}>
                🥉
              </div>
            </div>
          </motion.div>
        )}

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h2 className="text-xl font-bold text-white mb-6">📋 Full Rankings</h2>

          {/* Table Header */}
          <div className="grid grid-cols-6 gap-3 px-4 py-2 mb-3 text-gray-500 text-sm font-medium">
            <span>Rank</span>
            <span className="col-span-2">User</span>
            <span>Roadmaps</span>
            <span>Resumes</span>
            <span>Points</span>
          </div>

          <div className="space-y-2">
            {leaderboard.map((user, i) => {
              const isMe = user.email === currentUser.email;
              const tier = getTier(user.points);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="grid grid-cols-6 gap-3 items-center p-4 rounded-2xl transition-all"
                  style={{
                    background: isMe
                      ? 'rgba(99,102,241,0.1)'
                      : 'rgba(255,255,255,0.02)',
                    border: isMe
                      ? '1px solid rgba(99,102,241,0.3)'
                      : '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  {/* Rank */}
                  <div className="text-2xl font-bold" style={{ color: getRankColor(i) }}>
                    {getRankIcon(i)}
                  </div>

                  {/* User */}
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${getRankColor(i)}, #8b5cf6)` }}>
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {user.name} {isMe && <span style={{ color: '#6366f1' }}>(You)</span>}
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${tier.color}20`, color: tier.color }}>
                        {tier.label}
                      </span>
                    </div>
                  </div>

                  {/* Roadmaps */}
                  <div className="text-center">
                    <div className="text-white font-bold">{user.roadmaps}</div>
                    <div className="text-gray-600 text-xs">maps</div>
                  </div>

                  {/* Resumes */}
                  <div className="text-center">
                    <div className="text-white font-bold">{user.resumes}</div>
                    <div className="text-gray-600 text-xs">resumes</div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className="font-bold" style={{ color: getRankColor(i) }}>
                      {user.points}
                    </div>
                    <div className="text-gray-600 text-xs">points</div>
                  </div>
                </motion.div>
              );
            })}

            {leaderboard.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-5xl mb-3">🏆</div>
                <p>No users yet! Be the first one!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage;