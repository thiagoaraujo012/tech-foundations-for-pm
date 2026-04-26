'use client';
import React from 'react';

const C = {
  bg: '#FFFFFF', bg2: '#FFF0E5', border: '#E8D5C4',
  t1: '#1C1410', t2: '#6B5040', t3: '#A08878',
  green: '#00896F', greenBg: '#E6F4F1',
  amber: '#B8780A', amberBg: '#FDF3E3',
  purple: '#5E4DC4', purpleBg: '#EEEAFB',
  blue: '#2468C4', blueBg: '#E8F0FB',
  red: '#C43030', redBg: '#FBECEC',
};

function arr(x1: number, y1: number, x2: number, y2: number, color = C.t3) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len, uy = dy / len;
  const px = -uy, py = ux;
  const bx = x2 - ux * 9, by = y2 - uy * 9;
  return (
    <g>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth="1.5" />
      <polygon points={`${x2},${y2} ${bx + px * 4},${by + py * 4} ${bx - px * 4},${by - py * 4}`} fill={color} />
    </g>
  );
}

// ── Module 1 ──────────────────────────────────────────────

export function ThreeLayerArch() {
  return (
    <svg viewBox="0 0 580 210" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* FRONTEND */}
      <rect x="20" y="10" width="540" height="52" rx="8" fill={C.blueBg} stroke={C.blue} strokeWidth="1.5" />
      <text x="36" y="33" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.blue} letterSpacing="1.5">FRONTEND</text>
      <text x="140" y="33" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="11" fill={C.t2}>Interface — what the user sees and touches</text>
      <text x="36" y="53" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.t3}>React · Vue · Swift · Kotlin</text>
      {arr(290, 62, 290, 80)}
      <text x="298" y="74" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3}>HTTP</text>
      {/* BACKEND */}
      <rect x="20" y="84" width="540" height="52" rx="8" fill={C.amberBg} stroke={C.amber} strokeWidth="1.5" />
      <text x="36" y="107" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.amber} letterSpacing="1.5">BACKEND</text>
      <text x="140" y="107" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="11" fill={C.t2}>Logic, business rules, processing</text>
      <text x="36" y="127" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.t3}>Node.js · Python · Java · Go</text>
      {arr(290, 136, 290, 154)}
      <text x="298" y="148" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3}>SQL / queries</text>
      {/* DATABASE */}
      <rect x="20" y="158" width="540" height="52" rx="8" fill={C.greenBg} stroke={C.green} strokeWidth="1.5" />
      <text x="36" y="181" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.green} letterSpacing="1.5">DATABASE</text>
      <text x="140" y="181" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="11" fill={C.t2}>Persistent data storage</text>
      <text x="36" y="201" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.t3}>PostgreSQL · MongoDB · Firestore</text>
    </svg>
  );
}

export function ClientServerFlow() {
  return (
    <svg viewBox="0 0 580 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Browser */}
      <rect x="20" y="50" width="120" height="60" rx="8" fill={C.blueBg} stroke={C.blue} strokeWidth="1.5" />
      <text x="80" y="76" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.blue} textAnchor="middle">BROWSER</text>
      <text x="80" y="97" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Client</text>
      {/* Server */}
      <rect x="230" y="50" width="120" height="60" rx="8" fill={C.amberBg} stroke={C.amber} strokeWidth="1.5" />
      <text x="290" y="76" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.amber} textAnchor="middle">SERVER</text>
      <text x="290" y="97" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Backend / API</text>
      {/* Database */}
      <rect x="440" y="50" width="120" height="60" rx="8" fill={C.greenBg} stroke={C.green} strokeWidth="1.5" />
      <text x="500" y="76" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.green} textAnchor="middle">DATABASE</text>
      <text x="500" y="97" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Data</text>
      {/* Arrows top (request) */}
      {arr(140, 70, 230, 70, C.blue)}
      <text x="185" y="65" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.blue} textAnchor="middle">GET /api</text>
      {arr(350, 70, 440, 70, C.amber)}
      <text x="395" y="65" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.amber} textAnchor="middle">query</text>
      {/* Arrows bottom (response) */}
      {arr(230, 92, 140, 92, C.green)}
      <text x="185" y="107" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.green} textAnchor="middle">JSON</text>
      {arr(440, 92, 350, 92, C.t3)}
      <text x="395" y="107" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">result</text>
    </svg>
  );
}

// ── Module 2 ──────────────────────────────────────────────

