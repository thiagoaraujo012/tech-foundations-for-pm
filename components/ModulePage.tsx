'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthProvider';
import { MODULES, FREE_MODULES } from '@/data/modules';
import AuthModal from './AuthModal';

type Lang = 'en' | 'pt';
type Answers = Record<string, 'yes' | 'no'>;
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
  hasAccess: boolean;
  lang?: Lang;
}

export default function ModulePage({ moduleId, hasAccess, lang: initialLang = 'en' }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const [lang, setLangState] = useState<Lang>(initialLang);
  const activeTab = moduleId;
  const [view, setView] = useState<'study' | 'quiz'>('study');
  const [answers, setAnswers] = useState<Answers>({});
  const [quizState, setQuizState] = useState<QuizState>({});
  const [quizSels, setQuizSels] = useState<QuizSelections>({});
  const [authOpen, setAuthOpen] = useState(false);

  const modules = MODULES;

  // Load persisted state on mount
  useEffect(() => {
    const local = loadLocal();
    if (local) {
      if (local.answers) setAnswers(local.answers);
      if (local.quizState) setQuizState(local.quizState);
      if (local.quizSels) setQuizSels(local.quizSels);
      if (local.lang) setLangState(local.lang);
    }
  }, []);

  // Sync from Firestore when user logs in
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, 'users', user.uid)).then((snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      if (data.quiz_state) setQuizState(data.quiz_state);
      if (data.answers) setAnswers(data.answers);
      if (data.quiz_sels) setQuizSels(data.quiz_sels);
    });
  }, [user]);

  // Persist state
  useEffect(() => {
    const data = { answers, quizState, quizSels, lang };
    saveLocal(data);
    if (user) {
      setDoc(doc(db, 'users', user.uid), {
        quiz_state: quizState,
        answers,
        quiz_sels: quizSels,
        updatedAt: new Date(),
      }, { merge: true }).catch(() => {});
    }
  }, [answers, quizState, quizSels, lang, user]);

  function isUnlocked(idx: number) {
    if (idx === 0) return true;
    return quizState[idx - 1] === 'pass';
  }

  function canAccess(idx: number) {
    if (idx < FREE_MODULES) return true;
    return hasAccess;
  }

  function switchTab(i: number) {
    if (!isUnlocked(i)) return;
    if (!canAccess(i)) { router.push('/paywall'); return; }
    router.push(`/module/${i + 1}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const mod = modules[activeTab];
  const context = lang === 'pt' ? mod.contextPt : mod.context;
  const qas = lang === 'pt' ? mod.qasPt : mod.qas;
  const quiz = lang === 'pt' ? mod.quizPt : mod.quiz;

  const passedCount = Object.values(quizState).filter(v => v === 'pass').length;
  const progressPct = Math.round((passedCount / modules.length) * 100);

  function markQA(id: string, val: 'yes' | 'no') {
    setAnswers(prev => ({ ...prev, [id]: val }));
  }

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
    const result = score >= 2 ? 'pass' : 'fail';
    setQuizState(prev => ({ ...prev, [activeTab]: result }));
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
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLangState('en')}>EN</button>
            <button className={`lang-btn ${lang === 'pt' ? 'active' : ''}`} onClick={() => setLangState('pt')}>PT-BR</button>
          </div>
          {user ? (
            <span style={{ fontSize: '.78rem', color: 'var(--green)', fontFamily: 'var(--mono)' }}>
              ● {user.displayName ?? user.email}
            </span>
          ) : (
            <button className="auth-btn" onClick={() => setAuthOpen(true)}>Sign in</button>
          )}
        </div>

        {/* Hero */}
        <div className="hero" style={{ marginBottom: '1.5rem' }}>
          <div className="hero-label">{lang === 'pt' ? 'Guia de Estudos' : 'Study Guide'}</div>
          <h1>{lang === 'pt' ? 'Fundamentos Técnicos para PMs' : 'Tech Foundations for Product Managers'}</h1>
          <p style={{ color: 'var(--text2)', fontSize: '.88rem' }}>
            {lang === 'pt'
              ? '10 módulos · 30+ perguntas · Nível: PM sem background de engenharia'
              : '10 modules · 30+ questions · Level: PM without engineering background'}
          </p>
        </div>

        {/* Progress */}
        <div className="progress-row">
          <div className="bar"><div className="fill" style={{ width: `${progressPct}%` }} /></div>
          <div className="label">{progressPct}%</div>
        </div>

        {/* Nav */}
        <div className="nav">
          <a href="/" className="nav-btn" title="Home">⌂</a>
          {modules.map((m, i) => {
            const unlocked = isUnlocked(i);
            const accessible = canAccess(i);
            const active = i === activeTab;
            let cls = 'nav-btn';
            if (active) cls += ' active';
            if (!unlocked) cls += ' locked';
            else if (!accessible) cls += ' paywall';
            return (
              <button key={i} className={cls} onClick={() => switchTab(i)}>
                {lang === 'pt' ? m.titlePt : m.title}
              </button>
            );
          })}
        </div>

        {view === 'study' ? (
          <>
            {/* Context */}
            <div className="context-box">
              <div className="ctx-label">{lang === 'pt' ? 'Contexto' : 'Context'}</div>
              <div dangerouslySetInnerHTML={{ __html: context }} />
            </div>

            {/* Q&A */}
            {qas.map((qa, i) => {
              const id = `${activeTab}-${i}`;
              const mark = answers[id];
              return (
                <div key={id} id={`qa-${id}`} className={`qa${mark === 'yes' ? ' done-yes' : mark === 'no' ? ' done-no' : ''}`}>
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
                    <div className="qa-check">
                      <button className={`btn-yes${mark === 'yes' ? ' sel' : ''}`} onClick={() => markQA(id, 'yes')}>
                        {lang === 'pt' ? '✓ Entendi' : '✓ Got it'}
                      </button>
                      <button className={`btn-no${mark === 'no' ? ' sel' : ''}`} onClick={() => markQA(id, 'no')}>
                        {lang === 'pt' ? '✗ Revisar' : '✗ Review'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <button className="goto-quiz" onClick={() => { setView('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              {lang === 'pt' ? 'Ir para a Avaliação do Módulo →' : 'Go to Module Assessment →'}
            </button>
          </>
        ) : (
          /* Quiz */
          <div className="quiz-section">
            <div className="quiz-label">{lang === 'pt' ? 'Avaliação' : 'Assessment'}</div>
            <div className="quiz-title">{lang === 'pt' ? `Avaliação do Módulo ${activeTab + 1}` : `Module ${activeTab + 1} Assessment`}</div>
            <div className="quiz-sub">
              {lang === 'pt' ? 'Acerte pelo menos 2 de 3 para desbloquear o próximo módulo.' : 'Answer at least 2 out of 3 correctly to unlock the next module.'}
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
                      if (oi === q.correct) cls += ' correct';
                      else if (oi === sel && sel !== q.correct) cls += ' wrong';
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
                {lang === 'pt' ? 'Enviar Respostas' : 'Submit Answers'}
              </button>
            )}

            {quizDone && (
              <div className={`quiz-result ${quizPassed ? 'pass' : 'fail'}`}>
                <span className="score">{score}/3</span>
                {quizPassed
                  ? (isLast
                      ? (lang === 'pt' ? 'Parabéns! Você completou todos os módulos! 🎉' : 'Congratulations! You completed all modules! 🎉')
                      : (lang === 'pt' ? `Aprovado! Módulo ${activeTab + 2} desbloqueado.` : `You passed! Module ${activeTab + 2} is now unlocked.`))
                  : (lang === 'pt' ? 'Você precisa acertar pelo menos 2/3. Revise o material e tente novamente.' : 'You need at least 2/3 to proceed. Review the material and try again.')}
                <div>
                  {quizPassed && !isLast && (
                    <button className="quiz-next" onClick={() => switchTab(activeTab + 1)}>
                      {lang === 'pt' ? `Ir para o Módulo ${activeTab + 2} →` : `Go to Module ${activeTab + 2} →`}
                    </button>
                  )}
                  {!quizPassed && (
                    <>
                      <button className="quiz-retry" onClick={retryQuiz}>{lang === 'pt' ? 'Tentar Novamente' : 'Try Again'}</button>
                      {' '}
                      <button className="quiz-retry" style={{ borderColor: 'var(--border)', color: 'var(--text2)' }} onClick={() => setView('study')}>
                        {lang === 'pt' ? '← Revisar Material' : '← Review Material'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            <button style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '.82rem' }} onClick={() => setView('study')}>
              ← {lang === 'pt' ? 'Voltar ao Material' : 'Back to Study Material'}
            </button>
          </div>
        )}

        <div className="footer">
          Tech Foundations for PMs · {lang === 'pt' ? 'Criado por' : 'Created by'} Thiago Araujo
        </div>
      </div>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
