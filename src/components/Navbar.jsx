
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_EMAIL = 'apeksha@gmail.com'; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = user?.email === ADMIN_EMAIL;
  const isActive = (path) => location.pathname === path;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    setMenuOpen(false);
  };

  const navLinks = [
    { path: '/profile', icon: '👤', label: 'Profile' },
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/resume', icon: '📄', label: 'Resume' },
    { path: '/leaderboard', icon: '🏆', label: 'Leaderboard' },
    ...(isAdmin ? [{ path: '/admin', icon: '🛡️', label: 'Admin' }] : []),
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          padding: '14px 24px',
          background: 'rgba(10,10,15,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(99,102,241,0.2)',
          boxSizing: 'border-box'
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <img src="/ai.png" alt="CareerAI"
              style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'contain' }} />
            <span style={{
              fontSize: 20, fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>CareerAI</span>
          </Link>

          {/* Right Side — Only Avatar + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

            {/* Profile Avatar */}
            {token && (
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: 14
                  }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span style={{ color: 'white', fontSize: 14, fontWeight: 500 }}>
                    {user?.name?.split(' ')[0]}
                  </span>
                </div>
              </Link>
            )}

            {/* Login/Register buttons */}
            {!token && (
              <div style={{ display: 'flex', gap: 8 }}>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '8px 16px', borderRadius: 12, color: '#9ca3af', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>🔐</span><span>Login</span>
                  </div>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '8px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>🚀</span><span>Get Started</span>
                  </div>
                </Link>
              </div>
            )}

            {/* ☰ Hamburger — HAMESHA DIKHEGA */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
                width: 44,
                height: 44,
                borderRadius: 12,
                background: menuOpen ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.35)',
                cursor: 'pointer',
                flexShrink: 0,
                outline: 'none'
              }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'block', width: 18, height: 2.5, background: '#a5b4fc', borderRadius: 2 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'block', width: 18, height: 2.5, background: '#a5b4fc', borderRadius: 2 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'block', width: 18, height: 2.5, background: '#a5b4fc', borderRadius: 2 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 30,
                background: 'rgba(0,0,0,0.6)'
              }}
            />

            {/* Dropdown Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
              style={{
                position: 'fixed',
                top: 72,
                right: 16,
                zIndex: 40,
                width: 290,
                borderRadius: 20,
                overflow: 'hidden',
                background: 'rgba(12,12,22,0.99)',
                border: '1px solid rgba(99,102,241,0.3)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.1)'
              }}
            >
              {token ? (
                <>
                  {/* User Info */}
                  <div style={{
                    padding: '18px 20px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'rgba(99,102,241,0.08)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, fontWeight: 700, color: 'white', flexShrink: 0,
                      boxShadow: '0 0 20px rgba(99,102,241,0.4)'
                    }}>
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p style={{ color: 'white', fontWeight: 600, margin: 0, fontSize: 15 }}>{user?.name}</p>
                      <p style={{ color: '#6b7280', fontSize: 12, margin: '2px 0 0' }}>{user?.email}</p>
                      {isAdmin && (
                        <span style={{
                          fontSize: 11, padding: '2px 8px', borderRadius: 20,
                          background: 'rgba(99,102,241,0.2)', color: '#818cf8',
                          marginTop: 4, display: 'inline-block'
                        }}>🛡️ Admin</span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <div style={{ padding: '8px 0' }}>
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 14,
                            padding: '13px 20px', textDecoration: 'none',
                            background: isActive(link.path) ? 'rgba(99,102,241,0.12)' : 'transparent',
                            color: isActive(link.path) ? '#a5b4fc' : '#d1d5db',
                            borderLeft: isActive(link.path) ? '3px solid #6366f1' : '3px solid transparent',
                          }}
                        >
                          <span style={{ fontSize: 22 }}>{link.icon}</span>
                          <span style={{ fontWeight: 500, fontSize: 15 }}>{link.label}</span>
                          {isActive(link.path) && (
                            <span style={{ marginLeft: 'auto', color: '#6366f1', fontSize: 8 }}>●</span>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Logout */}
                  <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button onClick={logout} style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: 8, padding: '12px',
                      borderRadius: 12, background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)', color: '#f87171',
                      fontWeight: 500, fontSize: 14, cursor: 'pointer'
                    }}>
                      <span>🚪</span><span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Link to="/login" onClick={() => setMenuOpen(false)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 8, padding: '12px', borderRadius: 12,
                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                    color: '#818cf8', textDecoration: 'none', fontWeight: 500
                  }}>
                    <span>🔐</span><span>Login</span>
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 8, padding: '12px', borderRadius: 12,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white', textDecoration: 'none', fontWeight: 600
                  }}>
                    <span>🚀</span><span>Get Started</span>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;