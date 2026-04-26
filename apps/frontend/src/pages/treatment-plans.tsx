import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/layout';
import { fetcher, post } from '../lib/api';

type TreatmentPlan = {
  id: string;
  patientId: string;
  providerId: string;
  status: string;
  estimatedCost: number; // Changed to number to match parseFloat
  diagnoses?: Record<string, any>;
  plannedProcedures?: Record<string, any>;
};

export default function TreatmentPlansPage() {
  const queryClient = useQueryClient();
  const [patientId, setPatientId] = useState('');
  const [providerId, setProviderId] = useState('');
  const [status, setStatus] = useState('draft');
  const [estimatedCost, setEstimatedCost] = useState('0');
  const [diagnosis, setDiagnosis] = useState('');
  const [procedure, setProcedure] = useState('');

  // 1. Corrected query definition and naming
  const { data, isLoading } = useQuery({
    queryKey: ['treatmentPlans'],
    queryFn: () => fetcher<TreatmentPlan[]>('/api/treatment-plans') // Added /api and kebab-case check
  });

  // 2. Updated useMutation to v5 Object syntax
  const createPlan = useMutation({
    mutationFn: (payload: Partial<TreatmentPlan>) => 
      post<TreatmentPlan>('/api/treatment-plans', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treatmentPlans'] });
      // Reset form
      setPatientId('');
      setProviderId('');
      setDiagnosis('');
      setProcedure('');
      setEstimatedCost('0');
    },
  });

  return (
    <Layout>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Treatment Planning</h1>
          <p className="mt-2 text-slate-600">Build and review treatment plans across specialties with cost estimates and diagnosis workflows.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
            <div>
              {isLoading ? (
                <p className="text-slate-500">Loading treatment plans...</p>
              ) : (
                <div className="space-y-4">
                  {data?.map(plan => (
                    <div key={plan.id} className="rounded-3xl border border-slate-200 p-6">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold text-slate-900">Plan {plan.id}</p>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{plan.status}</span>
                      </div>
                      <p className="mt-2 text-slate-600">Patient ID: {plan.patientId}</p>
                      <p className="mt-1 text-slate-600">Estimated cost: ${plan.estimatedCost}</p>
                      <div className="mt-3 text-sm text-slate-500">
                        <p><strong>Diagnosis:</strong> {typeof plan.diagnoses === 'string' ? plan.diagnoses : JSON.stringify(plan.diagnoses?.note || plan.diagnoses || {}, null, 2)}</p>
                        <p className="mt-2"><strong>Procedures:</strong> {typeof plan.plannedProcedures === 'string' ? plan.plannedProcedures : JSON.stringify(plan.plannedProcedures?.procedure || plan.plannedProcedures || {}, null, 2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Create treatment plan</h2>
              <div className="mt-5 space-y-4">
                <label className="block text-sm text-slate-700">
                  Patient ID
                  <input value={patientId} onChange={event => setPatientId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Provider ID
                  <input value={providerId} onChange={event => setProviderId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Estimated cost
                  <input type="number" value={estimatedCost} onChange={event => setEstimatedCost(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Diagnosis summary
                  <textarea value={diagnosis} onChange={event => setDiagnosis(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Planned procedure
                  <textarea value={procedure} onChange={event => setProcedure(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Status
                  <select value={status} onChange={event => setStatus(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none">
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    createPlan.mutate({
                      patientId,
                      providerId,
                      status,
                      estimatedCost: parseFloat(estimatedCost) || 0,
                      diagnoses: { note: diagnosis },
                      plannedProcedures: { procedure },
                    })
                  }
                  disabled={createPlan.isPending}
                  className="inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {createPlan.isPending ? 'Saving...' : 'Create plan'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}