import type { Patient } from '../lib/types';

export function PatientDetails({ patient }: { patient: Patient }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{patient.firstName} {patient.lastName}</h2>
          <p className="mt-2 text-sm text-slate-600">DOB: {patient.dateOfBirth || 'TBD'} · Gender: {patient.gender || 'Not specified'}</p>
        </div>
        <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm text-slate-700">Active</div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Contact</p>
          <p className="mt-3 text-slate-700">{patient.email || 'No email'}</p>
          <p className="mt-1 text-slate-700">{patient.phone || 'No phone'}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Insurance</p>
          <p className="mt-3 text-slate-700">{(patient as any).insuranceProvider || 'Not added'}</p>
          <p className="mt-1 text-slate-700">{(patient as any).insuranceNumber || 'No policy number'}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4 text-slate-600">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-900">Medical history</p>
          <pre className="mt-3 overflow-x-auto text-xs text-slate-700">{JSON.stringify((patient as any).medicalHistory || { }, null, 2)}</pre>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-900">Dental history</p>
          <pre className="mt-3 overflow-x-auto text-xs text-slate-700">{JSON.stringify((patient as any).dentalHistory || { }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
