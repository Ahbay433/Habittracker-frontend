import { ClipboardList } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-800 py-16">
      <ClipboardList size={48} className="mb-4 text-slate-600" />
      <p className="text-slate-400">No habits yet. Create your first one above.</p>
    </div>
  );
}