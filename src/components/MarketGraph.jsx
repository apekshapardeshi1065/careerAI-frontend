import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

const marketData = [
  { name: 'Frontend', demand: 85 },
  { name: 'Backend', demand: 78 },
  { name: 'Full Stack', demand: 95 },
  { name: 'AI/ML', demand: 92 },
  { name: 'DevOps', demand: 75 },
  { name: 'Mobile', demand: 70 },
];

const MarketGraph = ({ career }) => {
  const data = marketData.map(item => ({
    ...item,
    highlight: item.name.toLowerCase().includes(
      (career || '').toLowerCase().split(' ')[0]
    )
  }));

  return (
    <div style={{
      padding: 24,
      borderRadius: 24,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)'
    }}>
      <h2 style={{ color: 'white', fontWeight: 700, fontSize: 22, marginBottom: 20 }}>
        📊 Job Market Demand
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="barHighlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 12 }} />
          <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: '#1f2937',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: 12,
              color: '#fff'
            }}
            formatter={(value) => [`${value}%`, 'Demand']}
          />
          <Bar
            dataKey="demand"
            radius={[8, 8, 0, 0]}
            fill="url(#barGradient)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketGraph;