'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/components/AuthProvider';

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bangladesh',
  'Belgium','Bolivia','Brazil','Bulgaria','Cambodia','Canada','Chile','China',
  'Colombia','Croatia','Czech Republic','Denmark','Ecuador','Egypt','Ethiopia',
  'Finland','France','Germany','Ghana','Greece','Guatemala','Hungary','India',
  'Indonesia','Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kenya',
  'Malaysia','Mexico','Morocco','Netherlands','New Zealand','Nigeria','Norway',
  'Pakistan','Peru','Philippines','Poland','Portugal','Romania','Russia',
  'Saudi Arabia','Senegal','Serbia','Singapore','South Africa','South Korea',
  'Spain','Sri Lanka','Sweden','Switzerland','Taiwan','Tanzania','Thailand',
  'Tunisia','Turkey','Uganda','Ukraine','United Arab Emirates','United Kingdom',
  'United States','Uruguay','Venezuela','Vietnam','Other',
];

const EXP_OPTIONS = ['0–2 years', '2–4 years', '4–6 years', '6+ years'];
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

function OnboardingContent() {
  const router = useRouter();
  const { user } = useAuth();

  const [isPM, setIsPM] = useState<boolean | null>(null);
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isPM === null) { setError('Please answer the first question.'); return; }
    if (!isPM && !role.trim()) { setError('Please tell us your role.'); return; }
    if (!experience) { setError('Please select your experience range.'); return; }
    if (!gender) { setError('Please select your gender.'); return; }
    if (!country) { setError('Please select your country.'); return; }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPM,
          role: role.trim(),
          experience,
          gender,
          country,
          uid: user?.uid ?? null,
        }),
      });
      if (!res.ok) throw new Error('API error');
    } catch {
      setError('Something went wrong saving your answers. Please try again.');
      setLoading(false);
      return;
    }

    localStorage.setItem('onboardingCompleted', 'true');
    router.push('/module/1');
  }

  function skip() {
    localStorage.setItem('onboardingCompleted', 'true');
    router.push('/module/1');
  }

  return (
    <div className="ob-page">
      <div className="ob-card">

        <div className="ob-header">
          <div className="ob-tag">Quick intro</div>
          <h1 className="ob-title">Tell us a bit about yourself</h1>
          <p className="ob-sub">This helps us understand who&apos;s using the course. Takes 30 seconds.</p>
        </div>

        <form onSubmit={handleSubmit} className="ob-form">

          {/* Q1 */}
          <div className="ob-field">
            <div className="ob-label">Are you a Product Manager?</div>
            <div className="ob-pill-row">
              <button
                type="button"
                className={`ob-pill ${isPM === true ? 'ob-pill-active' : ''}`}
                onClick={() => setIsPM(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`ob-pill ${isPM === false ? 'ob-pill-active' : ''}`}
                onClick={() => setIsPM(false)}
              >
                No
              </button>
            </div>
            {isPM === false && (
              <input
                className="ob-input"
                type="text"
                placeholder="What's your role?"
                value={role}
                onChange={e => setRole(e.target.value)}
                autoFocus
              />
            )}
          </div>

          {/* Q2 */}
          <div className="ob-field">
            <div className="ob-label">How long have you worked with Product Management or similar areas?</div>
            <div className="ob-pill-row">
              {EXP_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  className={`ob-pill ${experience === opt ? 'ob-pill-active' : ''}`}
                  onClick={() => setExperience(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div className="ob-field">
            <div className="ob-label">What&apos;s your gender?</div>
            <div className="ob-pill-row">
              {GENDER_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  className={`ob-pill ${gender === opt ? 'ob-pill-active' : ''}`}
                  onClick={() => setGender(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Q4 */}
          <div className="ob-field">
            <div className="ob-label">Where are you from?</div>
            <select
              className="ob-select"
              value={country}
              onChange={e => setCountry(e.target.value)}
            >
              <option value="">Select your country</option>
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {error && <div className="ob-error">{error}</div>}

          <button type="submit" className="ob-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Start the course →'}
          </button>
        </form>

        <button type="button" className="ob-skip" onClick={skip}>
          Skip for now
        </button>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <AuthProvider>
      <OnboardingContent />
    </AuthProvider>
  );
}