export function RestApiRequest() {
  return (
    <svg viewBox="0 0 580 170" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Client */}
      <rect x="20" y="55" width="140" height="60" rx="8" fill={C.blueBg} stroke={C.blue} strokeWidth="1.5" />
      <text x="90" y="80" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.blue} textAnchor="middle">CLIENT</text>
      <text x="90" y="98" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Browser / App</text>
      {/* Server */}
      <rect x="420" y="55" width="140" height="60" rx="8" fill={C.amberBg} stroke={C.amber} strokeWidth="1.5" />
      <text x="490" y="80" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.amber} textAnchor="middle">SERVER</text>
      <text x="490" y="98" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">REST API</text>
      {/* Request arrow */}
      {arr(160, 72, 420, 72, C.blue)}
      <rect x="200" y="55" width="180" height="18" rx="4" fill={C.blueBg} />
      <text x="290" y="67" fontFamily="JetBrains Mono,monospace" fontSize="9" fill={C.blue} textAnchor="middle">GET /api/products</text>
      {/* Response arrow */}
      {arr(420, 98, 160, 98, C.green)}
      <rect x="200" y="97" width="180" height="18" rx="4" fill={C.greenBg} />
      <text x="290" y="109" fontFamily="JetBrains Mono,monospace" fontSize="9" fill={C.green} textAnchor="middle">200 OK  &#123; data: [...] &#125;</text>
      {/* Labels bottom */}
      <text x="290" y="145" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.t3} textAnchor="middle">JSON response — human and machine readable</text>
    </svg>
  );
}

