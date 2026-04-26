import { Layout } from '../components/layout';

const kpis = [
  { title: 'Revenue', value: '$162k', change: '+12%' },
  { title: 'Active patients', value: '124', change: '+8%' },
  { title: 'Occupancy', value: '82%', change: '+4%' },
  { title: 'Pending invoices', value: '16', change: '-1%' },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Daily schedule</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Clinic pulse</h1>
            </div>
            <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">Today</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map(kpi => (
              <div key={kpi.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500">{kpi.title}</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{kpi.value}</p>
                <p className="mt-2 text-sm text-slate-600">{kpi.change} vs. last month</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Active patients</h2>
            <div className="mt-6 space-y-4 text-slate-600">
              <div className="rounded-3xl border border-slate-200 p-4">Emily Rhodes — Scheduled for cleaning at 09:30</div>
              <div className="rounded-3xl border border-slate-200 p-4">Jorge Alvarez — Follow-up endodontics at 10:15</div>
              <div className="rounded-3xl border border-slate-200 p-4">Sonia Patel — Orthodontic review at 11:00</div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Alerts</h2>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li>Missed appointment: 1</li>
              <li>Pending treatment plan approvals: 3</li>
              <li>Unpaid invoices: 5</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}
