import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function verifyToken(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  try {
    return await adminAuth().verifyIdToken(token);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const decoded = await verifyToken(req);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const snap = await adminDb().collection('users').doc(decoded.uid).get();
    if (!snap.exists) return NextResponse.json({ quizState: {}, quizSels: {} });
    const data = snap.data()!;
    return NextResponse.json({
      quizState: data.quiz_state ?? {},
      quizSels: data.quiz_sels ?? {},
    });
  } catch (err) {
    console.error('Progress GET error:', err);
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const decoded = await verifyToken(req);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { quizState, quizSels } = await req.json();
    await adminDb().collection('users').doc(decoded.uid).set(
      { quiz_state: quizState, quiz_sels: quizSels, updatedAt: new Date() },
      { merge: true }
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Progress POST error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