export function HttpStatusCodes() {
  const cols = [
    { x: 30, color: C.green, bg: C.greenBg, label: '2xx — Success', items: ['200 OK', '201 Created', '204 No Content'] },
    { x: 220, color: C.amber, bg: C.amberBg, label: '4xx — Client Error', items: ['400 Bad Request', '401 Unauthorized', '404 Not Found'] },
    { x: 410, color: C.red, bg: C.redBg, label: '5xx — Server Error', items: ['500 Internal Error', '503 Unavailable'] },
  ];
  return (
    <svg viewBox="0 0 580 185" width="100%" xmlns="http://www.w3.org/2000/svg">
      {cols.map(col => (
        <g key={col.x}>
          <rect x={col.x} y="10" width="160" height="165" rx="8" fill={col.bg} stroke={col.color} strokeWidth="1.5" />
          <text x={col.x + 80} y="32" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={col.color} textAnchor="middle" letterSpacing="0.5">{col.label}</text>
          <line x1={col.x + 12} y1="40" x2={col.x + 148} y2="40" stroke={col.color} strokeWidth="0.75" opacity="0.4" />
          {col.items.map((item, i) => (
            <text key={i} x={col.x + 80} y={62 + i * 26} fontFamily="JetBrains Mono,monospace" fontSize="10" fill={col.color} textAnchor="middle">{item}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ── Module 3 ──────────────────────────────────────────────

export function MonolithVsMicro() {
  return (
    <svg viewBox="0 0 580 205" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Monolith */}
      <text x="135" y="20" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.t3} textAnchor="middle" letterSpacing="1">MONOLITH</text>
      <rect x="20" y="28" width="230" height="165" rx="8" fill={C.bg2} stroke={C.border} strokeWidth="1.5" />
      {[['Auth', C.purple, C.purpleBg], ['Payments', C.green, C.greenBg], ['Notifications', C.amber, C.amberBg], ['Search', C.blue, C.blueBg]].map(([label, color, bg], i) => (
        <g key={String(label)}>
          <rect x={36 + (i % 2) * 108} y={44 + Math.floor(i / 2) * 68} width="90" height="50" rx="6" fill={String(bg)} stroke={String(color)} strokeWidth="1" />
          <text x={81 + (i % 2) * 108} y={74 + Math.floor(i / 2) * 68} fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={String(color)} textAnchor="middle" fontWeight="600">{String(label)}</text>
        </g>
      ))}
      <text x="135" y="200" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">One deploy affects everything</text>
      {/* Divider */}
      <line x1="290" y1="20" x2="290" y2="195" stroke={C.border} strokeWidth="1" strokeDasharray="4,4" />
      {/* Microservices */}
      <text x="445" y="20" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.t3} textAnchor="middle" letterSpacing="1">MICROSERVICES</text>
      {[['Auth', C.purple, C.purpleBg, 310, 32], ['Payments', C.green, C.greenBg, 460, 32], ['Notif.', C.amber, C.amberBg, 310, 118], ['Search', C.blue, C.blueBg, 460, 118]].map(([label, color, bg, x, y]) => (
        <g key={String(label)}>
          <rect x={Number(x)} y={Number(y)} width="100" height="50" rx="6" fill={String(bg)} stroke={String(color)} strokeWidth="1.5" />
          <text x={Number(x) + 50} y={Number(y) + 28} fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={String(color)} textAnchor="middle" fontWeight="600">{String(label)}</text>
          <text x={Number(x) + 50} y={Number(y) + 44} fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={String(color)} textAnchor="middle" opacity="0.7">Service</text>
        </g>
      ))}
      <text x="445" y="200" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Independent deploy per service</text>
    </svg>
  );
}

export function HorizontalScaling() {
  return (
    <svg viewBox="0 0 580 195" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Load Balancer */}
      <rect x="190" y="10" width="200" height="46" rx="8" fill={C.purpleBg} stroke={C.purple} strokeWidth="1.5" />
      <text x="290" y="30" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.purple} textAnchor="middle" letterSpacing="1">LOAD BALANCER</text>
      <text x="290" y="47" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">distributes traffic</text>
      {/* Arrows to servers */}
      {arr(210, 56, 90, 118, C.purple)}
      {arr(290, 56, 290, 118, C.purple)}
      {arr(370, 56, 490, 118, C.purple)}
      {/* Servers */}
      {[80, 250, 420].map((x, i) => (
        <g key={i}>
          <rect x={x} y={118} width="120" height="52" rx="8" fill={C.amberBg} stroke={C.amber} strokeWidth="1.5" />
          <text x={x + 60} y={140} fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.amber} textAnchor="middle">SERVER {i + 1}</text>
          <text x={x + 60} y={158} fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Instance</text>
        </g>
      ))}
      <text x="290" y="192" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">If one server fails, others keep running. Scale by adding more servers.</text>
    </svg>
  );
}

// ── Module 4 ──────────────────────────────────────────────

export function DesignSystemLayers() {
  const layers = [
    { label: 'Tokens', desc: 'colors, spacing, typography', color: C.purple, bg: C.purpleBg, w: 540, x: 20 },
    { label: 'Components', desc: 'Button, Card, Modal, Input', color: C.blue, bg: C.blueBg, w: 420, x: 80 },
    { label: 'Patterns', desc: 'checkout flow, auth flow', color: C.amber, bg: C.amberBg, w: 300, x: 140 },
    { label: 'Product', desc: 'app assembled from the layers', color: C.green, bg: C.greenBg, w: 180, x: 200 },
  ];
  return (
    <svg viewBox="0 0 580 200" width="100%" xmlns="http://www.w3.org/2000/svg">
      {layers.map((l, i) => (
        <g key={l.label}>
          <rect x={l.x} y={10 + i * 46} width={l.w} height={38} rx="6" fill={l.bg} stroke={l.color} strokeWidth="1.5" />
          <text x={l.x + 14} y={32 + i * 46} fontFamily="JetBrains Mono,monospace" fontSize="10" fontWeight="700" fill={l.color}>{l.label}</text>
          <text x={l.x + 110} y={32 + i * 46} fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.t2}>— {l.desc}</text>
        </g>
      ))}
      <text x="290" y="196" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Each layer builds on the previous one</text>
    </svg>
  );
}

export function ServerDrivenUi() {
  return (
    <svg viewBox="0 0 580 190" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Traditional */}
      <text x="135" y="18" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={C.t3} textAnchor="middle" letterSpacing="1">TRADITIONAL</text>
      <rect x="20" y="26" width="230" height="60" rx="8" fill={C.bg2} stroke={C.border} strokeWidth="1.5" />
      <text x="135" y="48" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.t1} textAnchor="middle" fontWeight="600">Hardcoded layout in the app</text>
      <text x="135" y="64" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">To change: new deploy</text>
      <text x="135" y="78" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.red} textAnchor="middle">→ App Store review (days)</text>
      {/* Divider */}
      <line x1="290" y1="18" x2="290" y2="175" stroke={C.border} strokeWidth="1" strokeDasharray="4,4" />
      {/* SDUI */}
      <text x="445" y="18" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={C.green} textAnchor="middle" letterSpacing="1">SERVER-DRIVEN UI</text>
      <rect x="310" y="26" width="100" height="44" rx="6" fill={C.amberBg} stroke={C.amber} strokeWidth="1.5" />
      <text x="360" y="47" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.amber} textAnchor="middle" fontWeight="600">Server</text>
      <text x="360" y="61" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={C.t3} textAnchor="middle">sends JSON layout</text>
      {arr(410, 48, 460, 48, C.amber)}
      <rect x="460" y="26" width="100" height="44" rx="6" fill={C.blueBg} stroke={C.blue} strokeWidth="1.5" />
      <text x="510" y="47" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.blue} textAnchor="middle" fontWeight="600">App</text>
      <text x="510" y="61" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={C.t3} textAnchor="middle">renders</text>
      <text x="445" y="96" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.green} textAnchor="middle" fontWeight="600">Layout changes without a new release</text>
      <text x="445" y="110" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">→ Promotions, A/B testing, personalization</text>
      {/* Bottom note */}
      <text x="290" y="175" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">SDUI decouples deploy from layout changes</text>
    </svg>
  );
}

