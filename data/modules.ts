export type QA = { q: string; a: string };
export type QuizQuestion = { q: string; opts: string[]; correct: number };

export type InlineQuestion =
  | { type: 'mcq'; q: string; opts: string[]; correct: number }
  | { type: 'reflect'; prompt: string };

export type ModuleSection = {
  html: string;
  videoUrl?: string;
  videoCaption?: string;
  imageUrl?: string;
  imageCaption?: string;
  diagramKey?: string;
  diagramCaption?: string;
  inlineQuestion?: InlineQuestion;
};

export type Module = {
  id: number;
  title: string;
  sections: ModuleSection[];
  qas: QA[];
  quiz: QuizQuestion[];
  takeaways: string[];
};

const SECTIONS: ModuleSection[][] = [
  // ── Module 1: How Software Works ──────────────────────────
  [
    {
      html: `<h2>How Software Works</h2><p>Before diving in, watch this short video for a bird's-eye view of how the web works — it sets the foundation for everything in this module.</p>`,
      videoUrl: 'https://www.youtube.com/watch?v=NzEYYemQ3_8',
      videoCaption: 'A quick overview of how the internet and software work together — great context before we go deeper.',
    },
    {
      html: `<h2>The Basics: Frontend, Backend &amp; Database</h2><p>Every digital product has at least three layers working together. Understanding where each layer begins and ends is one of the most practical skills a PM can develop — it directly affects how you scope work, estimate effort, and communicate with your engineering team.</p><p><strong>Frontend</strong> is everything the user sees and touches — the interface. In a mobile app, it's the screens, buttons, lists, and animations. In a website, it's the page in the browser. The frontend is the "face" of the product. When Netflix redesigns its home screen to show bigger thumbnails, or when Airbnb updates the search bar on mobile, those are frontend changes. They're visible, they feel immediate — but on mobile apps, they require a new release that goes through App Store or Google Play review before users can see it.</p><p><strong>Backend</strong> is the brain behind the scenes. It's where business rules live, logic runs, and communication with other systems happens. The user never sees the backend directly — but they feel it constantly. When Spotify generates your "Discover Weekly" playlist every Monday, that's the backend running a machine learning algorithm against your listening history. When Uber's app shows surge pricing during a storm, the backend is calculating demand and supply in real time. None of that involves changing the app on your phone — it all happens server-side, instantly, without any update required.</p>`,
      diagramKey: 'three-layer-arch',
      diagramCaption: 'The three layers of every digital product',
      inlineQuestion: {
        type: 'mcq',
        q: 'A team wants to change the feed ranking algorithm. Which layer is primarily affected?',
        opts: ['Frontend — changes what the user sees', 'Backend — logic and data processing', 'Database — affects storage', 'Frontend and Backend equally'],
        correct: 1,
      },
    },
    {
      html: `<p><strong>Database</strong> is the long-term memory. It stores information that needs to persist: user accounts, orders, product catalogs, history. Without it, the app would "forget" everything every time it closed. When you pause a Netflix show and resume it three days later on a different device, the database remembered exactly where you left off. When you look at your Uber trip history from two years ago, that's a database query returning records that were stored the moment your trip ended.</p><div class="analogy">Think of a restaurant. The <strong>frontend</strong> is the dining room — what the customer sees: the ambiance, the menu design, the decor. The <strong>backend</strong> is the kitchen — where food is prepared, recipes are followed, and orders are prioritized. The <strong>database</strong> is the pantry and the reservation book — it stores what's available, who ordered what, and the full history of every transaction.</div>`,
      diagramKey: 'client-server-flow',
      diagramCaption: 'A request flowing from the browser to the database and back',
      inlineQuestion: {
        type: 'reflect',
        prompt: 'Think of an app you use every day. Can you identify what is frontend, backend, and database in it?',
      },
    },
  ],
  // ── Module 2: APIs ─────────────────────────────────────────
  [
    {
      html: `<h2>APIs: The Language Systems Use to Talk to Each Other</h2><p>An API (Application Programming Interface) is a defined contract that lets two systems exchange information. It specifies what requests are valid, what data to send, and what response to expect. APIs are everywhere — they're what makes modern software composable, scalable, and fast to build.</p><p>Think of an API like a restaurant menu. The menu tells you what you can order (available endpoints), what information you need to provide (parameters), and what you'll receive in return (the response). You don't need to know how the kitchen prepares the food — you just need to know the menu.</p><p>When you open a weather app and it shows today's forecast, it's calling a weather API. When you log in with Google, the app is calling Google's Auth API. When Uber shows you nearby drivers, it's calling Google Maps' API for maps, and its own internal APIs for driver locations and pricing. A single user action often triggers dozens of API calls behind the scenes.</p>`,
      diagramKey: 'rest-api-request',
      diagramCaption: 'A REST request: the client asks, the server responds with JSON',
      inlineQuestion: {
        type: 'mcq',
        q: 'You need to retrieve product data without changing anything on the server. Which HTTP method do you use?',
        opts: ['POST', 'GET', 'DELETE', 'PATCH'],
        correct: 1,
      },
    },
    {
      html: `<p><strong>REST APIs</strong> are the most common type. They use standard HTTP methods to indicate what kind of operation you want to perform. Each request goes to a URL called an endpoint, and the response is usually JSON — a lightweight data format both humans and machines can read easily.</p><h3>HTTP Methods — What Each One Does</h3><p>Think of these as verbs: they tell the server <em>what action</em> to take on a resource.</p><p><strong>GET — Retrieve data</strong><br/>Fetches information without changing anything. Safe to repeat. Can be cached.<br/><code>GET /api/products</code> → returns a list of products<br/><code>GET /api/products/42</code> → returns product #42 only</p><p><strong>POST — Create a new resource</strong><br/>Sends data to the server to create something new. Each call creates a new record.<br/><code>POST /api/orders</code> with <code>&#123; productId: 42, quantity: 1 &#125;</code> → creates a new order<br/><code>POST /api/users</code> → creates a new user account</p><p><strong>PUT — Replace an entire resource</strong><br/>Replaces a full record with the data you send. If you omit a field, it gets wiped.<br/><code>PUT /api/products/42</code> with the full product object → replaces product #42 entirely</p><p><strong>PATCH — Update specific fields only</strong><br/>Updates only the fields you specify, leaving everything else unchanged. Use this when you want to change one thing without resending the whole object.<br/><code>PATCH /api/products/42</code> with <code>&#123; price: 29.90 &#125;</code> → updates only the price of product #42</p><p><strong>DELETE — Remove a resource</strong><br/>Deletes the specified record from the server.<br/><code>DELETE /api/products/42</code> → removes product #42</p><div class="analogy"><strong>Why PMs care:</strong> GET is the only method that's safe to retry — it never changes state. The others all modify data. This affects caching, retry logic, and what happens if a request fails and is re-sent. When an engineer says "that's not idempotent," they usually mean using POST when PATCH would be safer.</div><p><strong>HTTP Status Codes</strong> tell you what happened: 200 = success, 201 = created, 400 = bad request (your fault), 401 = unauthorized, 404 = not found, 500 = server error (their fault). As a PM, knowing these helps you read error logs and have precise conversations with engineers about what's failing and why.</p>`,
      imageUrl: '/api-diagram.png',
      imageCaption: 'A real-world API architecture: an API Gateway routing requests to internal services (loyalty, partner) and external systems (Salesforce) via a message broker.',
      diagramKey: 'http-status-codes',
      diagramCaption: 'Three categories of HTTP status — who is responsible for the error?',
      inlineQuestion: {
        type: 'reflect',
        prompt: 'Think of the last time you saw an error screen in an app. Based on what you just learned, can you identify which category of problem it was?',
      },
    },
  ],
  // ── Module 3: Architecture & Scale ────────────────────────
  [
    {
      html: `<h2>How Systems Are Built to Handle Millions of Users</h2><p>When a product grows from 100 to 10 million users, the underlying architecture has to evolve. What works at small scale breaks at large scale — and vice versa. Understanding architecture helps PMs make smarter trade-offs about build speed, reliability, and cost.</p><p><strong>Monolith vs. Microservices:</strong> A monolith is one large application where all features are bundled together. Simple to build and deploy early on, but harder to scale — one slow feature can slow everything. Microservices split the system into small independent services (auth, payments, notifications, search), each deployable and scalable on its own. The tradeoff: more operational complexity in exchange for more flexibility.</p><p><strong>Scaling:</strong> Vertical scaling means making one server more powerful (bigger machine). Horizontal scaling means adding more servers and distributing the load. Most modern systems favor horizontal scaling — it's more resilient (if one server fails, others keep going) and more cost-effective at large scale.</p>`,
      diagramKey: 'monolith-vs-micro',
      diagramCaption: 'Monolith vs Microservices — simplicity vs independence trade-off',
      inlineQuestion: {
        type: 'mcq',
        q: 'The notifications service is slow and affecting the entire app. In which architecture is it easier to isolate and fix this?',
        opts: ['Monolith — simpler to fix', 'Microservices — each service is independent', 'Both the same', 'Depends on the database'],
        correct: 1,
      },
    },
    {
      html: `<p><strong>Caching:</strong> Rather than hitting the database for every request, frequently-accessed data is stored in fast memory (like Redis). This dramatically reduces load and latency. When you open Twitter and your feed loads instantly, that's partly caching — your timeline was pre-computed and stored, not freshly queried.</p><p><strong>Load Balancers</strong> sit in front of servers and distribute incoming requests evenly. They also detect when a server is unhealthy and stop sending traffic to it — a key part of how services stay available even when individual servers fail.</p><p><strong>Feature Flags</strong> let you deploy code to production but keep features turned off until you're ready. This lets engineers ship code continuously without exposing unfinished features — and lets PMs do controlled rollouts, A/B tests, or instant rollbacks without a new deployment.</p>`,
      diagramKey: 'horizontal-scaling',
      diagramCaption: 'Load balancer distributes traffic across multiple servers',
      inlineQuestion: {
        type: 'reflect',
        prompt: 'Your team wants to do a gradual rollout of a new feature to 5% of users. What mechanism would you use and why?',
      },
    },
  ],
  // ── Module 4: Design Systems ───────────────────────────────
  [
    {
      html: `<h2>Design Systems: The Foundation of Consistent Products</h2><p>A design system is a shared library of reusable components, guidelines, and standards that teams use to build products consistently. It's the bridge between design and engineering — a single source of truth that prevents the "twelve slightly different buttons" problem.</p><p>Without a design system, every team builds their own version of common elements. Three teams might build three different card components — different spacing, different hover states, different accessibility behavior. Users experience inconsistency. Engineers duplicate work. Designers can't move fast because they're constantly remaking decisions already made.</p><p><strong>What's in a design system?</strong> Tokens (colors, spacing, typography as variables), components (Button, Card, Modal, Input, Toast), patterns (how to compose components into flows), and documentation. Tools like Figma hold the design side; component libraries in React, Vue, or Swift hold the code side. The best design systems keep both in sync.</p>`,
      diagramKey: 'design-system-layers',
      diagramCaption: 'Design system hierarchy: tokens → components → patterns → product',
      inlineQuestion: {
        type: 'mcq',
        q: 'Three teams built different versions of a "Card" component. What is the main cost of this?',
        opts: ['Slower performance', 'Visual inconsistency and duplicated effort', 'Security problems', 'Higher infrastructure cost'],
        correct: 1,
      },
    },
    {
      html: `<p><strong>Server-Driven UI</strong> is an architecture where the server sends layout instructions, not just data. Instead of the app hardcoding where to show a banner or which components appear on a screen, the server tells it: "show a hero card, then a carousel, then a list." This lets you change the app's layout without a new release — powerful for promotions, experiments, and personalization at scale.</p><p><strong>Why PMs care:</strong> Design system health directly affects your team's velocity. A mature design system means new screens are assembled in hours, not days. It means accessibility is built-in, not bolted on. And it means design debt doesn't accumulate silently — inconsistencies become visible and trackable.</p>`,
      diagramKey: 'server-driven-ui',
      diagramCaption: 'Server-Driven UI: the server decides the layout, the app renders it',
      inlineQuestion: {
        type: 'reflect',
        prompt: 'Your app needs to change the home screen layout during a flash sale without going through App Store review. What architecture would make that possible?',
      },
    },
  ],
  // ── Module 5: Performance ──────────────────────────────────
  [
    {
      html: `<h2>Performance: Why Speed Is a Product Decision</h2><p>Watch the video below for a quick overview of Core Web Vitals — the three metrics Google uses to measure real-world user experience.</p>`,
      videoUrl: 'https://www.youtube.com/watch?v=0fONene3OIA',
      videoCaption: 'This video will cover a lot of what we will study in this module. It\'s a little bit technical, but fun to watch.',
    },
    {
      html: `<h2>The Three Core Web Vitals</h2><p>Performance is often treated as a purely technical concern, but it's fundamentally a product decision with direct business consequences. Google's Core Web Vitals are the three metrics that matter most — they directly affect SEO rankings, ad quality scores, and user retention.</p><p><strong>Largest Contentful Paint (LCP)</strong> — measures loading performance. Specifically, how long until the largest visible element (a hero image, a headline, a video thumbnail) is fully rendered. A good LCP is under 2.5 seconds. High LCP usually points to slow servers, unoptimized images, or render-blocking JavaScript.</p><p><strong>First Input Delay (FID)</strong> — measures interactivity. How long from when a user first clicks or taps something to when the browser actually responds. A good FID is under 100ms. High FID means the browser's main thread is too busy (usually heavy JavaScript) to react to user input.</p><p><strong>Cumulative Layout Shift (CLS)</strong> — measures visual stability. Have you ever tried to tap a button and the page shifted right as you clicked, making you hit the wrong thing? That's layout shift. CLS scores how much elements unexpectedly move during load. A good CLS is under 0.1. Common causes: images without defined dimensions, ads injected above content, fonts loading late.</p><div class="analogy"><strong>Why PMs care:</strong> Google uses Core Web Vitals as a ranking signal — poor scores hurt organic search visibility. More importantly, each metric maps directly to user frustration: slow loading, unresponsive taps, and surprise clicks are among the most common reasons users abandon a product.</div>`,
      diagramKey: 'perf-timeline',
      diagramCaption: 'Performance timeline: each metric captures a different moment',
      inlineQuestion: {
        type: 'mcq',
        q: 'Which metric indicates when the user can INTERACT with the page, not just view it?',
        opts: ['Time to First Byte (TTFB)', 'First Contentful Paint (FCP)', 'Largest Contentful Paint (LCP)', 'Time to Interactive (TTI)'],
        correct: 3,
      },
    },
    {
      html: `<p><strong>Percentiles matter:</strong> When engineers say "P50 is 1.2s, P95 is 4.8s," they mean the median user loads in 1.2s but 5% of users wait 4.8s. PMs should care about tail latency — those slow users are often your highest-value users in difficult network conditions (emerging markets, older devices).</p><p><strong>Key techniques:</strong> Lazy loading (load images/components only when needed), code splitting (send only the JavaScript for the current page), CDN (serve assets from servers close to the user), and caching (reuse responses that haven't changed).</p>`,
      diagramKey: 'latency-percentiles',
      diagramCaption: 'P50 shows the typical user — P95 and P99 show the long tail',
      inlineQuestion: {
        type: 'reflect',
        prompt: 'You have an infinite scroll feed with many images. Which performance techniques would you prioritize and why?',
      },
    },
  ],
  // ── Module 6: State Management ────────────────────────────
  [
    {
      html: `<h2>State: The Memory of Your UI</h2><p>"State" is any data that can change and affects what the user sees. Every app is constantly managing state: which tab is selected, what's in the cart, whether the user is logged in, what the search results are. Understanding state helps PMs diagnose bugs, scope features accurately, and understand why some changes are "simple" and others are not.</p><p><strong>Local vs. Global State:</strong> Local state lives in one component and doesn't need to be shared — a dropdown that's open or closed, a text field's current value. Global state is shared across the app — the current user's profile, a shopping cart, a notification count. The rule of thumb: keep state as local as possible. Global state is powerful but introduces complexity — a change in one place can have unexpected effects elsewhere.</p><p><strong>State synchronization</strong> is one of the hardest problems in frontend engineering. When the same data needs to be consistent across multiple views — the cart count in the header, the cart page, and the checkout flow — keeping them in sync requires careful architecture. When bugs arise from stale or inconsistent state, they're often hard to reproduce because they depend on specific sequences of user actions.</p>`,
      diagramKey: 'local-vs-global-state',
      diagramCaption: 'Local vs global state — where each type of data should live',
      inlineQuestion: {
        type: 'mcq',
        q: 'A user added an item to the cart but the header icon still shows 0. What is the most likely cause?',
        opts: ['Visual bug in the cart icon', 'Local state not propagated to global state', 'Network error in the API call', 'Database bug'],
        correct: 1,
      },
    },
    {
      html: `<p><strong>Optimistic UI</strong> is a technique where the UI shows the expected result before the server confirms it. When you like a tweet, the heart turns red instantly — the app doesn't wait for the server to confirm. If the server request fails, it reverts. This makes apps feel dramatically faster but adds complexity: you need to handle rollback gracefully.</p><p><strong>Why PMs care:</strong> State bugs are often the most confusing for users — "it showed X before, now it shows Y, I didn't change anything." Understanding state helps you write better bug reports, ask smarter engineering questions, and anticipate edge cases in complex flows like multi-step forms or real-time collaboration features.</p>`,
      diagramKey: 'optimistic-ui-flow',
      diagramCaption: 'Optimistic UI: the interface updates before server confirmation',
      inlineQuestion: {
        type: 'reflect',
        prompt: "You're implementing a like button. The heart turns red instantly. What problematic scenario could arise with this approach?",
      },
    },
  ],
  // ── Module 7: Versioning & APIs ───────────────────────────
  [
    {
      html: `<h2>API Versioning and Backwards Compatibility</h2><p>APIs rarely stay static. Products evolve, requirements change, and what made sense at v1 doesn't always hold at v3. API versioning is the practice of managing those changes in a way that doesn't break existing clients. For PMs, this matters because versioning decisions directly affect how fast you can ship, how much engineering debt accumulates, and how you coordinate changes across mobile, web, and partner integrations.</p><p><strong>Why versioning is hard:</strong> When you change an API, every client consuming it may break. A mobile app on a user's device from 6 months ago might still be calling the old API. A third-party partner might not update their integration for weeks. "Just rename the field" sounds simple — until you realize five different clients are reading that field, some of which you don't control.</p><p><strong>Semantic Versioning (SemVer)</strong> uses three numbers: MAJOR.MINOR.PATCH (e.g., 2.4.1). PATCH = bug fix, no behavior change. MINOR = new feature, backwards compatible. MAJOR = breaking change — old clients may need to update. For PMs, a MAJOR version bump is a coordination event: it requires communication, migration plans, and sometimes extended support for the old version.</p>`,
      diagramKey: 'semver-breakdown',
      diagramCaption: 'SemVer: what each number means for API consumers',
      inlineQuestion: {
        type: 'mcq',
        q: 'An API version changed from v2.1.0 to v3.0.0. What does this signal to consumers?',
        opts: ['Bug fixes only — safe to update', 'New feature, backwards compatible', 'Breaking change — old integrations may break', 'Documentation update only'],
        correct: 2,
      },
    },
    {
      html: `<p><strong>Deprecation strategy:</strong> Rather than removing old fields or endpoints immediately, the standard practice is to deprecate — mark something as "going away" but keep it working for a transition period. This gives clients time to migrate. A common timeline: announce deprecation, keep it live for 6-12 months, then remove. Removing too fast breaks partners; removing too slowly accumulates technical debt.</p><p><strong>Backwards compatibility</strong> means new versions of your API still work for old clients. Adding new optional fields is backwards compatible. Removing or renaming fields is not. For PMs thinking about API design: prefer additive changes (add new fields, new endpoints) over destructive ones (rename, remove, change behavior).</p>`,
      diagramKey: 'deprecation-timeline',
      diagramCaption: 'Deprecation strategy: announce, run in parallel, then remove',
      inlineQuestion: {
        type: 'reflect',
        prompt: 'You need to rename an API field that 5 different teams consume. How would you handle this transition with minimum risk?',
      },
    },
  ],
  // ── Module 8: Auth & Security ──────────────────────────────
  [
    {
      html: `<h2>Authentication, Authorization, and Security Basics for PMs</h2><p>Security is often invisible until it fails — at which point it becomes front-page news. PMs don't need to implement security, but they need to understand the concepts well enough to make informed decisions about product features, ask the right questions during planning, and recognize when engineering pushback on a "simple" feature is actually protecting the product.</p><p><strong>Authentication vs. Authorization:</strong> Authentication answers "who are you?" — it's the login process that verifies identity. Authorization answers "what are you allowed to do?" — it's the permission system that determines access. Confusing them is a common source of security bugs. A user might be authenticated (logged in) but not authorized (not allowed to access admin features).</p><p><strong>OAuth 2.0</strong> is the standard protocol behind "Login with Google/Apple/GitHub." Instead of your app handling the user's password, the user logs in through the provider, which returns a token confirming identity. Your app never sees the user's Google password — it only receives permission to access specific data (email, profile). This is both more secure (fewer places passwords are stored) and better UX (users don't create yet another password).</p>`,
      diagramKey: 'auth-vs-authz',
      diagramCaption: 'Authentication confirms who you are. Authorization defines what you can do.',
      inlineQuestion: {
        type: 'mcq',
        q: 'A logged-in user tries to access the admin panel. The system denies access. This is a problem of:',
        opts: ['Authentication — identity not verified', 'Authorization — permission not granted', 'OAuth — invalid token', 'LGPD — sensitive data'],
        correct: 1,
      },
    },
    {
      html: `<p><strong>Tokens and Sessions:</strong> After authentication, the server gives the client a token (usually a JWT — JSON Web Token) that proves identity on future requests. Tokens expire — this is intentional. Short-lived tokens limit the damage if one is stolen. Refresh tokens let the app get a new token without re-login, balancing security with UX.</p><p><strong>Data privacy basics:</strong> GDPR (Europe) and LGPD (Brazil) require explicit consent for data collection, the right to deletion, and transparency about how data is used. For PMs: any feature that collects personal data — location, health, browsing behavior — needs a privacy review before it's built, not after. The "move fast" mindset applied to user data can result in significant legal and reputational risk.</p>`,
      diagramKey: 'oauth-flow',
      diagramCaption: 'OAuth flow: your app never sees the user\'s password',
      inlineQuestion: {
        type: 'reflect',
        prompt: 'Your team wants to continuously collect user location for a new feature. What questions would you ask before approving it?',
      },
    },
  ],
  // ── Module 9: DevOps ───────────────────────────────────────
  [
    {
      html: `<h2>DevOps: How Code Gets From a Developer's Laptop to Production</h2><p>DevOps is the set of practices that bridges software development and operations — specifically, how code gets built, tested, and deployed reliably and repeatedly. Understanding DevOps helps PMs have informed conversations about release timelines, understand why "just ship it" isn't always simple, and advocate for engineering practices that reduce risk.</p><p><strong>CI/CD (Continuous Integration / Continuous Delivery):</strong> CI is the practice of merging code changes frequently and running automated tests on every merge. CD extends this — when CI passes, the code is automatically staged for deployment (or deployed directly to production). A healthy CI/CD pipeline means: every code change is tested, deployment is repeatable and predictable, and the team can ship multiple times per day safely.</p><p><strong>Environments:</strong> Code typically moves through multiple environments: Local (developer's machine) → Development/Staging (shared test environment) → Production (real users). Each environment is a checkpoint. Staging should mirror production as closely as possible — bugs caught in staging are cheap; bugs in production are expensive.</p>`,
      diagramKey: 'cicd-pipeline',
      diagramCaption: 'CI/CD pipeline: each commit triggers automated tests before deploy',
      inlineQuestion: {
        type: 'mcq',
        q: 'The team deployed a change and the error rate spiked. What is the correct first action?',
        opts: ['Debug in production until you find the cause', 'Roll back immediately, investigate afterwards', 'Shut down servers until the bug is fixed', 'Ask users to clear their cache'],
        correct: 1,
      },
    },
    {
      html: `<p><strong>Rollbacks and Feature Flags:</strong> When a deployment causes issues, the fastest fix is a rollback — reverting to the previous version. Feature flags make this even faster: you can disable a feature without deploying new code. PMs should always ask: "what's our rollback plan?" before a major release. The answer to this question reveals how risky the deployment actually is.</p><p><strong>Monitoring and Observability:</strong> Once code is in production, you need to know if it's working. Monitoring tracks metrics (error rate, latency, CPU usage) and alerts when thresholds are exceeded. Observability goes deeper — it gives you the tools to understand why something is failing, not just that it is. Logs, traces, and metrics together form the "three pillars of observability."</p>`,
      diagramKey: 'environments-flow',
      diagramCaption: 'Environments: the cost of a bug grows the further it gets in the pipeline',
      inlineQuestion: {
        type: 'reflect',
        prompt: 'Describe what an ideal CI/CD pipeline would look like for your current team. What is missing today?',
      },
    },
  ],
  // ── Module 10: Technical Metrics ──────────────────────────
  [
    {
      html: `<h2>Technical Metrics Every PM Should Know</h2><p>Product metrics (DAU, conversion, retention) get all the attention, but technical metrics directly impact them. A product that's slow, unreliable, or buggy hemorrhages users and revenue regardless of how good the features are. PMs who understand technical metrics can advocate for engineering quality as a product priority — not just as "engineering hygiene."</p><p><strong>Availability and Uptime:</strong> Usually expressed as a percentage. 99.9% uptime sounds excellent — it allows 8.7 hours of downtime per year. 99.99% ("four nines") allows only 52 minutes. For a payment system or real-time product, the difference between three nines and four nines is enormous. SLAs (Service Level Agreements) with enterprise customers often have financial penalties for missing uptime targets.</p><p><strong>Error Rate:</strong> What percentage of requests fail. A 0.1% error rate on 10 million daily requests is 10,000 failed interactions — each one a frustrated user. Error rates should be tracked by endpoint, not just globally, so you can identify which specific flows are degrading.</p><p><strong>Latency Percentiles:</strong> P50 (median), P95, P99. The median tells you about the typical user. P95 and P99 tell you about the long tail — often high-value users in challenging conditions. Optimizing only for the median can mask serious problems affecting a meaningful minority of users.</p>`,
      diagramKey: 'uptime-comparison',
      diagramCaption: 'Each additional "nine" dramatically changes the allowed downtime',
      inlineQuestion: {
        type: 'mcq',
        q: 'A system has 99.9% uptime. How much downtime does that represent per year?',
        opts: ['About 5 minutes', 'About 52 minutes', 'About 8.7 hours', 'About 3.65 days'],
        correct: 2,
      },
    },
    {
      html: `<p><strong>Cycle Time and Deployment Frequency:</strong> How long from "code complete" to "in production," and how often the team deploys. High-performing engineering teams deploy multiple times per day with low cycle times. If cycle time is weeks, it's a signal of process bottlenecks — large PRs, manual processes, or insufficient test coverage — that slow down product iteration.</p><p><strong>Technical Debt:</strong> The accumulated cost of taking shortcuts. Every shortcut that's not paid back makes future development slower. PMs need to budget time for debt reduction — not as a concession to engineering, but as an investment in velocity. Products that ignore technical debt eventually slow to a crawl, regardless of team size.</p>`,
      diagramKey: 'cycle-time-chart',
      diagramCaption: 'High cycle time = features reach users more slowly',
      inlineQuestion: {
        type: 'reflect',
        prompt: 'Your team cycle time increased from 7 to 18 days. What questions would you ask to investigate the root cause?',
      },
    },
  ],
];

