'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import AuthModal from '@/components/AuthModal';
import { PLANS, PlanKey } from '@/lib/stripe';

function PaywallContent() {
  const router = useRouter();
  const { user, getIdToken } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('lifetime');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [error, setError] = useState('');

  async function handlePay() {
    if (!user) { setAuthOpen(true); return; }
    setLoading(true);
    setError('');
    try {
      const idToken = await getIdToken();
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan, company, idToken }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error ?? 'Something went wrong');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="wrap">
        <div className="paywall-wrap">
          <div className="paywall-tag">Unlock Full Access</div>
          <h1 className="paywall-title">
            Modules 4–10 require a one-time payment
          </h1>
          <p className="paywall-desc">
            You&apos;ve completed the free preview (modules 1–3). Get full access to all 10 modules — APIs, Architecture, Design Systems, Performance, Security, DevOps, and Technical Metrics.
          </p>

          <div className="plan-cards">
            <div
              className={`plan-card ${selectedPlan === 'monthly' ? 'selected' : ''}`}
              onClick={() => setSelectedPlan('monthly')}
            >
              <div className="plan-price">$4</div>
              <div className="plan-label">30-Day Access</div>
              <div className="plan-desc">Full access to all 10 modules for 30 days from payment date</div>
            </div>
            <div
              className={`plan-card featured ${selectedPlan === 'lifetime' ? 'selected' : ''}`}
              onClick={() => setSelectedPlan('lifetime')}
            >
              <div className="plan-badge">BEST VALUE</div>
              <div className="plan-price">$10</div>
              <div className="plan-label">Lifetime Access</div>
              <div className="plan-desc">Permanent access — pay once, keep forever</div>
            </div>
          </div>

          <input
            className="paywall-input"
            type="text"
            placeholder="Where do you work? (optional)"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />

          {error && (
            <div style={{ color: 'var(--red)', fontSize: '.82rem', marginBottom: '.75rem', textAlign: 'center' }}>{error}</div>
          )}

          <button className="btn-pay" disabled={loading} onClick={handlePay}>
            {loading ? 'Redirecting...' : user ? `Pay ${PLANS[selectedPlan].price} — ${PLANS[selectedPlan].label}` : 'Sign in to continue'}
          </button>
          <div className="paywall-note">Secure payment via Stripe · No subscriptions · One-time only</div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '.82rem', textDecoration: 'underline' }}
              onClick={() => router.push('/module/1')}
            >
              ← Back to free modules
            </button>
          </div>
        </div>
      </div>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}

export default function PaywallPage() {
  return (
    <AuthProvider>
      <PaywallContent />
    </AuthProvider>
  );
}