// ── Module 5 ──────────────────────────────────────────────

export function PerfTimeline() {
  const metrics = [
    { key: 'TTFB', label: 'Time to\nFirst Byte', x: 80, color: C.purple, time: '~200ms' },
    { key: 'FCP', label: 'First Contentful\nPaint', x: 190, color: C.blue, time: '~1.0s' },
    { key: 'LCP', label: 'Largest Contentful\nPaint', x: 330, color: C.amber, time: '~2.5s' },
    { key: 'TTI', label: 'Time to\nInteractive', x: 480, color: C.green, time: '~3.5s' },
  ];
  return (
    <svg viewBox="0 0 580 195" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Timeline bar */}
      <rect x="20" y="108" width="540" height="8" rx="4" fill={C.bg2} stroke={C.border} strokeWidth="1" />
      <rect x="20" y="108" width="540" height="8" rx="4" fill={`url(#grad-perf)`} />
      <defs>
        <linearGradient id="grad-perf" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={C.purple} stopOpacity="0.3" />
          <stop offset="100%" stopColor={C.green} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Start label */}
      <text x="20" y="135" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={C.t3}>Request</text>
      {/* Metrics */}
      {metrics.map(m => (
        <g key={m.key}>
          <line x1={m.x} y1="90" x2={m.x} y2="116" stroke={m.color} strokeWidth="2" />
          <circle cx={m.x} cy="112" r="5" fill={m.color} />
          <rect x={m.x - 38} y="10" width="76" height="56" rx="6" fill={C.bg} stroke={m.color} strokeWidth="1" />
          <text x={m.x} y="27" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={m.color} textAnchor="middle">{m.key}</text>
          <text x={m.x} y="42" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="7.5" fill={C.t3} textAnchor="middle">{m.label.split('\n')[0]}</text>
          <text x={m.x} y="53" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="7.5" fill={C.t3} textAnchor="middle">{m.label.split('\n')[1]}</text>
          <text x={m.x} y="65" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={m.color} textAnchor="middle">{m.time}</text>
        </g>
      ))}
      <text x="290" y="175" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Each metric captures a different moment in the user experience</text>
    </svg>
  );
}

export function LatencyPercentiles() {
  const bars = [
    { label: 'P50', time: '1.5s', w: 120, color: C.green, note: 'typical user' },
    { label: 'P75', time: '3.0s', w: 220, color: C.amber, note: '' },
    { label: 'P95', time: '6.0s', w: 360, color: C.red, note: '5% of users' },
    { label: 'P99', time: '8.5s', w: 460, color: C.red, note: 'long tail' },
  ];
  return (
    <svg viewBox="0 0 580 175" width="100%" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="16" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={C.t3} letterSpacing="1">LATENCY BY PERCENTILE</text>
      {bars.map((b, i) => (
        <g key={b.label}>
          <text x="36" y={42 + i * 34} fontFamily="JetBrains Mono,monospace" fontSize="10" fontWeight="700" fill={b.color} textAnchor="end">{b.label}</text>
          <rect x="44" y={26 + i * 34} width={b.w} height="20" rx="4" fill={b.color} opacity="0.15" />
          <rect x="44" y={26 + i * 34} width={b.w} height="20" rx="4" fill={b.color} opacity="0.55" />
          <text x={44 + b.w + 8} y={42 + i * 34} fontFamily="JetBrains Mono,monospace" fontSize="10" fontWeight="700" fill={b.color}>{b.time}</text>
          {b.note && <text x={44 + b.w + 60} y={42 + i * 34} fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3}>{b.note}</text>}
        </g>
      ))}
      <text x="290" y="165" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Optimizing only the median (P50) hides serious problems for tail users</text>
    </svg>
  );
}

// ── Module 6 ──────────────────────────────────────────────

