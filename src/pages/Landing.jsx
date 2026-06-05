import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const stats = [
  { number: '50K+', label: 'Career Roadmaps Generated' },
  { number: '200+', label: 'Career Paths Available' },
  { number: '95%', label: 'Success Rate' },
  { number: '4.9★', label: 'User Rating' },
];

const features = [
  { icon: '🧠', title: 'AI-Powered Roadmap', desc: 'Get personalized career roadmap based on your skills and interests using advanced AI' },
  { icon: '🌳', title: 'Interactive Skill Tree', desc: 'Visualize your learning path with beautiful interactive skill tree diagrams' },
  { icon: '📊', title: 'Market Demand Graph', desc: 'See real-time job market demand for your chosen career path' },
  { icon: '🎯', title: 'Gap Analyzer', desc: 'Find skill gaps between your current level and market requirements' },
  { icon: '📄', title: 'Resume Scorer', desc: 'Upload your resume and get AI-powered score with improvement tips' },
  { icon: '🚀', title: 'Progress Tracker', desc: 'Track your learning progress and celebrate milestones' },
];

const Landing = () => {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8' }}>
            🚀 AI-Powered Career Guidance Platform
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your AI Career
            <br />
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Roadmap Generator
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Enter your skills and interests — our AI creates a personalized career roadmap, skill tree, and market analysis just for you!
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl text-lg font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>
                Generate My Roadmap 🚀
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl text-lg font-semibold"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                Login
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 w-full max-w-4xl"
        >
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-3xl font-bold mb-1"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-gray-400 text-lg">Powerful features to guide your career journey</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto p-12 rounded-3xl"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(99,102,241,0.3)' }}
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-400 text-lg mb-8">Join thousands of students who found their dream career with CareerAI</p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-xl text-lg font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>
              Get Started Free 🚀
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <p>© 2026 CareerAI. Developed with ❤️ by Apeksha </p>
      </footer>
    </div>
  );
};

export default Landing;

