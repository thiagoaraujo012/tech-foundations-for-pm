'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { signInGoogle, signInEmail, signUpEmail } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    setError('');
    try {
      await signInGoogle();
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error signing in');
    }
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signin') await signInEmail(email, password);
      else await signUpEmail(email, password);
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 400, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '.85rem', right: '.85rem', background: 'none', border: 'none', color: 'var(--text3)', fontSize: '1rem', cursor: 'pointer' }}>✕</button>
        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '.2rem' }}>{mode === 'signin' ? 'Sign in' : 'Create account'}</div>
        <div style={{ fontSize: '.8rem', color: 'var(--text2)', marginBottom: '1.4rem' }}>Save your progress across devices</div>

        {error && <div style={{ background: 'rgba(239,107,107,.1)', border: '1px solid rgba(239,107,107,.25)', color: 'var(--red)', borderRadius: 8, padding: '.55rem .9rem', fontSize: '.8rem', marginBottom: '.75rem' }}>{error}</div>}

        <button onClick={handleGoogle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.6rem', width: '100%', padding: '.7rem', borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', fontFamily: 'var(--font)', fontSize: '.85rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem' }}>
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: '.73rem', color: 'var(--text3)' }}>or</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <form onSubmit={handleEmail}>
          <input className="paywall-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="paywall-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '.7rem', borderRadius: 10, border: 'none', background: 'var(--purple)', color: '#fff', fontFamily: 'var(--font)', fontSize: '.86rem', fontWeight: 700, cursor: 'pointer', opacity: loading ? .5 : 1 }}>
            {loading ? '...' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '.9rem', fontSize: '.78rem', color: 'var(--text2)' }}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <span style={{ color: 'var(--purple)', cursor: 'pointer', fontWeight: 600 }} onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </span>
        </div>
      </div>
    </div>
  );
}