export function LocalVsGlobalState() {
  return (
    <svg viewBox="0 0 580 195" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* LOCAL */}
      <text x="125" y="18" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={C.t3} textAnchor="middle" letterSpacing="1">LOCAL STATE</text>
      <rect x="30" y="26" width="190" height="130" rx="8" fill={C.bg2} stroke={C.border} strokeWidth="1.5" />
      <text x="125" y="50" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t2} textAnchor="middle">Component</text>
      <rect x="50" y="58" width="150" height="38" rx="6" fill={C.purpleBg} stroke={C.purple} strokeWidth="1" />
      <text x="125" y="73" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.purple} textAnchor="middle" fontWeight="600">state: modal open?</text>
      <text x="125" y="88" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={C.t3} textAnchor="middle">Only visible here</text>
      <text x="125" y="138" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Dropdown, input, toggle</text>
      {/* Divider */}
      <line x1="290" y1="18" x2="290" y2="175" stroke={C.border} strokeWidth="1" strokeDasharray="4,4" />
      {/* GLOBAL */}
      <text x="445" y="18" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={C.green} textAnchor="middle" letterSpacing="1">GLOBAL STATE</text>
      <rect x="350" y="26" width="100" height="38" rx="8" fill={C.greenBg} stroke={C.green} strokeWidth="1.5" />
      <text x="400" y="43" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={C.green} textAnchor="middle">STORE</text>
      <text x="400" y="57" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={C.t3} textAnchor="middle">user, cart...</text>
      {[['Header', 310, 98], ['Cart', 400, 98], ['Checkout', 490, 98]].map(([label, x, y]) => (
        <g key={String(label)}>
          {arr(400, 64, Number(x), Number(y), C.green)}
          <rect x={Number(x) - 38} y={Number(y)} width="76" height="30" rx="6" fill={C.blueBg} stroke={C.blue} strokeWidth="1" />
          <text x={Number(x)} y={Number(y) + 18} fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.blue} textAnchor="middle">{String(label)}</text>
        </g>
      ))}
      <text x="400" y="165" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Shared — change propagates everywhere</text>
    </svg>
  );
}

export function OptimisticUiFlow() {
  const steps = [
    { x: 20, label: 'User\nliked', sub: 'Tap', color: C.blue, bg: C.blueBg },
    { x: 160, label: 'UI updates\nimmediately', sub: '♥ red', color: C.purple, bg: C.purpleBg },
    { x: 330, label: 'Request\nto server', sub: 'API call...', color: C.amber, bg: C.amberBg },
  ];
  return (
    <svg viewBox="0 0 580 195" width="100%" xmlns="http://www.w3.org/2000/svg">
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="30" width="130" height="68" rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <text x={s.x + 65} y="56" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fontWeight="600" fill={s.color} textAnchor="middle">{s.label.split('\n')[0]}</text>
          <text x={s.x + 65} y="70" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fontWeight="600" fill={s.color} textAnchor="middle">{s.label.split('\n')[1]}</text>
          <text x={s.x + 65} y="86" fontFamily="JetBrains Mono,monospace" fontSize="9" fill={s.color} textAnchor="middle" opacity="0.7">{s.sub}</text>
          {i < steps.length - 1 && arr(s.x + 130, 64, s.x + 160, 64, C.t3)}
        </g>
      ))}
      {/* Success / Fail branches */}
      {arr(460, 64, 460, 112, C.green)}
      {arr(460, 64, 530, 112, C.red)}
      <rect x="400" y="116" width="110" height="36" rx="6" fill={C.greenBg} stroke={C.green} strokeWidth="1.5" />
      <text x="455" y="131" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fontWeight="600" fill={C.green} textAnchor="middle">Success</text>
      <text x="455" y="144" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={C.t3} textAnchor="middle">keeps ♥</text>
      <rect x="520" y="116" width="44" height="36" rx="6" fill={C.redBg} stroke={C.red} strokeWidth="1.5" />
      <text x="542" y="131" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fontWeight="600" fill={C.red} textAnchor="middle">Fail</text>
      <text x="542" y="144" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={C.t3} textAnchor="middle">reverts</text>
      <text x="290" y="185" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Risk: if the server fails, the UI shows incorrect state before reverting</text>
    </svg>
  );
}

// ── Module 7 ──────────────────────────────────────────────

