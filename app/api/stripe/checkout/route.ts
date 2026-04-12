import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { stripe, PLANS, PlanKey } from '@/lib/stripe';
import { adminAuth } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  const { plan, company, idToken } = await req.json();

  if (!plan || !PLANS[plan as PlanKey]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }
  if (!idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await adminAuth().verifyIdToken(idToken);
    uid = decoded.uid;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('verifyIdToken failed:', msg);
    return NextResponse.json({ error: 'Invalid token', detail: msg }, { status: 401 });
  }

  const selectedPlan = PLANS[plan as PlanKey];
  const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: selectedPlan.priceId, quantity: 1 }],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/paywall`,
    metadata: {
      uid,
      plan,
      company: company ?? '',
    },
  });

  return NextResponse.json({ url: session.url });
}
