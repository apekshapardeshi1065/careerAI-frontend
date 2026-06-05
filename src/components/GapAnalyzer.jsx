import React from 'react';
import { motion } from 'framer-motion';

const GapAnalyzer = ({ userSkills, stages }) => {
  const marketSkills = stages?.flatMap(s => s.skills || []) || [];
  const uniqueMarketSkills = [...new Set(marketSkills)];

  const userSkillsLower = (userSkills || []).map(s => s.toLowerCase());

  const analysis = uniqueMarketSkills.slice(0, 8).map(skill => ({
    skill,
    hasIt: userSkillsLower.some(us =>
      us.includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(us)
    )
  }));

  const score = Math.round((analysis.filter(a => a.hasIt).length / analysis.length) * 100);

  return (
    <div style={{
      padding: 24,
      borderRadius: 24,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      marginBottom: 24
    }}>
      <h2 style={{ color: 'white', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>
        🎯 Skill Gap Analyzer
      </h2>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>
        Your skills vs Market requirements
      </p>

      {/* Score */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        marginBottom: 24,
        padding: 16,
        borderRadius: 16,
        background: 'rgba(99,102,241,0.08)',
        border: '1px solid rgba(99,102,241,0.2)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: 40, fontWeight: 800,
            color: score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444'
          }}>
            {score}%
          </div>
          <div style={{ color: '#6b7280', fontSize: 12 }}>Match Score</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'white', fontWeight: 600, marginBottom: 6 }}>
            {score >= 70 ? '🏆 Excellent Match!' : score >= 40 ? '👍 Good Progress!' : '📚 Keep Learning!'}
          </div>
          <div style={{
            height: 8, borderRadius: 4,
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden'
          }}>
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
        </div>
      </div>

      {/* Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {analysis.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 12,
              background: item.hasIt
                ? 'rgba(16,185,129,0.08)'
                : 'rgba(239,68,68,0.08)',
              border: `1px solid ${item.hasIt
                ? 'rgba(16,185,129,0.2)'
                : 'rgba(239,68,68,0.15)'}`
            }}
          >
            <span style={{ fontSize: 18 }}>
              {item.hasIt ? '✅' : '❌'}
            </span>
            <span style={{
              color: item.hasIt ? '#10b981' : '#9ca3af',
              fontSize: 13,
              fontWeight: 500
            }}>
              {item.skill}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GapAnalyzer;