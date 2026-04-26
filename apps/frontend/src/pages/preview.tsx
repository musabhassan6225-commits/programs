import Link from 'next/link';
import { Layout } from '../components/layout';

const previewCards = [
  { title: 'Dashboard', description: 'Clinic KPIs, alerts, and daily schedule overview.' },
  { title: 'Patient Management', description: 'Search patient records and open clinical files.' },
  { title: 'Dental Charting', description: 'Interactive odontogram and periodontal assessment.' },
  { title: 'Scheduling', description: 'Appointment and provider schedule planning.' },  { title: 'Appointments', description: 'Appointment booking, slot management, and weekly provider planning.' },  { title: 'Billing', description: 'Invoices, payments, and insurance claims.' },
  { title: 'Imaging', description: 'X-ray and scan assets connected to patients.' },
  { title: 'Treatment Plans', description: 'Diagnosis workflows and cost estimates.' },
  { title: 'Doctor Directory', description: 'Clinic profiles, specialties, and availability.' },
];

export default function PreviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">DPMS Preview</h1>
          <p className="mt-2 text-slate-600">This preview page summarizes the current platform modules available in the clinic portal.</p>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          {previewCards.map(card => (
            <div key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{card.title}</p>
              <p className="mt-3 text-slate-700">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Quick actions</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href="/dashboard" className="rounded-3xl border border-slate-200 bg-slate-900 px-6 py-4 text-white transition hover:bg-slate-700">
              Visit Dashboard
            </Link>
            <Link href="/patients" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-4 text-slate-900 transition hover:bg-slate-100">
              Browse Patients
            </Link>
            <Link href="/charting" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-4 text-slate-900 transition hover:bg-slate-100">
              Open Charting
            </Link>
            <Link href="/billing" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-4 text-slate-900 transition hover:bg-slate-100">
              Review Billing
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
