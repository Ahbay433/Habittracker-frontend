import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}