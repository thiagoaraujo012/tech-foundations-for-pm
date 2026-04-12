import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthProvider } from '@/components/AuthProvider';
import ModulePage from '@/components/ModulePage';
import { MODULES, FREE_MODULES } from '@/data/modules';
import { getUserAccess, canAccessModule } from '@/lib/access';
import { adminAuth } from '@/lib/firebase-admin';

interface Props {
  params: { id: string };
}

async function getSessionUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('firebase-token')?.value;
    if (!token) return null;
    const decoded = await adminAuth().verifyIdToken(token);
    return decoded;
  } catch {
    return null;
  }
}

export default async function ModuleRoute({ params }: Props) {
  const id = parseInt(params.id, 10) - 1; // URL is 1-indexed, array is 0-indexed

  if (isNaN(id) || id < 0 || id >= MODULES.length) {
    redirect('/module/1');
  }

  // Free modules: no auth check needed
  if (id < FREE_MODULES) {
    return (
      <AuthProvider>
        <ModulePage moduleId={id} hasAccess={true} />
      </AuthProvider>
    );
  }

  // Paid modules: check access
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    redirect('/paywall');
  }

  const access = await getUserAccess(sessionUser.uid);
  if (!canAccessModule(id, access)) {
    redirect('/paywall');
  }

  return (
    <AuthProvider>
      <ModulePage moduleId={id} hasAccess={true} />
    </AuthProvider>
  );
}

export function generateStaticParams() {
  return MODULES.map((_, i) => ({ id: String(i + 1) }));
}
