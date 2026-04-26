import { useState } from 'react';

const teeth = Array.from({ length: 32 }, (_, index) => ({
  number: index + 1,
  label: `T${index + 1}`,
}));

const surfaces = ['M', 'D', 'O/I', 'B/F', 'L/P'];

export function Odontogram() {
  const [selected, setSelected] = useState<number | null>(null);
  const [annotations, setAnnotations] = useState<Record<number, string>>({});

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-3">
        {teeth.map(tooth => (
          <button
            key={tooth.number}
            type="button"
            onClick={() => setSelected(tooth.number)}
            className={`rounded-3xl border p-3 text-left transition ${
              selected === tooth.number ? 'border-slate-900 bg-slate-100' : 'border-slate-200 bg-white'
            }`}
          >
            <p className="font-semibold">{tooth.label}</p>
            <p className="text-xs text-slate-500">{annotations[tooth.number] || 'No condition'}</p>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Selected Tooth</p>
        <p className="mt-2 text-xl font-semibold text-slate-900">
          {selected ? `Tooth T${selected}` : 'Select a tooth to annotate'}
        </p>

        {selected ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-700">Surface Mapping</p>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {surfaces.map(surface => (
                  <div key={surface} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-semibold text-slate-700">
                    {surface}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Condition</p>
              <textarea
                placeholder="Add diagnosis, treatment, notes or image tags"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
                value={annotations[selected] || ''}
                onChange={event => setAnnotations({ ...annotations, [selected]: event.target.value })}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
