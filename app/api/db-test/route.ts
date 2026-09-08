import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = adminDb();
    await db.collection('_test').doc('ping').set({ ts: new Date().toISOString() });
    return NextResponse.json({ ok: true, message: 'Firestore write succeeded' });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
