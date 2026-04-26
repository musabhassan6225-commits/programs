import Link from 'next/link';
import type { ReactNode } from 'react';
import { Calendar as CalendarIcon, ClockIcon, CreditCardIcon, FileText, ImageIcon, LayoutGrid, Users } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/appointments', label: 'Appointments', icon: CalendarIcon },
  { href: '/schedule', label: 'Schedule', icon: ClockIcon },
  { href: '/billing', label: 'Billing', icon: CreditCardIcon },
  { href: '/imaging', label: 'Imaging', icon: ImageIcon },
  { href: '/preview', label: 'Preview', icon: FileText },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-lg font-semibold">DPMS Clinic Portal</p>
            <p className="text-xs text-slate-500">Dental Practice Management System</p>
          </div>
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded-2xl px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
