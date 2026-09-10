'use client';

import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import AuthModal from '@/components/AuthModal';
import OnboardingModal from '@/components/OnboardingModal';

const MODULES = [
  { num: '01', emoji: '🖥️', title: 'How Software Works', desc: 'Frontend, backend, database — how they connect' },
  { num: '02', emoji: '🔌', title: 'APIs & How Systems Talk', desc: 'REST, HTTP methods, status codes' },
  { num: '03', emoji: '🏗️', title: 'Architecture & Scale', desc: 'Monoliths, microservices, caching, CDNs' },
  { num: '04', emoji: '🎨', title: 'Design Systems & UI', desc: 'Components, tokens, Server-Driven UI' },
  { num: '05', emoji: '⚡', title: 'Performance & Loading', desc: 'LCP, TTI, CLS and lazy loading' },
  { num: '06', emoji: '🔄', title: 'State Management', desc: 'Local vs global state, optimistic UI' },
  { num: '07', emoji: '📦', title: 'Versioning & APIs', desc: 'Semver, breaking changes, deprecation' },
  { num: '08', emoji: '🔒', title: 'Auth & Security', desc: 'OAuth, JWT, HTTPS, data privacy' },
  { num: '09', emoji: '🚀', title: 'DevOps & Deployment', desc: 'CI/CD, rollbacks, feature flags' },
  { num: '10', emoji: '📊', title: 'Technical Metrics', desc: 'Uptime, latency percentiles, cycle time' },
];

