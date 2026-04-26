import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { clearToken, getToken } from '../lib/auth';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/preview', label: 'Preview' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/patients', label: 'Patients' },
  { href: '/appointments', label: 'Appointments' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/charting', label: 'Dental Charting' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/billing', label: 'Billing' },
  { href: '/imaging', label: 'Imaging' },
  { href: '/treatment-plans', label: 'Treatment Plans' },
];

export function Nav() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(Boolean(getToken()));
  }, []);

  return (
    <nav className="flex items-center gap-4 text-sm text-slate-600">
      <div className="hidden gap-4 sm:flex">
        {navItems.map(item => (
          <Link key={item.href} href={item.href} className="transition hover:text-slate-900">
            {item.label}
          </Link>
        ))}
      </div>
      {authenticated ? (
        <button
          type="button"
          onClick={() => {
            clearToken();
            setAuthenticated(false);
            router.push('/login');
          }}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100"
        >
          Logout
        </button>
      ) : (
        <Link href="/login" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100">
          Login
        </Link>
      )}
    </nav>
  );
}