const QAS_EN: QA[][] = [
  // Module 1 — 6 questions
  [
    { q: "What is the difference between frontend and backend?", a: "Frontend is everything the user sees and interacts with (the interface). Backend is the logic, business rules, and data processing that happen on the server — invisible to users, but felt in every interaction." },
    { q: "Why can backend changes be deployed instantly while mobile app changes need App Store review?", a: "Backend runs on servers you control — you update the server, all users get the new behavior immediately. Mobile app code runs on the user's device, so any change to the app itself requires a new version to be published and downloaded through the App Store or Google Play." },
    { q: "What is a database and why does every app need one?", a: "A database is persistent storage — it remembers data across sessions, devices, and time. Without it, apps would reset to zero every time they were closed. It's what allows Netflix to remember your watch position, Uber to show your trip history, or Spotify to keep your playlists." },
    { q: "What does 'server-side rendering' mean and why does it matter for performance?", a: "Server-side rendering (SSR) means the HTML is generated on the server before being sent to the browser, instead of being built in the browser with JavaScript. The user sees content faster because there's no need to wait for JavaScript to download and execute. It also helps with SEO since search engines can crawl the fully-rendered HTML." },
    { q: "A backend engineer says 'this is a stateless API.' What does that mean?", a: "A stateless API means each request contains all the information needed to process it — the server doesn't store session data between requests. Each call is independent. This makes the backend easier to scale horizontally because any server can handle any request without needing to know what happened before." },
    { q: "Why do some changes go live instantly while others require users to update the app?", a: "Changes to the backend (server logic, algorithms, data) go live instantly because they happen on servers you control. Changes to the app's own code — screens, navigation, UI components — require an update on the user's device. Web apps update on next page load. Mobile apps must go through App Store or Google Play review first." },
  ],
  // Module 2 — 6 questions
  [
    { q: "What is an API and why do PMs need to understand it?", a: "An API is a contract between systems that defines how they can exchange data. PMs need to understand APIs because almost every product feature that involves external services, data from another team, or mobile-to-backend communication involves APIs. When something breaks, when a partner integration is delayed, or when a new feature requires data from another team — API knowledge lets you diagnose and discuss the problem precisely." },
    { q: "What's the difference between GET, POST, PUT, PATCH, and DELETE?", a: "GET retrieves data without changing anything (safe to repeat). POST creates a new resource. PUT replaces an entire resource. PATCH updates specific fields only. DELETE removes a resource. For PMs, the most important distinction is GET vs. everything else — GET requests can be cached and repeated safely; others change state and can't." },
    { q: "A user reports seeing a blank screen after tapping 'checkout.' The error log shows a 503. What does this tell you?", a: "503 means 'Service Unavailable' — the server is overloaded or down. This is a backend/infrastructure issue, not a frontend bug or a user error. The right next step is checking whether the payment service or backend is having an outage, not investigating the app's UI code." },
    { q: "What is a webhook and how is it different from a regular API call?", a: "A regular API call is initiated by the client — you ask, the server responds. A webhook is the reverse: the server notifies you when something happens. For example, Stripe uses a webhook to tell your app 'payment succeeded' instead of your app polling every few seconds. Webhooks are event-driven: you register a URL and the external service calls it when the event occurs." },
    { q: "What does 'API rate limiting' mean and why should PMs care?", a: "Rate limiting caps how many API requests a client can make in a given window (e.g., 1,000 per minute). If exceeded, you get a 429 error. PMs should care because: (1) features depending on external APIs may hit limits at scale; (2) many APIs charge per request; (3) it requires engineering to implement caching or queuing strategies when building high-volume features." },
    { q: "What is the difference between synchronous and asynchronous API calls?", a: "A synchronous call blocks until the server responds — the app waits and does nothing else. An asynchronous call lets the app continue working while waiting. Most modern apps use async calls to avoid freezing the UI. For PMs, this matters when scoping features: a heavy synchronous operation can freeze the entire screen; async operations enable loading states and better perceived performance." },
  ],
  // Module 3 — 6 questions
  [
    { q: "What's the main difference between a monolith and microservices, and when does each make sense?", a: "A monolith is a single deployable unit where all features are bundled. It's simpler to build and debug — great for early-stage products. Microservices split features into independent services that communicate via APIs. They enable teams to work independently and scale specific components, but add operational complexity. Most successful products start as monoliths and evolve toward microservices as they grow." },
    { q: "What is a feature flag and why is it valuable to PMs?", a: "A feature flag is a configuration switch that lets you enable or disable a feature without deploying new code. For PMs, this is powerful: you can release code to production but only show the feature to 1% of users, specific user segments, or internal testers. It decouples deployment from release, enables safer rollouts, and allows instant rollback without an emergency deployment." },
    { q: "What is horizontal scaling and why is it preferred over vertical scaling at large scale?", a: "Vertical scaling adds more power to one server (bigger CPU, more RAM). It has a ceiling — there's a limit to how powerful one machine can get, and if it fails, everything fails. Horizontal scaling adds more servers and distributes load across them. It's more resilient (no single point of failure), theoretically unlimited, and often cheaper. Most cloud infrastructure is designed for horizontal scaling." },
    { q: "What is a CDN and why does it matter for product performance?", a: "A CDN (Content Delivery Network) is a globally distributed network of servers that cache static assets (images, CSS, JavaScript) close to users. Instead of every user fetching files from a single server in one location, they get them from the nearest node. This reduces latency dramatically — a user in São Paulo gets assets from a nearby server instead of one in Virginia. CDN usage is one of the highest-leverage performance improvements with minimal engineering effort." },
    { q: "What is a database index and when does a PM need to understand it?", a: "A database index speeds up queries on specific columns — like a book index that lets you find a topic without reading every page. Without indexes, the database scans every row. With them, lookups are dramatically faster. PMs need to understand this when investigating slow features: a page that loads slowly under scale often has a missing index as the root cause. When engineers say 'we need to add an index,' it's usually a targeted, low-risk fix with high impact." },
    { q: "What is eventual consistency and why does it matter for product design?", a: "Eventual consistency means that after a write, not all parts of the system will immediately reflect the change — but they will converge to the same state eventually. After you post a tweet, some users might not see it for a fraction of a second. For PMs, this affects UI design: you can't always show the user their own action reflected instantly from the server. Features like follower counts, like counts, and feeds often use eventual consistency — and product design needs to account for that." },
  ],
  // Module 4 — 6 questions
  [
    { q: "What is a design system and why does it matter for product velocity?", a: "A design system is a shared library of components, tokens, and patterns used across the product. It matters for velocity because teams stop rebuilding the same elements from scratch and instead compose from a shared library. A new screen that might take a week to design and build from scratch can take a day when the components already exist, are tested, and are accessible." },
    { q: "What is Server-Driven UI and when is it valuable?", a: "Server-Driven UI (SDUI) is an architecture where the server sends layout instructions — not just data — to the client. The client renders whatever the server specifies, without hardcoded assumptions about what goes where. It's valuable when you need to change the app's layout frequently without shipping new app versions: promotions, A/B tests, personalized home screens, or emergency content changes." },
    { q: "A PM notices three teams have built different 'card' components. What's the cost of this?", a: "This is design system fragmentation. The costs are: inconsistent user experience, wasted engineering effort (three teams solving the same problem independently), duplicated bugs (a bug fixed in one card isn't fixed in others), and accessibility gaps (each team may implement accessibility differently or not at all). The fix is establishing one canonical card component in a shared library." },
    { q: "What is accessibility (a11y) and why should it be part of a design system?", a: "Accessibility means building products usable by people with disabilities — visual, motor, hearing, or cognitive. A design system is the right place to build accessibility in: if the Button component is keyboard-navigable and screen-reader compatible, every product that uses it gets accessibility for free. Retrofitting accessibility feature by feature is far more expensive. In Brazil, Lei Brasileira de Inclusão and WCAG guidelines increasingly shape legal and market expectations." },
    { q: "What is the difference between a design token and a component?", a: "A token is a design decision expressed as a named variable: `color-primary: #00896F`, `spacing-md: 16px`. A component is a UI building block (Button, Card) that uses tokens. Tokens enable global changes with minimal effort — if you update `color-primary`, every component that references it updates automatically. Components are the assembled pieces; tokens are the shared vocabulary that keeps them consistent." },
    { q: "A PM hears that the design system team wants to 'deprecate' a component. What does this mean in practice?", a: "Deprecating a component means it's scheduled for removal but still works for now. Teams using it get advance notice to migrate to the replacement. In practice: the deprecated component gets a warning in documentation, a timeline is set, and the design system team may offer migration support. For PMs, this is a coordination event — if your product uses the deprecated component, you need to budget engineering time to migrate before the removal date." },
  ],
  // Module 5 — 6 questions
  [
    { q: "What is Time to Interactive (TTI) and why is it different from 'page loaded'?", a: "TTI is when the page becomes fully interactive — not just visually complete, but responsive to clicks, taps, and input. A page can appear loaded (images visible, content showing) but still be blocked by JavaScript executing in the background. During that gap, user clicks do nothing — a frustrating and often invisible experience that TTI captures." },
    { q: "What is lazy loading and when should PMs push for it?", a: "Lazy loading means deferring the load of assets (images, components, data) until they're actually needed — typically when they scroll into view. PMs should advocate for it on any long-scroll page with images (feeds, product listings, article pages) or any feature loaded below the fold. It reduces initial load time, saves bandwidth for users on mobile data, and improves perceived performance without changing what users see." },
    { q: "An engineer says 'P50 is 1.5s and P95 is 6s.' What should a PM take from this?", a: "P50 means the median user loads in 1.5s — acceptable. P95 means 5% of users wait over 6 seconds — that's a serious problem. Depending on your scale, 5% could be millions of users. These are often users on slow networks or older devices — frequently in emerging markets that may be key growth targets. Tail latency (P95, P99) often reveals real-world pain that median metrics hide." },
    { q: "What is the difference between perceived performance and actual performance?", a: "Actual performance is what the metrics say — LCP at 2.4s, TTI at 3.1s. Perceived performance is how fast the user feels the app is. These can diverge: a page that shows a loading skeleton immediately feels faster than one that shows a blank screen for the same actual load time. PMs should optimize both: improve actual metrics and design loading states that improve perceived speed." },
    { q: "What is a Core Web Vital and why does it affect the product roadmap?", a: "Core Web Vitals are Google's real-world performance metrics: LCP (loading), INP (interactivity), and CLS (visual stability). Google uses them as a ranking signal — slow sites rank lower in search results. For PMs whose products depend on organic search traffic, Core Web Vitals scores directly affect acquisition. Poor scores don't just hurt users; they hurt SEO and growth." },
    { q: "What is Cumulative Layout Shift (CLS) and what causes it?", a: "CLS measures visual instability — how much page elements unexpectedly move while loading. A classic cause: an image without defined dimensions loads and pushes text down. Or an ad loads and shifts everything below it. Users end up clicking the wrong thing just as an element moves. For PMs, CLS is a UX problem often caused by missing image dimensions, late-loading embeds, or dynamically injected content." },
  ],
  // Module 6 — 6 questions
  [
    { q: "What is state in the context of a frontend app?", a: "State is any data that can change and causes the UI to update. Examples: whether a modal is open, what's in the shopping cart, the current user's name, the results of a search. Every interactive element in an app is backed by state — and managing that state correctly is one of the core challenges of frontend development." },
    { q: "A user reports a bug: 'I added an item to the cart on the product page, but the cart icon still shows 0.' What's likely wrong?", a: "This is a state synchronization bug. The local state for the cart was updated in the product component, but the global state that the cart icon reads from wasn't updated — or the update didn't propagate correctly. It's a common class of bug in apps that manage cart state in multiple places without a single source of truth." },
    { q: "What is optimistic UI and what's the main risk?", a: "Optimistic UI updates the interface immediately as if the action succeeded, without waiting for server confirmation. It makes apps feel instant. The risk: if the server request fails, the UI shows an incorrect state that then has to be rolled back — which can feel jarring if not handled gracefully (e.g., a like animation that un-likes, or a sent message that disappears)." },
    { q: "What is a race condition in frontend state and why is it hard to debug?", a: "A race condition happens when two async operations complete in an unexpected order, leaving state inconsistent. Example: a user types quickly in a search box, triggering two API calls. If the first call returns after the second, older results overwrite newer ones. Race conditions are hard to debug because they're timing-dependent — they only appear under specific conditions (slow network, fast user) and are hard to reproduce in development." },
    { q: "What is the difference between client-side and server-side state?", a: "Client-side state lives in the browser/app and doesn't persist beyond the session without explicit saving — UI state, form values, selected filters. Server-side state lives in the database and is the source of truth — user profiles, orders, messages. Features that mix these poorly create bugs: the client shows stale data because it cached a value that changed on the server. PMs encounter this as 'why does it show old data?' — the fix is usually a refetch or cache invalidation." },
    { q: "Why do multi-step forms often have hard-to-reproduce bugs?", a: "Multi-step forms accumulate state across steps — each step adds data that the next depends on. Bugs arise from edge cases in state transitions: what happens if the user goes back and changes a value a later step depends on? What if a session expires mid-flow? What if the user opens the form on two tabs? These sequences are hard to test exhaustively. PMs should explicitly scope these edge cases during feature definition — not leave them to be discovered in QA." },
  ],
  // Module 7 — 6 questions
  [
    { q: "Why can't an API just be updated in place without versioning?", a: "Because clients exist in the wild that you can't instantly update. Mobile apps on users' devices may be months old. Partners may have built integrations that won't be updated immediately. Changing an API in place — renaming a field, removing an endpoint — breaks all of them simultaneously. Versioning lets old clients keep working while new clients use the improved API." },
    { q: "What does a MAJOR version bump (e.g., v2 → v3) signal to a PM?", a: "A breaking change — the new API is not backwards compatible with the old one. Clients built against v2 will break if they call v3 without updating. For PMs, this is a coordination event: it requires advance notice to partners and internal teams, a migration guide, a parallel support period for both versions, and clear sunset dates. It's not just a technical event — it's a product and relationship management event." },
    { q: "What is a 'graceful fallback' and why should PMs know about it?", a: "A graceful fallback means the app handles missing or unexpected data without crashing — it degrades gracefully rather than failing completely. For PMs, this is important for two reasons: it makes the app more resilient during API transitions (old clients can still function even if a new field doesn't exist yet), and it's a key quality signal. Apps without graceful fallbacks create hard-to-reproduce bugs that only appear in specific version combinations." },
    { q: "What is an API contract and why is breaking it a product risk?", a: "An API contract is the documented promise of what an endpoint accepts and returns — field names, data types, required vs optional parameters. When you break the contract (rename a field, change a type, remove a parameter), every consumer that relied on it breaks. This is a product risk because it can affect partner integrations, third-party apps, mobile clients on old versions, and internal teams. Contracts should be treated like commitments — changing them requires coordination, not just a code push." },
    { q: "What is API pagination and why does it matter for PMs?", a: "Pagination means returning large datasets in chunks instead of all at once — 20 orders at a time instead of 10,000. PMs need to understand this because: (1) features that need to 'load all' data may be technically infeasible at scale; (2) infinite scroll and 'load more' patterns are pagination decisions; (3) data exports and bulk operations hit pagination constraints that need to be explicitly designed around." },
    { q: "What does 'idempotent' mean and why does it matter for payment APIs?", a: "An idempotent operation produces the same result whether you call it once or ten times. A well-designed payment API should be idempotent: if the user's network drops after submitting, the app can safely retry without charging them twice. This is achieved with idempotency keys — a unique ID sent with each request so the server recognizes duplicates. Without it, network retries can cause double charges." },
  ],
  // Module 8 — 6 questions
  [
    { q: "What's the difference between authentication and authorization, and why does the distinction matter?", a: "Authentication = proving identity (logging in). Authorization = proving you have permission to do something (access control). They're separate systems and must be checked independently. A logged-in user (authenticated) might not have permission to access admin settings (not authorized). Bugs arise when systems assume authentication implies authorization — a common and serious security flaw." },
    { q: "What does OAuth actually do, and why is it better than traditional username/password?", a: "OAuth lets users authenticate through a trusted provider (Google, Apple) instead of creating a new password with your app. The user proves identity to Google, Google gives your app a token confirming who the user is. Your app never handles or stores the user's Google password. Benefits: fewer passwords for users to manage, no password storage risk on your side, and the identity provider handles security (2FA, suspicious login detection) on your behalf." },
    { q: "A PM proposes collecting users' precise location continuously in the background. What should they think about before building?", a: "Several things: (1) Legal compliance — LGPD/GDPR require explicit informed consent for location data, especially persistent background tracking. (2) User trust — continuous location tracking is high-sensitivity; users who discover it without clear explanation churn and complain publicly. (3) Data minimization — do you actually need precise continuous location, or would periodic or approximate location serve the feature? (4) Security — this data, if breached, is sensitive. Collect only what you need, with clear consent, and have a deletion mechanism." },
    { q: "What is a JWT (JSON Web Token) and what do PMs need to know about token expiry?", a: "A JWT is a compact, signed token that carries identity claims (user ID, email, role) included in every request after login. Tokens have expiry times — typically 15 minutes to 24 hours. When a token expires, the user must re-authenticate or use a refresh token to get a new one. For PMs, token expiry affects UX: too short = users get logged out annoyingly; too long = stolen tokens stay valid longer. The right balance depends on the sensitivity of the product." },
    { q: "What is HTTPS and why is HTTP-only unacceptable for any product?", a: "HTTPS encrypts the connection between the user's browser and the server, preventing eavesdropping and tampering. Without it, anyone on the same network can read or modify data being transmitted — including login credentials, personal data, and session tokens. Modern browsers mark HTTP sites as 'Not Secure.' For any product that handles user data, HTTPS is non-negotiable. It also affects SEO — Google penalizes non-HTTPS sites." },
    { q: "What is SQL injection and why is it still one of the most common vulnerabilities?", a: "SQL injection happens when user input is inserted directly into a database query without sanitization, letting attackers run arbitrary queries. It's still common because it only takes one unvalidated input to expose an entire database. For PMs, the lesson is: any feature that takes user input and uses it in a database query needs a security review. Using parameterized queries (standard in modern frameworks) prevents it." },
  ],
  // Module 9 — 6 questions
  [
    { q: "What is CI/CD and why does it matter for product teams?", a: "CI (Continuous Integration) means developers merge code frequently and automated tests run on every change. CD (Continuous Delivery/Deployment) extends this — when tests pass, code is automatically deployed or staged for deployment. For product teams, this means faster, safer releases. Instead of massive monthly deploys that carry high risk, teams ship small increments frequently. PMs benefit from shorter feedback loops — features reach users faster, and problems are caught sooner." },
    { q: "The team deployed a change and the error rate is spiking. What's the first thing to do?", a: "Rollback — revert to the previous working version immediately. Don't try to debug in production under pressure. Once the system is stable and users are no longer affected, investigate the root cause in a controlled environment. This is why having a reliable rollback mechanism is a non-negotiable engineering practice, not a nice-to-have." },
    { q: "What's the difference between monitoring and observability?", a: "Monitoring tells you that something is wrong — an alert fires when error rate exceeds 5%, or latency spikes above a threshold. Observability tells you why — it gives you the tools (logs, traces, metrics) to diagnose the root cause. A monitored system tells you 'the server is slow.' An observable system tells you 'the database query on line 247 is taking 4 seconds because of a missing index.'" },
    { q: "What is infrastructure as code (IaC) and why does it reduce deployment risk?", a: "Infrastructure as code means defining servers, databases, and network configuration in version-controlled files rather than clicking through a console. This lets you spin up identical environments reproducibly. For PMs, this matters because: environments become consistent (staging truly mirrors production), changes to infrastructure go through code review, and disaster recovery becomes a script instead of a manual process. It directly reduces the 'works on staging, breaks on production' class of bugs." },
    { q: "What is a post-mortem and what makes it useful?", a: "A post-mortem is a structured review held after a production incident — what happened, why it happened, what was the impact, and what changes will prevent recurrence. A good post-mortem is blameless: it focuses on system failures, not individual mistakes. For PMs, post-mortems are valuable roadmap inputs — recurring incident patterns often reveal systemic gaps (missing tests, insufficient monitoring, unclear ownership) that should become engineering investments." },
    { q: "What is blue-green deployment and how does it reduce release risk?", a: "Blue-green deployment means running two identical production environments (blue = current, green = new version). Traffic is switched from blue to green once the new version is verified. If something goes wrong, you switch back instantly — rollback is a traffic switch, not a re-deploy, so it happens in seconds. For PMs, major releases carry less risk because the rollback plan is always 'flip the switch back.'" },
  ],
  // Module 10 — 6 questions
  [
    { q: "What does 99.9% uptime actually mean in practice?", a: "It means the system is allowed to be unavailable for 8.7 hours per year (about 43 minutes per month). While it sounds like 'almost always up,' for critical systems like payments, real-time communication, or e-commerce, even minutes of downtime can mean significant revenue loss and user trust damage. Enterprise SLAs often target 99.99% ('four nines') — which allows only 52 minutes of downtime per year." },
    { q: "The engineering team says cycle time increased from 7 to 18 days. What should a PM do with this information?", a: "Treat it as a product problem, not just an engineering problem. Longer cycle time means slower feedback loops — features take longer to reach users, which means slower learning and slower iteration. Investigate the cause with the team: are PRs too large? Is the test suite too slow? Are there too many manual steps in the deployment process? Cycle time is one of the most direct leading indicators of product velocity." },
    { q: "How should a PM communicate 'TTI is 3.2s at P50' to a business stakeholder?", a: "Translate it: 'Half of our users have to wait more than 3 seconds before they can use the app. Research shows every second of delay reduces conversion by 7% — so this likely costs us [X] in revenue.' Technical metrics need business context to be actionable. PMs are the translators between engineering reality and business impact." },
    { q: "What is MTTR (Mean Time to Recovery) and why is it as important as preventing incidents?", a: "MTTR measures how long it takes to restore service after an incident. A system can have incidents — the question is how fast you recover. A team with excellent MTTR resolves incidents in minutes; a team without good observability or runbooks may take hours. For PMs, MTTR is a reliability metric worth tracking alongside uptime: a system that fails rarely but takes 4 hours to recover is worse than one that fails occasionally but recovers in 5 minutes." },
    { q: "What is p99 latency and why might fixing it be a strategic priority?", a: "P99 latency means 1% of requests are slower than this threshold. At 10 million daily users, that's 100,000 people experiencing the worst performance. These are often the most engaged users — power users, enterprise accounts, users in challenging network conditions. Fixing p99 can disproportionately improve retention among your most valuable segment. PMs should ask for P99 breakdowns by user segment, not just overall averages." },
    { q: "What is 'toil' in engineering and why should PMs help reduce it?", a: "Toil is repetitive, manual operational work that doesn't add lasting value — manually restarting servers, copying data between systems, manually triggering deploys. Toil grows as systems scale and consumes engineering capacity that could be building features. For PMs, toil is worth surfacing because it slows feature delivery, causes engineer frustration, and indicates automation opportunities. Helping eliminate toil is an investment in long-term velocity." },
  ],
];

