import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { isPM, role, experience, gender, country, uid } = body;

    if (isPM === undefined || !experience || !gender || !country) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = adminDb();
    const data = {
      isPM,
      role: isPM ? 'Product Manager' : (role ?? ''),
      experience,
      gender,
      country,
      uid: uid ?? null,
      submittedAt: new Date(),
    };

    await db.collection('onboarding_responses').add(data);

    if (uid) {
      await db.collection('users').doc(uid).set(
        { profile: data, onboardingCompleted: true },
        { merge: true }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Onboarding API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