export function SemverBreakdown() {
  const parts = [
    { num: '2', label: 'MAJOR', desc: 'Breaking change', sub: 'old clients may break', color: C.red, bg: C.redBg },
    { num: '4', label: 'MINOR', desc: 'New feature', sub: 'backwards compatible', color: C.amber, bg: C.amberBg },
    { num: '1', label: 'PATCH', desc: 'Bug fix', sub: 'no behavior change', color: C.green, bg: C.greenBg },
  ];
  return (
    <svg viewBox="0 0 580 175" width="100%" xmlns="http://www.w3.org/2000/svg">
      <text x="290" y="18" fontFamily="JetBrains Mono,monospace" fontSize="10" fontWeight="700" fill={C.t2} textAnchor="middle" letterSpacing="2">SEMANTIC VERSIONING  —  MAJOR . MINOR . PATCH</text>
      {parts.map((p, i) => (
        <g key={p.label}>
          <rect x={20 + i * 190} y="28" width="170" height="130" rx="8" fill={p.bg} stroke={p.color} strokeWidth="1.5" />
          <text x={105 + i * 190} y="72" fontFamily="JetBrains Mono,monospace" fontSize="42" fontWeight="700" fill={p.color} textAnchor="middle">{p.num}</text>
          <text x={105 + i * 190} y="100" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={p.color} textAnchor="middle" letterSpacing="1">{p.label}</text>
          <text x={105 + i * 190} y="117" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fontWeight="600" fill={C.t1} textAnchor="middle">{p.desc}</text>
          <text x={105 + i * 190} y="132" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8.5" fill={C.t3} textAnchor="middle">{p.sub}</text>
        </g>
      ))}
    </svg>
  );
}

export function DeprecationTimeline() {
  const phases: { x: number; label: string; sub: string; color: string }[] = [
    { x: 30, label: 'Today', sub: 'Announces\ndeprecation', color: C.amber },
    { x: 200, label: '+6 months', sub: 'v1 and v2\nboth live', color: C.blue },
    { x: 390, label: '+12 months', sub: 'v1 removed\nv2 only', color: C.green },
  ];
  return (
    <svg viewBox="0 0 580 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Timeline bar */}
      <line x1="60" y1="80" x2="520" y2="80" stroke={C.border} strokeWidth="2" />
      {phases.map((p) => (
        <g key={p.label}>
          <circle cx={p.x + 60} cy="80" r="10" fill={C.bg} stroke={p.color} strokeWidth="2" />
          <circle cx={p.x + 60} cy="80" r="5" fill={p.color} />
          <text x={p.x + 60} y="56" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={p.color} textAnchor="middle">{p.label}</text>
          <text x={p.x + 60} y="104" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t2} textAnchor="middle">{p.sub.split('\n')[0]}</text>
          <text x={p.x + 60} y="118" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">{p.sub.split('\n')[1]}</text>
        </g>
      ))}
      {arr(90, 80, 250, 80, C.t3)}
      {arr(270, 80, 440, 80, C.t3)}
      <text x="290" y="148" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Give consumers enough time to migrate before removing</text>
    </svg>
  );
}

// ── Module 8 ──────────────────────────────────────────────

export function AuthVsAuthz() {
  return (
    <svg viewBox="0 0 580 185" width="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Authentication */}
      <rect x="20" y="10" width="250" height="155" rx="8" fill={C.blueBg} stroke={C.blue} strokeWidth="1.5" />
      <text x="145" y="32" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={C.blue} textAnchor="middle" letterSpacing="1">AUTHENTICATION</text>
      <text x="145" y="48" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="11" fill={C.t1} textAnchor="middle" fontWeight="600">&quot;Who are you?&quot;</text>
      <line x1="40" y1="56" x2="250" y2="56" stroke={C.blue} strokeWidth="0.75" opacity="0.3" />
      <text x="145" y="78" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.t2} textAnchor="middle">Email + password → login</text>
      <rect x="44" y="88" width="202" height="32" rx="6" fill={C.bg2} stroke={C.border} strokeWidth="1" />
      <text x="145" y="108" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.green} textAnchor="middle" fontWeight="600">✓ Identity confirmed</text>
      <text x="145" y="140" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Issues session token</text>
      {/* Divider */}
      <text x="290" y="96" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="20" fill={C.border} textAnchor="middle">+</text>
      {/* Authorization */}
      <rect x="310" y="10" width="250" height="155" rx="8" fill={C.amberBg} stroke={C.amber} strokeWidth="1.5" />
      <text x="435" y="32" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={C.amber} textAnchor="middle" letterSpacing="1">AUTHORIZATION</text>
      <text x="435" y="48" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="11" fill={C.t1} textAnchor="middle" fontWeight="600">&quot;What can you do?&quot;</text>
      <line x1="330" y1="56" x2="540" y2="56" stroke={C.amber} strokeWidth="0.75" opacity="0.3" />
      <text x="435" y="78" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.t2} textAnchor="middle">Token → permission check</text>
      <rect x="334" y="88" width="88" height="32" rx="6" fill={C.greenBg} stroke={C.green} strokeWidth="1" />
      <text x="378" y="108" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.green} textAnchor="middle" fontWeight="600">✓ Admin</text>
      <rect x="434" y="88" width="88" height="32" rx="6" fill={C.redBg} stroke={C.red} strokeWidth="1" />
      <text x="478" y="108" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.red} textAnchor="middle" fontWeight="600">✗ User</text>
      <text x="435" y="140" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Access control by role</text>
      <text x="290" y="180" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Separate systems — authenticated ≠ authorized</text>
    </svg>
  );
}

