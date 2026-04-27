'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/components/AuthProvider';
import { MODULES } from '@/data/modules';

const STORAGE_KEY = 'tfpm_v3';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  alpha: number; color: string; radius: number; gravity: number;
}
interface Rocket {
  x: number; y: number; vy: number; color: string;
  exploded: boolean; trail: { x: number; y: number; alpha: number }[];
}

const COLORS = [
  '#00896F', '#B8780A', '#5E4DC4', '#2468C4', '#C43030',
  '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF',
];

function CoffeeModal({ onClose, destination }: { onClose: () => void; destination: string }) {
  const router = useRouter();

  function handleCoffee() {
    // Placeholder — replace with your Buy Me a Coffee / Ko-fi URL
    window.open('https://buymeacoffee.com/techfoundationsforpms', '_blank');
    router.push(destination);
  }

  function handleSkip() {
    router.push(destination);
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#1a1a1a',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '18px',
          padding: '2.5rem 2rem',
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1 }}>☕</div>

        <h3 style={{
          fontFamily: 'var(--font)',
          fontSize: '1.3rem',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '0.75rem',
          letterSpacing: '-0.2px',
        }}>
          Enjoyed the course?
        </h3>

        <p style={{
          fontFamily: 'var(--font)',
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}>
          Consider helping the creator by buying him a coffee :)<br />
          It takes 30 seconds and means a lot.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={handleCoffee}
            style={{
              padding: '0.85rem 1.5rem',
              background: '#FFD93D',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '10px',
              fontFamily: 'var(--font)',
              fontSize: '0.92rem',
              fontWeight: 800,
              cursor: 'pointer',
              letterSpacing: '0.1px',
            }}
          >
            ☕ Buy me a coffee
          </button>
          <button
            onClick={handleSkip}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              fontFamily: 'var(--font)',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

function CompletionContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coffeeModal, setCoffeeModal] = useState<string | null>(null);
  const router = useRouter();

  // Guard: only accessible after passing all modules
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const quizState = raw ? JSON.parse(raw).quizState ?? {} : {};
      const allPassed = MODULES.every((_, i) => quizState[i] === 'pass');
      if (!allPassed) {
        let target = 0;
        for (let i = 1; i < MODULES.length; i++) {
          if (quizState[i - 1] === 'pass') target = i;
          else break;
        }
        router.replace(`/module/${target + 1}`);
      }
    } catch {}
  }, [router]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];
    let animId: number;

    function spawnRocket() {
      rockets.push({
        x: Math.random() * window.innerWidth * 0.7 + window.innerWidth * 0.15,
        y: window.innerHeight,
        vy: -(Math.random() * 8 + 10),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        exploded: false,
        trail: [],
      });
    }

    function explode(rocket: Rocket) {
      const count = Math.floor(Math.random() * 40 + 60);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = Math.random() * 5 + 1.5;
        particles.push({
          x: rocket.x, y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          alpha: 1,
          color: Math.random() > 0.3 ? rocket.color : COLORS[Math.floor(Math.random() * COLORS.length)],
          radius: Math.random() * 2.5 + 1,
          gravity: 0.06,
        });
      }
    }

    let lastRocket = 0;
    const rocketInterval = 600;

    function loop(timestamp: number) {
      if (!canvas || !ctx) return;
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (timestamp - lastRocket > rocketInterval) {
        spawnRocket();
        lastRocket = timestamp;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y, alpha: 0.6 });
        if (r.trail.length > 8) r.trail.shift();
        r.trail.forEach((t, ti) => {
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,220,100,${t.alpha * (ti / r.trail.length) * 0.5})`;
          ctx.fill();
        });
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD93D';
        ctx.fill();
        r.y += r.vy;
        r.vy += 0.12;
        if (r.vy >= -2 && !r.exploded) {
          r.exploded = true;
          explode(r);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        p.vy += p.gravity; p.vx *= 0.98;
        p.alpha -= 0.013;
        if (p.alpha <= 0) particles.splice(i, 1);
      }

      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0a0a0a', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '3rem 2rem', maxWidth: '600px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: 1 }}>🏆</div>

        <h1 style={{
          fontFamily: 'var(--font)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
          color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '-0.5px', lineHeight: 1.15,
        }}>
          Congratulations!
        </h1>

        <h2 style={{
          fontFamily: 'var(--font)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 700,
          color: '#00896F', marginBottom: '1.5rem', letterSpacing: '-0.2px',
        }}>
          You&apos;ve made it!
        </h2>

        <p style={{ fontFamily: 'var(--font)', fontSize: '1rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          You&apos;ve completed all 10 modules of <strong style={{ color: '#FFD93D' }}>Tech Foundations for PMs</strong>.
        </p>

        <p style={{ fontFamily: 'var(--font)', fontSize: '0.92rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          You now speak the language of engineering — use it to ask better questions,
          scope more accurately, and build things that matter.
        </p>

        <a
          href="mailto:thiagobateraster@gmail.com?subject=Tech Foundations – Feedback"
          style={{
            display: 'inline-block', marginBottom: '1.25rem',
            padding: '0.75rem 2rem',
            background: 'transparent', color: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.3)', borderRadius: '10px',
            fontFamily: 'var(--font)', fontSize: '0.9rem', fontWeight: 600,
            textDecoration: 'none', letterSpacing: '0.1px',
            transition: 'border-color .2s, color .2s',
          }}
        >
          Leave your feedback
        </a>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCoffeeModal('/module/1')}
            style={{
              padding: '0.75rem 2rem', background: '#00896F', color: '#fff', border: 'none',
              borderRadius: '10px', fontFamily: 'var(--font)', fontSize: '0.9rem', fontWeight: 700,
              cursor: 'pointer', letterSpacing: '0.2px',
            }}
          >
            Review from the beginning
          </button>
          <button
            onClick={() => setCoffeeModal('/module/10')}
            style={{
              padding: '0.75rem 2rem', background: 'transparent', color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px',
              fontFamily: 'var(--font)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
            }}
          >
            ← Back to last module
          </button>
        </div>
      </div>

      {coffeeModal && (
        <CoffeeModal
          destination={coffeeModal}
          onClose={() => setCoffeeModal(null)}
        />
      )}
    </div>
  );
}

export default function CompletePage() {
  return (
    <AuthProvider>
      <CompletionContent />
    </AuthProvider>
  );
}
