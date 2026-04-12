import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase-admin';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { uid, plan, company } = session.metadata!;

    const update: Record<string, unknown> = {
      access_type: plan,
      company: company ?? '',
      updated_at: new Date(),
    };

    if (plan === 'monthly') {
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      update.access_expires_at = expires;
    } else {
      update.access_expires_at = null;
    }

    await adminDb().collection('users').doc(uid).set(update, { merge: true });
  }

  return NextResponse.json({ received: true });
}
