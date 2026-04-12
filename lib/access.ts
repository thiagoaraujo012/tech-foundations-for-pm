import { adminDb } from './firebase-admin';
import { FREE_MODULES } from '@/data/modules';

export type AccessType = 'free' | 'monthly' | 'lifetime';

export interface UserAccess {
  accessType: AccessType;
  accessExpiresAt: Date | null;
  company: string;
}

export async function getUserAccess(uid: string): Promise<UserAccess> {
  const doc = await adminDb().collection('users').doc(uid).get();
  if (!doc.exists) {
    return { accessType: 'free', accessExpiresAt: null, company: '' };
  }
  const data = doc.data()!;
  return {
    accessType: data.access_type ?? 'free',
    accessExpiresAt: data.access_expires_at?.toDate() ?? null,
    company: data.company ?? '',
  };
}

export function canAccessModule(moduleId: number, access: UserAccess): boolean {
  if (moduleId < FREE_MODULES) return true;
  if (access.accessType === 'lifetime') return true;
  if (access.accessType === 'monthly') {
    if (!access.accessExpiresAt) return false;
    return access.accessExpiresAt > new Date();
  }
  return false;
}
