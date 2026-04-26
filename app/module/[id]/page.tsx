import { redirect } from 'next/navigation';
import { AuthProvider } from '@/components/AuthProvider';
import ModulePage from '@/components/ModulePage';
import { MODULES } from '@/data/modules';

interface Props {
  params: { id: string };
}

export default async function ModuleRoute({ params }: Props) {
  const id = parseInt(params.id, 10) - 1; // URL is 1-indexed, array is 0-indexed

  if (isNaN(id) || id < 0 || id >= MODULES.length) {
    redirect('/module/1');
  }

  return (
    <AuthProvider>
      <ModulePage moduleId={id} />
    </AuthProvider>
  );
}

export function generateStaticParams() {
  return MODULES.map((_, i) => ({ id: String(i + 1) }));
}
