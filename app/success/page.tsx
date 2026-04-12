'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/components/AuthProvider';

function SuccessContent() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(t); router.push('/module/4'); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [router]);

  return (
    <div className="wrap">
      <div className="success-wrap">
        <div className="success-icon">🎉</div>
        <h1 className="success-title">Payment confirmed!</h1>
        <p className="success-desc">
          Your access has been unlocked. You can now study all 10 modules.
          <br /><br />
          Redirecting to Module 4 in <strong style={{ color: 'var(--green)', fontFamily: 'var(--mono)' }}>{countdown}s</strong>...
        </p>
        <a href="/module/4" className="btn-primary">Go to Module 4 now →</a>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="wrap" style={{ textAlign: 'center', paddingTop: '5rem', color: 'var(--text2)' }}>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </AuthProvider>
  );
}
