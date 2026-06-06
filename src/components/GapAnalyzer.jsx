import React from 'react';
import { motion } from 'framer-motion';

const GapAnalyzer = ({ stages }) => {
 
  const userSkills = JSON.parse(localStorage.getItem('userSkills') || '[]');
  const userSkillsLower = userSkills.map(s => s.toLowerCase());

  const marketSkills = stages?.flatMap(s => s.skills || []) || [];
  const uniqueMarketSkills = [...new Set(marketSkills)].slice(0, 8);

  const analysis = uniqueMarketSkills.map(skill => {
    const skillLower = skill.toLowerCase();
    const hasIt = userSkillsLower.some(us =>
      us.includes(skillLower) ||
      skillLower.includes(us) ||
      us.split('.')[0] === skillLower.split('.')[0]
    );
    return { skill, hasIt };
  });

  const matched = analysis.filter(a => a.hasIt).length;
  const score = analysis.length > 0
    ? Math.round((matched / analysis.length) * 100)
    : 0;

  const getScoreColor = () => {
    if (score >= 70) return '#10b981';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = () => {
    if (score >= 70) return '🏆 Excellent Match!';
    if (score >= 40) return '👍 Good Progress!';
    return '📚 Keep Learning!';
  };

  return (
    <div style={{
      padding: 24, borderRadius: 24, marginBottom: 24,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)'
    }}>
      <h2 style={{ color: 'white', fontWeight: 700, fontSize: 22, marginBottom: 4 }}>
        🎯 Skill Gap Analyzer
      </h2>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>
        Your skills vs Market requirements
      </p>

      {/* Score Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20,
        marginBottom: 24, padding: 16, borderRadius: 16,
        background: 'rgba(99,102,241,0.08)',
        border: '1px solid rgba(99,102,241,0.2)'
      }}>
        <div style={{ textAlign: 'center', minWidth: 70 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: getScoreColor() }}>
            {score}%
          </div>
          <div style={{ color: '#6b7280', fontSize: 11 }}>Match Score</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'white', fontWeight: 600, marginBottom: 8 }}>
            {getScoreLabel()}
          </div>
          <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1.5 }}
              style={{
                height: '100%', borderRadius: 4,
                background: score >= 70
                  ? 'linear-gradient(90deg, #10b981, #06b6d4)'
                  : score >= 40
                    ? 'linear-gradient(90deg, #f59e0b, #ec4899)'
                    : 'linear-gradient(90deg, #ef4444, #f59e0b)'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ color: '#6b7280', fontSize: 11 }}>
              {matched} / {analysis.length} skills matched
            </span>
            <span style={{ color: '#6b7280', fontSize: 11 }}>
              Your skills: {userSkills.length}
            </span>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      {userSkills.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 20 }}>
          <p style={{ color: '#6b7280' }}>
            ⚠️ Dashboard se skills select karke roadmap generate karo!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {analysis.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 12,
                background: item.hasIt ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                border: `1px solid ${item.hasIt ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.15)'}`
              }}
            >
              <span style={{ fontSize: 18 }}>{item.hasIt ? '✅' : '❌'}</span>
              <span style={{
                color: item.hasIt ? '#10b981' : '#9ca3af',
                fontSize: 13, fontWeight: 500
              }}>
                {item.skill}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GapAnalyzer;