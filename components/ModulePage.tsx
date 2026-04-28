'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { MODULES } from '@/data/modules';
import { DIAGRAMS } from './diagrams';
import AuthModal from './AuthModal';
import BugReportModal from './BugReportModal';

type QuizState = Record<number, 'pass' | 'fail'>;
type QuizSelections = Record<number, number[]>;

const STORAGE_KEY = 'tfpm_v3';

function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveLocal(data: object) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

interface Props {
  moduleId: number;
}

export default function ModulePage({ moduleId }: Props) {
  const router = useRouter();
  const { user, logout, getIdToken } = useAuth();
  const activeTab = moduleId;
  const [view, setView] = useState<'study' | 'quiz'>('study');
  const [quizState, setQuizState] = useState<QuizState>(() => {
    if (typeof window === 'undefined') return {};
    return loadLocal()?.quizState ?? {};
  });
  const [quizSels, setQuizSels] = useState<QuizSelections>(() => {
    if (typeof window === 'undefined') return {};
    return loadLocal()?.quizSels ?? {};
  });
  const [authOpen, setAuthOpen] = useState(false);
  const [bugOpen, setBugOpen] = useState(false);
  // Randomly pick 3 Q&A indices from the pool of 6, per module, per session
  const [qaIndices, setQaIndices] = useState<Record<number, number[]>>({});
  // Inline question state (not synced to Firestore — soft interactions)
  const [inlineSels, setInlineSels] = useState<Record<string, number>>({});
  const [reflectTexts, setReflectTexts] = useState<Record<string, string>>({});
  const [savedOnce, setSavedOnce] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const modules = MODULES;

  // Reset view to study when navigating to a different module
  useEffect(() => {
    setView('study');
    setSavedOnce(false);
  }, [moduleId]);

  // Guard: redirect to the last unlocked module if URL is accessed directly
  useEffect(() => {
    if (activeTab === 0) return;
    if (quizState[activeTab - 1] === 'pass') return;
    // Find the furthest reachable module
    let target = 0;
    for (let i = 1; i < MODULES.length; i++) {
      if (quizState[i - 1] === 'pass') target = i;
      else break;
    }
    router.replace(`/module/${target + 1}`);
  }, [activeTab, quizState]);

  // Randomize 3 Q&As from the pool each time a module is visited
  useEffect(() => {
    if (!qaIndices[activeTab]) {
      const indices = Array.from({ length: 6 }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setQaIndices(prev => ({ ...prev, [activeTab]: indices.slice(0, 3) }));
    }
  }, [activeTab]);

  // Load progress from server when user logs in
  useEffect(() => {
    if (!user) return;
    getIdToken().then(token => {
      if (!token) return;
      fetch('/api/progress', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (!data) return;
          const hasServerProgress = Object.keys(data.quizState ?? {}).length > 0;
          if (data.quizState) setQuizState(data.quizState);
          if (data.quizSels) setQuizSels(data.quizSels);
          // Redirect to furthest unlocked module if server has more progress than current view
          if (hasServerProgress) {
            let furthest = 0;
            for (let i = 1; i < MODULES.length; i++) {
              if (data.quizState[i - 1] === 'pass') furthest = i;
              else break;
            }
            if (furthest > 0 && activeTab === 0) {
              router.replace(`/module/${furthest + 1}`);
            }
          }
        })
        .catch(() => {});
    });
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save progress locally and to server on every quiz change
  useEffect(() => {
    if (!savedOnce) { setSavedOnce(true); return; }
    saveLocal({ quizState, quizSels });
    if (user) {
      getIdToken().then(token => {
        if (!token) return;
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ quizState, quizSels }),
        }).catch(() => {});
      });
    }
  }, [quizState, quizSels, user]); // eslint-disable-line react-hooks/exhaustive-deps

  function isUnlocked(idx: number) {
    if (idx === 0) return true;
    return quizState[idx - 1] === 'pass';
  }

  function switchTab(i: number) {
    if (!isUnlocked(i)) return;
    router.push(`/module/${i + 1}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const mod = modules[activeTab];
  const sections = mod.sections;
  const qas = mod.qas;
  const quiz = mod.quiz;

  const passedCount = Object.values(quizState).filter(v => v === 'pass').length;
  const progressPct = Math.round((passedCount / modules.length) * 100);

  function selectQuizOpt(qIdx: number, optIdx: number) {
    if (quizState[activeTab] === 'pass') return;
    setQuizSels(prev => {
      const cur = [...(prev[activeTab] ?? [-1, -1, -1])];
      cur[qIdx] = optIdx;
      return { ...prev, [activeTab]: cur };
    });
  }

  function submitQuiz() {
    const sels = quizSels[activeTab] ?? [-1, -1, -1];
    const score = quiz.reduce((s, q, i) => s + (sels[i] === q.correct ? 1 : 0), 0);
    const result: 'pass' | 'fail' = score >= 2 ? 'pass' : 'fail';
    setQuizState(prev => {
      const next = { ...prev, [activeTab]: result };
      if (result === 'pass' && isLast) {
        saveLocal({ ...loadLocal(), quizState: next });
        router.push('/complete');
      }
      return next;
    });
  }

  function retryQuiz() {
    setQuizState(prev => { const n = { ...prev }; delete n[activeTab]; return n; });
    setQuizSels(prev => ({ ...prev, [activeTab]: [-1, -1, -1] }));
  }

  const sels = quizSels[activeTab] ?? [-1, -1, -1];
  const quizDone = !!quizState[activeTab];
  const quizPassed = quizState[activeTab] === 'pass';
  const score = quiz.reduce((s, q, i) => s + (sels[i] === q.correct ? 1 : 0), 0);
  const allSelected = sels.every(s => s >= 0);
  const isLast = activeTab === modules.length - 1;

  return (
    <>
      <div className="wrap">
        {/* Top bar */}
        <div className="lang-bar">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
              <span style={{ fontSize: '.78rem', color: 'var(--green)', fontFamily: 'var(--mono)' }}>
                ● {user.displayName ?? user.email}
              </span>
              <button
                className="auth-btn"
                onClick={() => logout()}
                style={{ fontSize: '.72rem', color: 'var(--text3)' }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <button className="auth-btn" onClick={() => setAuthOpen(true)}>Sign in</button>
          )}
        </div>

        {/* Hero */}
        <div className="hero" style={{ marginBottom: '1.5rem' }}>
          <div className="hero-label">Study Guide</div>
          <h1>Tech Foundations for Product Managers</h1>
          <p style={{ color: 'var(--text2)', fontSize: '.88rem' }}>
            10 modules · 30+ questions · Level: PM without engineering background
          </p>
        </div>

        {/* Progress */}
        <div className="progress-row">
          <div className="bar"><div className="fill" style={{ width: `${progressPct}%` }} /></div>
          <div className="label">{progressPct}%</div>
        </div>

        {/* Nav */}
        <div className="nav-wrap">
          <button
            className="nav-arrow nav-arrow-left"
            onClick={() => navRef.current?.scrollBy({ left: -220, behavior: 'smooth' })}
            aria-label="Scroll left"
          >‹</button>
          <div className="nav" ref={navRef}>
            <a href="/" className="nav-btn" title="Home">⌂</a>
            {modules.map((m, i) => {
              const unlocked = isUnlocked(i);
              const active = i === activeTab;
              let cls = 'nav-btn';
              if (active) cls += ' active';
              if (!unlocked) cls += ' locked';
              return (
                <button key={i} className={cls} onClick={() => switchTab(i)}>
                  {m.title}
                </button>
              );
            })}
          </div>
          <button
            className="nav-arrow nav-arrow-right"
            onClick={() => navRef.current?.scrollBy({ left: 220, behavior: 'smooth' })}
            aria-label="Scroll right"
          >›</button>
        </div>

        {view === 'study' ? (
          <>
            {/* Sections with diagrams and inline questions */}
            {sections.map((section, sIdx) => {
              const inlineKey = `${activeTab}-s${sIdx}`;
              const iq = section.inlineQuestion;
              const DiagramComp = section.diagramKey ? DIAGRAMS[section.diagramKey] : null;

              return (
                <div key={sIdx}>
                  {/* Content */}
                  <div className="context-box">
                    <div className="ctx-label">
                      Content {sIdx + 1}/{sections.length}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: section.html }} />
                  </div>

                  {/* Video */}
                  {section.videoUrl && (
                    <>
                      <div className="video-wrap">
                        <iframe
                          src={`https://www.youtube.com/embed/${new URL(section.videoUrl).searchParams.get('v')}`}
                          title="Module video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      {section.videoCaption && (
                        <p className="diagram-caption">{section.videoCaption}</p>
                      )}
                    </>
                  )}

                  {/* Static image */}
                  {section.imageUrl && (
                    <div className="diagram-wrap">
                      <img
                        src={section.imageUrl}
                        alt={section.imageCaption ?? ''}
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                      {section.imageCaption && (
                        <p className="diagram-caption">{section.imageCaption}</p>
                      )}
                    </div>
                  )}

                  {/* Diagram */}
                  {DiagramComp && (
                    <div className="diagram-wrap">
                      <DiagramComp />
                      {section.diagramCaption && (
                        <p className="diagram-caption">{section.diagramCaption}</p>
                      )}
                    </div>
                  )}

                  {/* Inline question */}
                  {iq && (
                    <div className="inline-q">
                      {iq.type === 'mcq' ? (
                        <InlineMCQ
                          question={iq.q}
                          opts={iq.opts}
                          correct={iq.correct}
                          selected={inlineSels[inlineKey] ?? -1}
                          onSelect={(optIdx) =>
                            setInlineSels(prev => ({ ...prev, [inlineKey]: optIdx }))
                          }
                        />
                      ) : (
                        <InlineReflect
                          prompt={iq.prompt}
                          value={reflectTexts[inlineKey] ?? ''}
                          onChange={(v) =>
                            setReflectTexts(prev => ({ ...prev, [inlineKey]: v }))
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Q&A */}
            {(qaIndices[activeTab] ?? [0, 1, 2]).map((qaIdx, i) => {
              const qa = qas[qaIdx];
              const id = `${activeTab}-${qaIdx}`;
              return (
                <div key={id} id={`qa-${id}`} className="qa">
                  <div className="qa-header" onClick={() => {
                    document.getElementById(`qa-${id}`)?.classList.toggle('open');
                  }}>
                    <span className="qa-num">Q{i + 1}</span>
                    <span className="qa-question">{qa.q}</span>
                    <span className="qa-toggle">▼</span>
                  </div>
                  <div className="qa-body">
                    <div className="qa-divider" />
                    <div className="qa-answer">{qa.a}</div>
                  </div>
                </div>
              );
            })}

            {/* Takeaways */}
            <div className="takeaways">
              <div className="takeaways-label">Takeaways for PMs</div>
              <ul className="takeaways-list">
                {mod.takeaways.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <button className="goto-quiz" onClick={() => { setView('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Go to Module Assessment →
            </button>

            <div className="report-issue-wrap">
              <button className="report-issue-link" onClick={() => setBugOpen(true)}>
                Found an error? Report it
              </button>
            </div>
          </>
        ) : (
          /* Quiz */
          <div className="quiz-section">
            <div className="quiz-label">Assessment</div>
            <div className="quiz-title">Module {activeTab + 1} Assessment</div>
            <div className="quiz-sub">
              Answer at least 2 out of 3 correctly to unlock the next module.
            </div>

            {quiz.map((q, qi) => {
              const sel = sels[qi];
              return (
                <div key={qi} className="quiz-q">
                  <div className="quiz-q-text">{qi + 1}. {q.q}</div>
                  {q.opts.map((opt, oi) => {
                    let cls = 'quiz-opt';
                    if (quizDone) {
                      cls += ' locked';
                      if (oi === sel && sel === q.correct) cls += ' correct';
                      else if (oi === sel && sel !== q.correct) cls += ' wrong';
                      // only reveal unselected correct answer on perfect score
                      else if (score === 3 && oi === q.correct) cls += ' correct';
                    } else if (oi === sel) cls += ' selected';
                    return (
                      <button key={oi} className={cls} onClick={() => selectQuizOpt(qi, oi)}>{opt}</button>
                    );
                  })}
                </div>
              );
            })}

            {!quizDone && (
              <button className="quiz-submit" disabled={!allSelected} onClick={submitQuiz}>
                Submit Answers
              </button>
            )}

            {quizDone && (
              <div className={`quiz-result ${quizPassed ? 'pass' : 'fail'}`}>
                <span className="score">{score}/3</span>
                {quizPassed
                  ? (isLast
                      ? 'Congratulations! You completed all modules!'
                      : `You passed! Module ${activeTab + 2} is now unlocked.`)
                  : 'You need at least 2/3 to proceed. Review the material and try again.'}
                <div>
                  {quizPassed && !isLast && (
                    <button className="quiz-next" onClick={() => switchTab(activeTab + 1)}>
                      Go to Module {activeTab + 2} →
                    </button>
                  )}
                  {!quizPassed && (
                    <>
                      <button className="quiz-retry" onClick={retryQuiz}>Try Again</button>
                      {' '}
                      <button className="quiz-retry" style={{ borderColor: 'var(--border)', color: 'var(--text2)' }} onClick={() => setView('study')}>
                        ← Review Material
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            <button style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '.82rem' }} onClick={() => setView('study')}>
              ← Back to Study Material
            </button>
          </div>
        )}

        <div className="footer">
          Tech Foundations for PMs · Created by Thiago Araujo
        </div>
      </div>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      {bugOpen && (
        <BugReportModal
          moduleName={`Module ${activeTab + 1}: ${mod.title}`}
          onClose={() => setBugOpen(false)}
        />
      )}
    </>
  );
}

// ── Inline MCQ component ──────────────────────────────────

function InlineMCQ({ question, opts, correct, selected, onSelect }: {
  question: string;
  opts: string[];
  correct: number;
  selected: number;
  onSelect: (i: number) => void;
}) {
  const answered = selected >= 0;
  const isCorrect = selected === correct;

  return (
    <div className="inline-mcq">
      <div className="inline-q-label">
        🧠 Check your understanding
      </div>
      <p className="inline-q-text">{question}</p>
      <div className="inline-mcq-opts">
        {opts.map((opt, i) => {
          let cls = 'inline-opt';
          if (answered) {
            if (i === correct) cls += ' inline-opt-correct';
            else if (i === selected) cls += ' inline-opt-wrong';
            else cls += ' inline-opt-disabled';
          } else if (i === selected) {
            cls += ' inline-opt-selected';
          }
          return (
            <button key={i} className={cls} onClick={() => !answered && onSelect(i)}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`inline-mcq-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect
            ? '✓ Correct!'
            : `✗ Correct answer: "${opts[correct]}"`}
        </div>
      )}
    </div>
  );
}

// ── Inline Reflect component ──────────────────────────────

function InlineReflect({ prompt, value, onChange }: {
  prompt: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-reflect">
      <div className="inline-q-label">
        💭 Reflect
        <span className="inline-optional"> (optional)</span>
      </div>
      <p className="inline-q-text">{prompt}</p>
      <textarea
        className="inline-reflect-input"
        placeholder="Write your reflection here..."
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
      />
    </div>
  );
}
