import { useState } from 'react';

const sites = ['MB', 'B', 'DB', 'ML', 'L', 'DL'];
const teeth = Array.from({ length: 16 }, (_, index) => index + 1);

export function PeriodontalChart() {
  const [measurements, setMeasurements] = useState<Record<string, string>>({});

  const updateMeasurement = (tooth: number, site: string, value: string) => {
    const key = `${tooth}-${site}`;
    setMeasurements(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="overflow-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid min-w-[720px] gap-4">
          {teeth.map(tooth => (
            <div key={tooth} className="rounded-3xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Tooth {tooth}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {sites.map(site => (
                  <label key={site} className="space-y-1 text-sm text-slate-700">
                    <span>{site}</span>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-2 text-sm outline-none focus:border-slate-400"
                      value={measurements[`${tooth}-${site}`] || ''}
                      onChange={event => updateMeasurement(tooth, site, event.target.value)}
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Severity summary</h3>
        <p className="mt-2 text-slate-600">Color-coded periodontal severity mapping and historical comparison will be enabled as the module expands.</p>
      </div>
    </div>
  );
}
