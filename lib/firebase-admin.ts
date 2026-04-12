/* eslint-disable @typescript-eslint/no-require-imports */
// Firebase Admin — lazy initialization to avoid build-time errors

function getAdminApp() {
  const { initializeApp, getApps, cert } = require('firebase-admin/app');
  if (getApps().length > 0) return getApps()[0];
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export function adminDb() {
  const { getFirestore } = require('firebase-admin/firestore');
  return getFirestore(getAdminApp());
}

export function adminAuth() {
  const { getAuth } = require('firebase-admin/auth');
  return getAuth(getAdminApp());
}
