import { Layout } from '../components/layout';
import { Odontogram } from '../components/odontogram';
import { PeriodontalChart } from '../components/periodontal-chart';

export default function ChartingPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Dental Charting</h1>
          <p className="mt-2 text-slate-600">Interactive odontogram and periodontal assessment are foundational modules for clinical records and treatment planning.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Odontogram</h2>
          <p className="mt-2 text-slate-600">Select a tooth to annotate conditions, procedures, and treatment notes.</p>
          <div className="mt-6">
            <Odontogram />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Periodontal Assessment</h2>
          <p className="mt-2 text-slate-600">Capture six-point probing measurements, gingival recession, and clinical attachment loss per tooth.</p>
          <div className="mt-6">
            <PeriodontalChart />
          </div>
        </section>
      </div>
    </Layout>
  );
}
