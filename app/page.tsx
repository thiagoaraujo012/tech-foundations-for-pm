import Link from 'next/link';

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

export default function Home() {
  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <div className="hp-hero">

        {/* Dot pattern background */}
        <svg className="hp-hero-dot-pattern" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#C8956C" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Decorative circles */}
        <div className="hp-hero-circle-tr" />
        <div className="hp-hero-circle-bl" />

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

          <Link href="/module/1" className="btn-start">
            Start your journey
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
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
        <Link href="/module/1" className="btn-start">Get started →</Link>
      </div>

    </div>
  );
}
