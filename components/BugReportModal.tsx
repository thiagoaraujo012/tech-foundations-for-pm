'use client';

import { useState } from 'react';

interface Props {
  moduleName?: string;
  onClose: () => void;
}

export default function BugReportModal({ moduleName, onClose }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/report-bug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, description, module: moduleName }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bug-modal-overlay" onClick={onClose}>
      <div className="bug-modal" onClick={e => e.stopPropagation()}>

        <button className="bug-modal-close" onClick={onClose} aria-label="Close">✕</button>

        {status === 'sent' ? (
          <div className="bug-modal-success">
            <div className="bug-modal-success-icon">✓</div>
            <h3 className="bug-modal-title">Report received!</h3>
            <p className="bug-modal-sub">Thanks for helping improve the course. We'll look into it.</p>
            <button className="bug-modal-btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h3 className="bug-modal-title">Found an issue?</h3>
            <p className="bug-modal-sub">
              Tell us what went wrong{moduleName ? ` in ${moduleName}` : ''} and we'll fix it.
            </p>

            <form onSubmit={handleSubmit} className="bug-modal-form">
              <label className="bug-modal-label">
                Name
                <input
                  className="bug-modal-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </label>

              <label className="bug-modal-label">
                Email
                <input
                  className="bug-modal-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="bug-modal-label">
                Description of the error
                <textarea
                  className="bug-modal-textarea"
                  placeholder="Describe what happened and where…"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </label>

              {status === 'error' && (
                <p className="bug-modal-error">Something went wrong. Please try again.</p>
              )}

              <button
                className="bug-modal-btn-primary"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send report'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
