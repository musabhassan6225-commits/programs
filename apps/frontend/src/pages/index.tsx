import Link from 'next/link';
import { Layout } from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Dental CRM for Modern Clinics</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            A modular enterprise-grade platform for clinical workflows, patient records, appointments, billing, and dental charting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700">
              Open Dashboard
            </Link>
            <Link href="/patients" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Manage Patients
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Built for Dental Teams</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li>Role-based access controls for dentists, hygienists, receptionists, managers.</li>
            <li>Interactive odontogram and periodontal chart foundations.</li>
            <li>Appointment scheduling, clinic analytics, and billing-ready modules.</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