const QUIZZES_EN: QuizQuestion[][] = [
  [
    { q: "A PM wants to change the ranking algorithm. Is this primarily frontend or backend?", opts: ["Frontend — it changes what the user sees", "Backend — it changes logic and data processing", "Both equally", "Neither — it's a database change"], correct: 1 },
    { q: "Main advantage of cloud servers (like AWS)?", opts: ["They never go down", "Scale up or down based on demand", "Always faster than local servers", "No backend required"], correct: 1 },
    { q: "Best database type for complex relationships (users, orders, products)?", opts: ["NoSQL — faster", "SQL (relational) — handles structured data and relationships well", "Text files", "NoSQL — more flexible"], correct: 1 },
  ],
  [
    { q: "Updating only a price — which HTTP method?", opts: ["GET", "POST", "PUT", "PATCH"], correct: 3 },
    { q: "API returns 503. What does it mean?", opts: ["Malformed request", "Resource not found", "Server down or overloaded", "Not authenticated"], correct: 2 },
    { q: "Why can GET requests be cached but POST cannot?", opts: ["GET is faster", "GET only reads data (nothing changes), same response every time", "POST is encrypted", "GET is smaller in size"], correct: 1 },
  ],
  [
    { q: "Monolith is slowing down deploys. Which architecture helps?", opts: ["Bigger monolith with more servers", "Microservices — independent services", "Remove the database", "Move everything to frontend"], correct: 1 },
    { q: "What is a 'feature flag' for?", opts: ["Encrypting data", "Toggle features on/off without deployment", "Speed up queries", "Compress payloads"], correct: 1 },
    { q: "What is 'horizontal scaling'?", opts: ["More powerful server", "More servers sharing the load", "Faster code", "Fewer endpoints"], correct: 1 },
  ],
  [
    { q: "3 teams build their own card components. What's the problem?", opts: ["Faster cards", "Visual inconsistency, duplicated bugs, wasted effort", "Better UX through variety", "Better performance"], correct: 1 },
    { q: "Main advantage of Server-Driven UI?", opts: ["Works offline", "Instant layout changes without app updates", "No database needed", "No design system needed"], correct: 1 },
    { q: "What is a Design System?", opts: ["A backend tool", "Official catalog of reusable UI components", "A database for designs", "A deployment framework"], correct: 1 },
  ],
  [
    { q: "What does TTI (Time to Interactive) measure?", opts: ["First pixel on screen", "Page fully loaded AND interactive", "Server response time", "Time between two taps"], correct: 1 },
    { q: "What is 'lazy loading'?", opts: ["Load everything at once", "Load only when needed (e.g., on scroll)", "A technique for better images", "Preload at install"], correct: 1 },
    { q: "P50=1.5s and P95=6s. What does this mean?", opts: ["Average is 3.75s", "Half load in 1.5s, but 5% wait over 6s", "95% load in 1.5s", "Server responds randomly between 1.5-6s"], correct: 1 },
  ],
  [
    { q: "'Pizza' filter applied but ads don't update. Likely cause?", opts: ["Ads are broken", "Filter state not propagated to the ads component", "Slow internet", "Visual bug in the filter"], correct: 1 },
    { q: "Which is an example of 'global state'?", opts: ["Scroll position in a carousel", "Open/closed dropdown", "Logged-in user information", "Button hover"], correct: 2 },
    { q: "Why keep most state as 'local'?", opts: ["More secure", "Less complexity and fewer bugs between components", "Loads faster", "Global state doesn't work on mobile"], correct: 1 },
  ],
  [
    { q: "API has field 'title'. Team wants to rename to 'name'. What to do?", opts: ["Rename directly", "Add 'name' keeping 'title', deprecate later", "Delete both", "All consumers update simultaneously"], correct: 1 },
    { q: "SemVer: first number changes (2→3). What does it mean?", opts: ["Bug fix", "New compatible feature", "Breaking change, may need migration", "Docs update"], correct: 2 },
    { q: "What is a 'graceful fallback'?", opts: ["Show error message", "App ignores unknown components instead of crashing", "Automatic rollback", "Email user about update"], correct: 1 },
  ],
  [
    { q: "Difference between authentication and authorization?", opts: ["Same thing", "Authentication = who you are; Authorization = what you can do", "Authentication = mobile; Authorization = web", "Authentication = frontend; Authorization = database"], correct: 1 },
    { q: "Why does OAuth improve your app's security?", opts: ["Google encrypts everything", "Your app never sees the user's Google password", "App gets faster", "Eliminates need for HTTPS"], correct: 1 },
    { q: "Feature collects location history. Under LGPD, what must happen?", opts: ["Nothing special", "User must give explicit consent", "Only if sharing with third parties", "Only for Brazilian users"], correct: 1 },
  ],
  [
    { q: "Main purpose of a CI/CD pipeline?", opts: ["Write code automatically", "Automate the path from code to production, catching problems early", "Replace the QA team", "Manage the product backlog"], correct: 1 },
    { q: "Team deployed a change and error rate is spiking. Fastest fix?", opts: ["Debug in production", "Rollback to the previous version, then investigate calmly", "Turn off servers until bug is found", "Ask users to clear cache"], correct: 1 },
    { q: "Difference between 'monitoring' and 'observability'?", opts: ["Same thing", "Monitoring tracks THAT something is happening; observability helps understand WHY", "Monitoring = frontend; Observability = backend", "Observability only for microservices"], correct: 1 },
  ],
  [
    { q: "App has 99.9% uptime. How much downtime per year?", opts: ["About 5 minutes", "About 8.7 hours", "About 3.65 days", "Zero downtime"], correct: 1 },
    { q: "Engineering says 'cycle time went from 7 to 18 days.' What does this mean for the PM?", opts: ["Team ships bigger, better features", "Features take much longer to go from start to production — velocity is dropping", "Code quality improved significantly", "More engineers joined the team"], correct: 1 },
    { q: "How should a PM communicate 'TTI is 3.2s at P50' to a business stakeholder?", opts: ["Just say 'TTI is 3.2 seconds' — they'll understand", "'Half our users wait over 3 seconds to use the app, which could be reducing conversion by X%'", "'Our P50 percentile exceeds the SLA threshold'", "'The frontend rendering pipeline has suboptimal latency metrics'"], correct: 1 },
  ],
];

