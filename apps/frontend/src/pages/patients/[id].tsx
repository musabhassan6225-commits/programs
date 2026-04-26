import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../../components/layout';
import { PatientDetails } from '../../components/patient-details';
import { fetcher, post } from '../../lib/api';
import type { Patient } from '../../lib/types';

export default function PatientDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const [providerId, setProviderId] = useState('');
  const [clinicId, setClinicId] = useState('clinic-1');
  const [startTime, setStartTime] = useState('2026-04-25T09:00');
  const [endTime, setEndTime] = useState('2026-04-25T09:30');
  const [type, setType] = useState('consultation');

  const { data, isLoading } = useQuery<Patient>(
    ['patient', id],
    () => fetcher(`/patients/${id}`),
    { enabled: !!id },
  );

  const createAppointment = useMutation(
    (payload: Record<string, any>) => post('/appointments', payload),
    {
      onSuccess: () => queryClient.invalidateQueries(['appointments']),
    },
  );

  return (
    <Layout>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Patient record</h1>
          <p className="mt-2 text-slate-600">Review the patient’s clinical record, dental history, and treatment plan overview.</p>
        </section>

        {isLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-slate-500">Loading patient record...</p>
          </div>
        ) : data ? (
          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <PatientDetails patient={data} />
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Schedule appointment</h2>
              <p className="mt-2 text-slate-600">Create a new appointment for this patient.</p>
              <div className="mt-5 space-y-4">
                <label className="block text-sm text-slate-700">
                  Provider ID
                  <input
                    value={providerId}
                    onChange={event => setProviderId(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Clinic ID
                  <input
                    value={clinicId}
                    onChange={event => setClinicId(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Start time
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={event => setStartTime(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  End time
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={event => setEndTime(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Appointment type
                  <select
                    value={type}
                    onChange={event => setType(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  >
                    <option value="consultation">Consultation</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="surgery">Surgery</option>
                    <option value="follow-up">Follow-up</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    createAppointment.mutate({
                      patientId: data.id,
                      providerId,
                      clinicId,
                      startTime,
                      endTime,
                      type,
                      status: 'scheduled',
                    })
                  }
                  disabled={createAppointment.isLoading || !providerId}
                  className="inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {createAppointment.isLoading ? 'Scheduling...' : 'Schedule appointment'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-slate-500">Patient not found or invalid ID.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