export function OAuthFlow() {
  const steps = [
    { label: 'User', x: 20, color: C.blue, bg: C.blueBg },
    { label: 'Your App', x: 155, color: C.purple, bg: C.purpleBg },
    { label: 'Google', x: 290, color: C.amber, bg: C.amberBg },
    { label: 'Token', x: 425, color: C.green, bg: C.greenBg },
  ];
  const labels = ['Login with Google', 'Redirects', 'Authenticates', 'Returns token'];
  return (
    <svg viewBox="0 0 580 170" width="100%" xmlns="http://www.w3.org/2000/svg">
      {steps.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y="40" width="110" height="50" rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <text x={s.x + 55} y="68" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="11" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
          {i < steps.length - 1 && (
            <>
              {arr(s.x + 110, 65, s.x + 155, 65, C.t3)}
              <text x={s.x + 132} y="58" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={C.t3} textAnchor="middle">{labels[i]}</text>
            </>
          )}
        </g>
      ))}
      <text x="290" y="115" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.green} textAnchor="middle" fontWeight="600">Your app never sees the user&apos;s Google password</text>
      <text x="290" y="130" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Only receives permission to access specific data (email, profile)</text>
    </svg>
  );
}

// ── Module 9 ──────────────────────────────────────────────

export function CicdPipeline() {
  const stages = [
    { label: 'Code', color: C.blue, bg: C.blueBg },
    { label: 'Build', color: C.purple, bg: C.purpleBg },
    { label: 'Tests', color: C.amber, bg: C.amberBg },
    { label: 'Staging', color: C.blue, bg: C.blueBg },
    { label: 'Production', color: C.green, bg: C.greenBg },
  ];
  const spacing = 100;
  return (
    <svg viewBox="0 0 580 145" width="100%" xmlns="http://www.w3.org/2000/svg">
      <text x="290" y="16" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={C.t3} textAnchor="middle" letterSpacing="1">CI / CD PIPELINE</text>
      {stages.map((s, i) => (
        <g key={s.label}>
          <rect x={16 + i * spacing} y="28" width="84" height="52" rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <text x={58 + i * spacing} y="56" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
          <text x={58 + i * spacing} y="71" fontFamily="JetBrains Mono,monospace" fontSize="10" fill={s.color} textAnchor="middle">✓</text>
          {i < stages.length - 1 && arr(100 + i * spacing, 54, 116 + i * spacing, 54, C.t3)}
        </g>
      ))}
      <text x="290" y="108" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Each push triggers the pipeline — automated tests before any deploy</text>
      <text x="290" y="122" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.green} textAnchor="middle">High-performing teams deploy multiple times per day, safely</text>
    </svg>
  );
}

export function EnvironmentsFlow() {
  const envs = [
    { label: 'LOCAL', sub: "Dev's machine", note: 'Bug here: 5 minutes', color: C.blue, bg: C.blueBg },
    { label: 'STAGING', sub: 'Test server', note: 'Bug here: 1 hour', color: C.amber, bg: C.amberBg },
    { label: 'PRODUCTION', sub: 'Real users', note: 'Bug here: $$$ + reputation', color: C.red, bg: C.redBg },
  ];
  return (
    <svg viewBox="0 0 580 175" width="100%" xmlns="http://www.w3.org/2000/svg">
      <text x="290" y="16" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Cost of a bug grows the further it gets in the pipeline</text>
      {envs.map((e, i) => (
        <g key={e.label}>
          <rect x={20 + i * 190} y="24" width="165" height="90" rx="8" fill={e.bg} stroke={e.color} strokeWidth="1.5" />
          <text x={102 + i * 190} y="50" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill={e.color} textAnchor="middle" letterSpacing="1">{e.label}</text>
          <text x={102 + i * 190} y="68" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.t2} textAnchor="middle">{e.sub}</text>
          <text x={102 + i * 190} y="100" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fontWeight="600" fill={e.color} textAnchor="middle">{e.note}</text>
          {i < envs.length - 1 && arr(185 + i * 190, 69, 210 + i * 190, 69, C.t3)}
        </g>
      ))}
      <text x="290" y="148" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Staging should mirror production as closely as possible</text>
    </svg>
  );
}

