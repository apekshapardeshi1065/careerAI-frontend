import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const AdminPage = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, usersRes, activitiesRes] = await Promise.all([
        fetch('https://careerai-backend-2umd.onrender.com/api/admin/stats', { headers }),
        fetch('https://careerai-backend-2umd.onrender.com/api/admin/users', { headers }),
        fetch('https://careerai-backend-2umd.onrender.com/api/admin/activities', { headers })
      ]);

      const statsData = await statsRes.json();
      const usersData = await usersRes.json();
      const activitiesData = await activitiesRes.json();

      setStats(statsData);
      setUsers(usersData.users || []);
      setActivities(activitiesData.activities || []);
    } catch (err) {
      console.log('Error:', err);
    }
    setLoading(false);
  };

  const getActionColor = (action) => {
    switch(action) {
      case 'REGISTER': return '#10b981';
      case 'LOGIN': return '#6366f1';
      case 'ROADMAP_GENERATED': return '#8b5cf6';
      case 'RESUME_UPLOADED': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getActionIcon = (action) => {
    switch(action) {
      case 'REGISTER': return '🆕';
      case 'LOGIN': return '🔐';
      case 'ROADMAP_GENERATED': return '🗺️';
      case 'RESUME_UPLOADED': return '📄';
      default: return '📌';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
      <div className="text-center">
        <div className="text-6xl mb-4">⏳</div>
        <p className="text-gray-400">Loading admin data...</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-2">
            🛡️ <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Admin Dashboard
            </span>
          </h1>
          <p className="text-gray-400">Monitor all users, activities and platform stats</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {[
            { icon: '👥', label: 'Total Users', value: stats?.totalUsers || 0, color: '#6366f1' },
            { icon: '🗺️', label: 'Roadmaps Generated', value: stats?.totalRoadmaps || 0, color: '#8b5cf6' },
            { icon: '📄', label: 'Resumes Uploaded', value: stats?.totalResumes || 0, color: '#10b981' },
            { icon: '📊', label: 'Total Activities', value: activities.length || 0, color: '#f59e0b' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${stat.color}30` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'users', label: '👥 All Users' },
            { id: 'activity', label: '📋 Activity Log' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: activeTab === tab.id
                  ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.id ? '#fff' : '#9ca3af',
                border: activeTab === tab.id
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.08)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Recent Users */}
            <div className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-xl font-bold text-white mb-5">🆕 Recent Users</h3>
              <div className="space-y-3">
                {stats?.recentUsers?.map((user, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{user.name}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </div>
                    <p className="text-gray-600 text-xs">
                      {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-xl font-bold text-white mb-5">⚡ Recent Activities</h3>
              <div className="space-y-3">
                {stats?.recentActivities?.map((act, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <span className="text-xl">{getActionIcon(act.action)}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{act.userName}</p>
                      <p className="text-gray-500 text-xs">{act.details}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{ background: `${getActionColor(act.action)}20`, color: getActionColor(act.action) }}>
                      {act.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-xl font-bold text-white mb-5">
                👥 All Users ({users.length})
              </h3>

              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 px-4 py-2 mb-3 text-gray-500 text-sm font-medium">
                <span>Name</span>
                <span>Email</span>
                <span>Joined</span>
                <span>Status</span>
              </div>

              <div className="space-y-2">
                {users.map((user, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="grid grid-cols-4 gap-4 items-center p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white text-sm font-medium truncate">{user.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm truncate">{user.email}</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium w-fit"
                      style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                      ✅ Active
                    </span>
                  </motion.div>
                ))}

                {users.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    No users registered yet!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Activity Log Tab */}
        {activeTab === 'activity' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-xl font-bold text-white mb-5">
                📋 Full Activity Log ({activities.length})
              </h3>

              <div className="space-y-2">
                {activities.map((act, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <span className="text-2xl">{getActionIcon(act.action)}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium text-sm">{act.userName}</span>
                        <span className="text-gray-600 text-xs">•</span>
                        <span className="text-gray-500 text-xs">{act.userEmail}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{act.details}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs px-2 py-1 rounded-full block mb-1"
                        style={{ background: `${getActionColor(act.action)}15`, color: getActionColor(act.action) }}>
                        {act.action}
                      </span>
                      <p className="text-gray-600 text-xs">
                        {new Date(act.timestamp).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {activities.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    No activities yet!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;