const TITLES_EN = [
  "1. How Software Works",
  "2. APIs & How Systems Talk",
  "3. Architecture & Scale",
  "4. Design Systems & UI",
  "5. Performance & Loading",
  "6. State Management",
  "7. Versioning & APIs",
  "8. Auth & Security",
  "9. DevOps & Deployment",
  "10. Technical Metrics for PMs",
];

const TAKEAWAYS: string[][] = [
  // Module 1 — How Software Works
  [
    "When you request a feature, the first question to ask is: which layer does it touch? A backend change ships the same day. A mobile UI change might take two weeks to reach users after App Store review.",
    "\"The data already exists, just display it somewhere else\" is one of the most common PM assumptions that turns out to be wrong. Sometimes that data isn't stored at all — and storing it requires a schema change, a migration, and testing.",
    "When an app behaves differently on web vs. mobile, the reason is almost always in the frontend layer — not the backend. Both use the same API; the difference is how each client renders the response.",
    "You don't need to know how each layer is built. You need to know where to look when something breaks — and now you do.",
  ],
  // Module 2 — APIs & How Systems Talk
  [
    "When two teams need to integrate, the API contract is the conversation that needs to happen first. Agreeing on what data is exchanged — and in what format — upfront saves weeks of back-and-forth after development starts.",
    "Status codes are your first clue when something breaks: 4xx means the request was wrong (a product or client issue); 5xx means the server failed (a backend or infrastructure issue). Now you can read an error log without needing someone to translate it.",
    "\"Can we just use their API?\" is a common PM question. Now you know what to dig into: Does it have rate limits? What auth does it require? What does the response look like? Does it have a webhook for events?",
    "GET is the only safe, repeatable action — it never changes anything. Every other method (POST, PATCH, DELETE) modifies data. This is why \"just retry the request\" is safe for loading screens but dangerous for form submissions.",
  ],
  // Module 3 — Architecture & Scale
  [
    "When an engineer says \"we need to refactor this before building X,\" it often means the current monolith couples features together in a way that makes the new feature risky or slow to build. This is a real constraint, not resistance.",
    "Feature flags are one of the most PM-friendly tools in engineering. They let you ship code without turning on the feature — so you can control the rollout, run A/B tests, and kill something instantly without an emergency deploy.",
    "\"Our servers can't handle the load\" isn't a vague excuse. Horizontal scaling means adding more machines — it costs money and takes planning. When your product is growing fast, infrastructure investment is a product decision.",
    "Caching affects how fresh your data is. When users ask \"why doesn't my feed update immediately?\", the answer is often a cache that refreshes every few minutes. That's a product tradeoff — freshness vs. speed — and it's yours to make.",
  ],
  // Module 4 — Design Systems & UI
  [
    "A mature design system turns \"can we build this screen?\" from a week-long effort into a one-day task. When the design system team asks for time to build a new component properly, it's an investment that pays off across every team that uses it.",
    "Server-Driven UI is how apps like Airbnb and iFood change their home screen layout during a promotion — without waiting for App Store review. If your team does frequent campaigns or experiments, it's worth asking if your architecture supports it.",
    "Three teams with three different \"card\" components is not just a visual inconsistency problem — it means three times the bugs, three times the accessibility gaps, and three times the effort when you need to make a global change.",
    "Accessibility isn't a feature you add at the end. Building it into the design system means every screen gets it automatically. Retrofitting it later — screen by screen — is one of the most expensive forms of technical debt.",
  ],
  // Module 5 — Performance & Loading
  [
    "LCP, FID, and CLS aren't just engineering metrics — Google uses them as ranking signals. A slow product loses organic search traffic before a user even clicks. Performance directly affects acquisition, not just retention.",
    "\"The feature is done\" and \"the feature is fast\" are two different things. Before accepting a ticket as done, ask: what's the LCP for this page? What happens on a slow 3G connection? Performance should be part of your definition of done.",
    "P95 latency — the experience of your slowest 5% of users — often reveals the worst conditions: old phones, slow networks, emerging markets. These are frequently your growth markets. Don't let the median hide problems for them.",
    "Layout shift (CLS) causes accidental taps — users click what they intended to click, but the page shifted and they hit something else. It's one of the most frustrating UX failures and it's entirely preventable with proper image sizing and loading order.",
    "One more thing: knowing these performance metrics makes you a better partner to your engineering team — but you don't need to monitor them yourself. Frontend engineers and your analytics platform will track LCP, FID, and CLS. Your job is to know what they mean when they come up, and to make sure performance has a seat at the table when prioritizing work.",
  ],
  // Module 6 — State Management
  [
    "\"The cart shows 0 but I added an item\" is a state sync bug — the cart's local state wasn't updated in the global store. Now you can write a precise bug report instead of just \"the cart is broken.\"",
    "Optimistic UI (showing the result before the server confirms) is a product decision, not just a technical one. It makes apps feel instant, but requires a solid plan for what happens when the server says no — especially in payments or critical actions.",
    "Multi-step forms, real-time collaboration, and live feeds are the most state-intensive features to build. When scoping them, give engineering extra room — the logic for keeping everything in sync is where most of the complexity lives.",
    "When a bug \"can't be reproduced,\" it's often because it depends on a specific sequence of actions that left the state in an unexpected place. Asking users for their exact steps — not just \"what happened\" — is the key to unlocking these reports.",
    "A reminder: state management is one of the more complex areas of frontend engineering, and you're not expected to design it. Your engineers will handle the architecture. What this module gives you is the vocabulary to describe bugs precisely, scope features more accurately, and understand why some things that look simple are actually not.",
  ],
  // Module 7 — Versioning & APIs
  [
    "\"Just rename that field\" can break integrations across mobile apps, partner APIs, and internal services — some of which you don't control. Backwards compatibility isn't caution for its own sake; it's respect for everyone who built on top of your system.",
    "Before signing up an external API partner, ask about their versioning and deprecation policy. How much notice do they give before removing something? Do they run old and new versions in parallel? This affects how much risk you're taking on.",
    "A MAJOR version bump (v1 → v2) is a product event, not just a technical one. It needs a migration guide, communication to affected teams, and a timeline. Treating it as a routine deploy is how partnerships and integrations break without warning.",
    "On mobile, old app versions stay in the wild for months. A user who hasn't updated in 6 months is still hitting your API. Always think about what the oldest supported version of your app needs from the API before making breaking changes.",
    "Worth saying clearly: you won't be managing API versioning yourself — your engineering team owns that. But as a PM working with external partners, mobile releases, and cross-team integrations, understanding versioning helps you ask the right questions, set realistic timelines, and prevent coordination failures before they happen.",
  ],
  // Module 8 — Auth & Security
  [
    "Authentication (who you are) and authorization (what you can do) are separate systems that fail in different ways. A bug that confuses them can either lock users out of things they should access — or expose things they shouldn't see.",
    "\"Login with Google\" isn't just better UX — it's better security. Your app never touches the user's password, and the user doesn't create yet another credential to forget or reuse on other sites.",
    "Token expiry is a UX decision as much as a security one. Tokens that expire too quickly log users out at the worst moments. Tokens that never expire are a security risk if stolen. The right balance depends on how sensitive your product is.",
    "Any feature that collects personal data — location, health, browsing behavior — needs a privacy review before it's built, not after. GDPR and LGPD aren't just legal formalities; violations carry fines and, more importantly, destroy user trust.",
    "To be clear: security implementation is owned by your engineering and security teams — not by you. What this module equips you with is the awareness to spot risky decisions early, ask the right questions during planning, and never accidentally greenlight a feature that puts user data at risk. You don't need to be a security expert. You need to know enough to not be the one who said \"just ship it.\"",
  ],
  // Module 9 — DevOps & Deployment
  [
    "\"How long until this ships?\" now has a real answer: it depends on pipeline health, test coverage, environment stability, and whether the team has a rollback plan. Understanding this helps you give stakeholders honest timelines.",
    "Feature flags let you separate \"deployed\" from \"live for users.\" Code can be in production for weeks before a feature turns on. This is how high-performing teams ship continuously without exposing unfinished work.",
    "Staging exists for exactly one reason: to catch problems before real users see them. When teams skip it \"to save time,\" the cost shows up as production incidents — which take far more time to fix than the staging step would have.",
    "\"What's the rollback plan?\" is one of the best questions a PM can ask before any major release. If the answer is vague or slow, that's a signal the deployment is riskier than it looks.",
  ],
  // Module 10 — Technical Metrics for PMs
  [
    "99.9% uptime sounds like \"always on\" — but it means 8.7 hours of downtime per year. For a payment flow or a real-time product, that's significant. When negotiating SLAs with enterprise customers, know what each tier of \"nines\" actually costs.",
    "Error rate is a product metric, not just an engineering one. A 0.1% error rate sounds tiny — but at 10 million daily requests, that's 10,000 users hitting failures every day. Track error rates by feature, not just globally.",
    "Cycle time — how long code takes to go from done to production — is the engineering equivalent of time-to-market. When cycle time doubles, your ability to respond to user feedback and ship improvements slows down accordingly.",
    "Technical debt isn't engineering's problem to solve in isolation — it's a product speed problem. Every sprint spent paying down debt is an investment in the velocity of every sprint that follows. Budget for it explicitly, or it will budget itself by slowing everything else.",
  ],
];

export const MODULES: Module[] = TITLES_EN.map((title, i) => ({
  id: i,
  title,
  sections: SECTIONS[i],
  qas: QAS_EN[i],
  quiz: QUIZZES_EN[i],
  takeaways: TAKEAWAYS[i],
}));

export const FREE_MODULES = 3;