function HomeContent() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const waveRef = useRef<SVGSVGElement>(null);
  const [waveSize, setWaveSize] = useState({ w: 1440, h: 700 });

  useEffect(() => {
    function measureWave() {
      const el = waveRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width && rect.height) {
        setWaveSize({ w: rect.width, h: rect.height });
      }
    }
    measureWave();
    window.addEventListener('resize', measureWave);
    return () => window.removeEventListener('resize', measureWave);
  }, []);

  // Wave path control points as fractions of the SVG's own pixel box, so the
  // ribbon's proportions never distort or over-crop regardless of viewport
  // aspect ratio — viewBox is set to match the real rendered size 1:1.
  const { w: waveW, h: waveH } = waveSize;
  // Single, deep cubic arc per path (not a full S) — the amplitude is deliberately
  // large relative to stroke width + blur so the curve reads as a wave, not a
  // straight glowing beam once blurred.
  const wavePath1 = `M ${-0.2 * waveW} ${0.22 * waveH} C ${0.22 * waveW} ${0.88 * waveH}, ${0.58 * waveW} ${0.88 * waveH}, ${1.2 * waveW} ${0.15 * waveH}`;
  const wavePath2 = `M ${-0.2 * waveW} ${0.78 * waveH} C ${0.32 * waveW} ${0.12 * waveH}, ${0.62 * waveW} ${0.12 * waveH}, ${1.2 * waveW} ${0.85 * waveH}`;

  function handleHeroMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroMouse({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }

  function handleHeroMouseLeave() {
    setHeroMouse({ x: 0, y: 0 });
  }

  function handleStart() {
    if (loading) return;
    if (user) {
      handleProceed();
    } else {
      setAuthOpen(true);
    }
  }

  function handleProceed() {
    setAuthOpen(false);
    const uid = user?.uid ?? 'guest';
    const done = typeof window !== 'undefined' && localStorage.getItem(`onboardingCompleted_${uid}`);
    if (done) {
      router.push('/module/1');
    } else {
      setOnboardingOpen(true);
    }
  }

  function handleOnboardingDone() {
    setOnboardingOpen(false);
    router.push('/module/1');
  }

  return (
    <div className="home-page" onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave}>

      {/* Starfield — fixed layer, spans the whole page behind every section */}
      <div
        className="hp-stars-layer"
        style={{ transform: `translate3d(${heroMouse.x * 22}px, ${heroMouse.y * 16}px, 0)` }}
      >
        <svg className="hp-grain-bg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <filter id="hpGrainNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" stitchTiles="stitch" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 9 -7.2"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#hpGrainNoise)" />
        </svg>
      </div>

      {/* ── Hero ── */}
      <div className="hp-hero">

        {/* Animated wave background — parallax layer (moves opposite to cursor, deeper) */}
        <div
          className="hp-parallax-layer"
          style={{ transform: `translate3d(${heroMouse.x * -28}px, ${heroMouse.y * -20}px, 0)` }}
        >
          <svg
            ref={waveRef}
            className="hp-wave-bg"
            viewBox={`0 0 ${waveW} ${waveH}`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter id="waveBlur1" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="20" />
              </filter>
              <filter id="waveBlur2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="26" />
              </filter>
            </defs>
            <path
              className="hp-wave-path hp-wave-path-1"
              d={wavePath1}
              stroke="var(--glass-glow)"
              strokeOpacity="0.85"
              strokeWidth="80"
              fill="none"
              filter="url(#waveBlur1)"
            />
            <path
              className="hp-wave-path hp-wave-path-2"
              d={wavePath2}
              stroke="var(--glass-glow-soft)"
              strokeOpacity="0.75"
              strokeWidth="110"
              fill="none"
              filter="url(#waveBlur2)"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="hp-hero-content">
          <div className="hp-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#996B3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span className="hp-badge-text">Study Guide</span>
          </div>

          <h1 className="hp-title">
            Tech Foundations<br />
            <span className="hp-title-accent">for Product Managers</span>
          </h1>
          <p className="hp-desc">
            The technical concepts every PM needs — explained with real examples,
            zero jargon, and a quiz to make it stick.
          </p>
          <p className="hp-creator">
            Created by{' '}
            <a href="https://www.linkedin.com/in/thiagoaraujosilva/" target="_blank" rel="noopener noreferrer" className="hp-creator-link">
              Thiago Araujo
            </a>
          </p>

          <div className="hp-stats">
            <div className="hp-stat">
              <div className="hp-stat-icon-box" style={{ background: 'rgba(0,128,107,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00806B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="hp-stat-num">10</span>
              <span className="hp-stat-label">Modules</span>
            </div>
            <div className="hp-stat">
              <div className="hp-stat-icon-box" style={{ background: 'rgba(200,149,108,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#996B3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <span className="hp-stat-num">35+</span>
              <span className="hp-stat-label">Q&amp;A Cards</span>
            </div>
            <div className="hp-stat">
              <div className="hp-stat-icon-box" style={{ background: 'rgba(0,128,107,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00806B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span className="hp-stat-num">10</span>
              <span className="hp-stat-label">Quizzes</span>
            </div>
          </div>

          <button className="btn-start" onClick={handleStart}>
            {user ? 'Keep learning' : 'Start your journey'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {!user && (
            <button className="hp-login-link" onClick={handleStart}>
              Already have an account? <span>Log in</span>
            </button>
          )}
        </div>

      </div>

      {/* ── Divider ── */}
      <div className="hp-divider">
        <div className="hp-divider-line" />
        <div className="hp-divider-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#996B3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span className="hp-divider-text">Curriculum</span>
        </div>
        <div className="hp-divider-line" />
      </div>

      {/* ── Topics ── */}
      <div className="hp-topics">
        <h2 className="hp-topics-title">What you&apos;ll learn</h2>
        <div className="hp-grid">
          {MODULES.map((m) => (
            <div key={m.num} className="hp-card">
              <span className="hp-card-num">{m.num}</span>
              <span className="hp-card-emoji">{m.emoji}</span>
              <div className="hp-card-body">
                <div className="hp-card-title">{m.title}</div>
                <div className="hp-card-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="hp-cta">
        <p className="hp-cta-text">No engineering background required.</p>
        <button className="btn-start" onClick={handleStart}>{user ? 'Keep learning →' : 'Get started →'}</button>
      </div>

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onProceed={handleProceed}
        />
      )}

      {onboardingOpen && (
        <OnboardingModal onDone={handleOnboardingDone} />
      )}

    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}
