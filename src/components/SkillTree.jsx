import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SkillTree = ({ stages }) => {
  const [activeNode, setActiveNode] = useState(null);

  if (!stages || stages.length === 0) return null;

  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div style={{
      padding: 24,
      borderRadius: 24,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      marginBottom: 24
    }}>
      <h2 style={{ color: 'white', fontWeight: 700, fontSize: 22, marginBottom: 24 }}>
        🌳 Skill Tree
      </h2>

      {/* Tree Layout */}
      <div style={{ position: 'relative' }}>

        {/* Connecting Lines */}
        <div style={{
          position: 'absolute',
          top: 40,
          left: '12.5%',
          width: '75%',
          height: 3,
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #06b6d4)',
          borderRadius: 2,
          zIndex: 0
        }} />

        {/* Nodes */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 1
        }}>
          {stages.map((stage, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>

              {/* Node Circle */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveNode(activeNode === i ? null : i)}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: activeNode === i
                    ? `0 0 25px ${colors[i % colors.length]}80`
                    : `0 0 15px ${colors[i % colors.length]}40`,
                  border: activeNode === i
                    ? `3px solid white`
                    : `3px solid ${colors[i % colors.length]}60`,
                  transition: 'all 0.3s'
                }}
              >
                <span style={{ fontSize: 24 }}>
                  {i === 0 ? '🌱' : i === 1 ? '🚀' : i === 2 ? '⚡' : '🏆'}
                </span>
                <span style={{ color: 'white', fontSize: 10, fontWeight: 700, marginTop: 2 }}>
                  Stage {stage.stage}
                </span>
              </motion.div>

              {/* Stage Title */}
              <p style={{
                color: activeNode === i ? colors[i % colors.length] : '#9ca3af',
                fontSize: 13,
                fontWeight: 600,
                marginTop: 10,
                textAlign: 'center',
                transition: 'color 0.3s'
              }}>
                {stage.title}
              </p>

              <p style={{ color: '#6b7280', fontSize: 11, textAlign: 'center' }}>
                {stage.duration}
              </p>

              {/* Skills Popup */}
              {activeNode === i && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 12,
                    padding: '12px',
                    borderRadius: 12,
                    background: `${colors[i % colors.length]}15`,
                    border: `1px solid ${colors[i % colors.length]}40`,
                    maxWidth: 140
                  }}
                >
                  {stage.skills?.slice(0, 3).map((skill, j) => (
                    <div key={j} style={{
                      color: colors[i % colors.length],
                      fontSize: 11,
                      padding: '3px 0',
                      fontWeight: 500
                    }}>
                      • {skill}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{
        marginTop: 24,
        padding: '12px 16px',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.02)',
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap'
      }}>
        {stages.map((stage, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: colors[i % colors.length]
            }} />
            <span style={{ color: '#9ca3af', fontSize: 12 }}>{stage.title}</span>
          </div>
        ))}
      </div>

      <p style={{ color: '#6b7280', fontSize: 12, marginTop: 12, textAlign: 'center' }}>
        💡 Node pe click karo — skills dekhne ke liye!
      </p>
    </div>
  );
};

export default SkillTree;