// ── Module 10 ──────────────────────────────────────────────

export function UptimeComparison() {
  const rows = [
    { sla: '99%', downtime: '3.65 days/year', w: 420, color: C.red },
    { sla: '99.9%', downtime: '8.7 hours/year', w: 200, color: C.amber },
    { sla: '99.99%', downtime: '52 min/year', w: 50, color: C.green },
  ];
  return (
    <svg viewBox="0 0 580 155" width="100%" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="16" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={C.t3} letterSpacing="1">DOWNTIME PER YEAR</text>
      {rows.map((r, i) => (
        <g key={r.sla}>
          <text x="60" y={44 + i * 38} fontFamily="JetBrains Mono,monospace" fontSize="11" fontWeight="700" fill={r.color} textAnchor="end">{r.sla}</text>
          <rect x="68" y={28 + i * 38} width={r.w} height="22" rx="4" fill={r.color} opacity="0.2" />
          <rect x="68" y={28 + i * 38} width={r.w} height="22" rx="4" fill={r.color} opacity="0.5" />
          <text x={68 + r.w + 10} y={44 + i * 38} fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fontWeight="600" fill={r.color}>{r.downtime}</text>
        </g>
      ))}
      <text x="290" y="140" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Each additional &quot;nine&quot; dramatically reduces downtime — and raises infrastructure cost</text>
    </svg>
  );
}

export function CycleTimeChart() {
  return (
    <svg viewBox="0 0 580 165" width="100%" xmlns="http://www.w3.org/2000/svg">
      <text x="290" y="18" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill={C.t3} textAnchor="middle" letterSpacing="1">CYCLE TIME — CODE READY → PRODUCTION</text>
      {/* Labels */}
      <text x="10" y="58" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.green} fontWeight="600">Target</text>
      <text x="10" y="98" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="10" fill={C.red} fontWeight="600">Current</text>
      {/* Bars */}
      <rect x="56" y="42" width="160" height="24" rx="4" fill={C.greenBg} stroke={C.green} strokeWidth="1.5" />
      <text x="236" y="58" fontFamily="JetBrains Mono,monospace" fontSize="10" fontWeight="700" fill={C.green} dx="8">7 days</text>
      <rect x="56" y="82" width="390" height="24" rx="4" fill={C.redBg} stroke={C.red} strokeWidth="1.5" />
      <text x="446" y="98" fontFamily="JetBrains Mono,monospace" fontSize="10" fontWeight="700" fill={C.red} dx="8">18 days</text>
      {/* Stages below */}
      <text x="56" y="128" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={C.t3}>Code ready</text>
      <text x="446" y="128" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="8" fill={C.t3} textAnchor="end">In production</text>
      <line x1="56" y1="132" x2="446" y2="132" stroke={C.border} strokeWidth="1" />
      <text x="290" y="150" fontFamily="Plus Jakarta Sans,sans-serif" fontSize="9" fill={C.t3} textAnchor="middle">Higher cycle time = features reach users more slowly</text>
    </svg>
  );
}

// ── Export map ─────────────────────────────────────────────

export const DIAGRAMS: Record<string, React.ComponentType> = {
  'three-layer-arch': ThreeLayerArch,
  'client-server-flow': ClientServerFlow,
  'rest-api-request': RestApiRequest,
  'http-status-codes': HttpStatusCodes,
  'monolith-vs-micro': MonolithVsMicro,
  'horizontal-scaling': HorizontalScaling,
  'design-system-layers': DesignSystemLayers,
  'server-driven-ui': ServerDrivenUi,
  'perf-timeline': PerfTimeline,
  'latency-percentiles': LatencyPercentiles,
  'local-vs-global-state': LocalVsGlobalState,
  'optimistic-ui-flow': OptimisticUiFlow,
  'semver-breakdown': SemverBreakdown,
  'deprecation-timeline': DeprecationTimeline,
  'auth-vs-authz': AuthVsAuthz,
  'oauth-flow': OAuthFlow,
  'cicd-pipeline': CicdPipeline,
  'environments-flow': EnvironmentsFlow,
  'uptime-comparison': UptimeComparison,
  'cycle-time-chart': CycleTimeChart,
};
