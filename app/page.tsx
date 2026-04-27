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

          <div className="hp-stats">
            <div className="hp-stat"><span className="hp-stat-num">10</span><span className="hp-stat-label">Modules</span></div>
            <div className="hp-stat-div" />
            <div className="hp-stat"><span className="hp-stat-num">35+</span><span className="hp-stat-label">Q&amp;A Cards</span></div>
            <div className="hp-stat-div" />
            <div className="hp-stat"><span className="hp-stat-num">10</span><span className="hp-stat-label">Quizzes</span></div>
          </div>

          <Link href="/module/1" className="btn-start">Start your journey →</Link>
        </div>

      </div>

      {/* ── Topics ── */}
      <div className="hp-topics">
        <div className="hp-topics-header">
          <div className="hp-topics-label">Curriculum</div>
          <h2 className="hp-topics-title">What you&apos;ll learn</h2>
        </div>
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
