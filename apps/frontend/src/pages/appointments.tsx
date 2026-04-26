import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/layout';
import { fetcher, post } from '../lib/api';

type Appointment = {
  id: string;
  patientId: string;
  providerId: string;
  clinicId?: string;
  startTime: string;
  endTime: string;
  type: string;
  status: string;
};

export default function AppointmentsPage() {
  const queryClient = useQueryClient();

  // 1. Updated useQuery to v5 Object syntax
  const { data, isLoading, isError } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => fetcher<Appointment[]>('/api/appointments'),
  });

  const [patientId, setPatientId] = useState('');
  const [providerId, setProviderId] = useState('');
  const [clinicId, setClinicId] = useState('');
  const [startTime, setStartTime] = useState('2026-04-25T09:00');
  const [endTime, setEndTime] = useState('2026-04-25T09:30');
  const [type, setType] = useState('consultation');

  // 2. Updated useMutation to v5 Object syntax
  const createAppointment = useMutation({
    mutationFn: (payload: Partial<Appointment>) => 
      // Ensure this matches your global prefix /api
      post<Appointment>('/api/appointments', payload), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      // Optional: Clear form after success
      setPatientId('');
      setProviderId('');
    },
  });

  return (
    <Layout>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Appointments</h1>
          <p className="mt-2 text-slate-600">Create and review upcoming patient appointments for the clinic.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Upcoming appointments</h2>
              <div className="mt-6 space-y-4">
                {isLoading ? (
                  <p className="text-slate-500">Loading appointments...</p>
                ) : isError ? (
                  <p className="text-red-500">Failed to load appointments (Check backend logs for 500 error).</p>
                ) : (
                  data?.map(appointment => (
                    <div key={appointment.id} className="rounded-3xl border border-slate-200 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold text-slate-900">{appointment.type}</p>
                        <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">{appointment.status}</span>
                      </div>
                      <p className="mt-2 text-slate-600">Patient: {appointment.patientId}</p>
                      <p className="text-sm text-slate-600">Provider: {appointment.providerId}</p>
                      <p className="mt-2 text-sm text-slate-500">
                        {new Date(appointment.startTime).toLocaleString()} — {new Date(appointment.endTime).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Create appointment</h2>
              <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <label className="block text-sm text-slate-700">
                  Patient ID
                  <input value={patientId} onChange={event => setPatientId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Provider ID
                  <input value={providerId} onChange={event => setProviderId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Clinic ID
                  <input value={clinicId} onChange={event => setClinicId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Start time
                  <input type="datetime-local" value={startTime} onChange={event => setStartTime(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  End time
                  <input type="datetime-local" value={endTime} onChange={event => setEndTime(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Appointment type
                  <select value={type} onChange={event => setType(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none">
                    <option value="consultation">Consultation</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="surgery">Surgery</option>
                    <option value="follow-up">Follow-up</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => createAppointment.mutate({ patientId, providerId, clinicId, startTime, endTime, type, status: 'scheduled' })}
                  disabled={createAppointment.isPending}
                  className="inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {createAppointment.isPending ? 'Creating...' : 'Create appointment'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}