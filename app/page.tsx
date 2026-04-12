import Link from 'next/link';

export default function Home() {
  return (
    <div className="wrap">
      <div className="home-screen">
        <div className="home-screen-label">Study Guide</div>
        <h1>Tech Foundations<br />for Product Managers</h1>
        <p className="home-screen-desc">
          10 modules covering the technical concepts every PM needs — explained with real examples
          from Netflix, Spotify, Uber, Airbnb, and more. No engineering background required.
        </p>
        <div className="home-stats">
          <div className="home-stat">
            <div className="home-stat-num">10</div>
            <div className="home-stat-label">Modules</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-num">35+</div>
            <div className="home-stat-label">Q&amp;A Cards</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-num">10</div>
            <div className="home-stat-label">Quizzes</div>
          </div>
        </div>
        <div className="home-video-wrap">
          <div className="home-video-placeholder">
            <span className="vp-icon">▶</span>
            <span>Video coming soon</span>
          </div>
        </div>
        <Link href="/module/1" className="btn-start">Start your journey →</Link>
      </div>
    </div>
  );
}
