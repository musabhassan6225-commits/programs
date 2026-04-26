import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/layout';
import { fetcher, post } from '../lib/api';

type ScheduleSlot = {
  id: string;
  clinicId: string;
  providerId: string;
  startTime: string;
  endTime: string;
  status: string;
  appointmentId?: string | null;
  slotType?: string;
};

export default function SchedulePage() {
  const queryClient = useQueryClient();
  const [clinicId, setClinicId] = useState('clinic-1');
  const [providerId, setProviderId] = useState('doctor-1');
  const [startTime, setStartTime] = useState('2026-04-25T09:00');
  const [endTime, setEndTime] = useState('2026-04-25T09:45');
  const [slotType, setSlotType] = useState('consultation');

  // 1. Updated useQuery to v5 Object syntax
  const { data: slots, isLoading } = useQuery({
    queryKey: ['slots'],
    queryFn: () => fetcher<ScheduleSlot[]>('/api/scheduling/slots'),
  });

  // 2. Updated useMutation to v5 Object syntax
  const createSlot = useMutation({
    mutationFn: (payload: Partial<ScheduleSlot>) => post<ScheduleSlot>('/api/scheduling/slot', payload),
    onSuccess: () => {
      // 3. Updated invalidateQueries to v5 Object syntax
      queryClient.invalidateQueries({ queryKey: ['slots'] });
    },
  });

  return (
    <Layout>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Schedule & Appointments</h1>
          <p className="mt-2 text-slate-600">Manage clinic availability and add appointment slots in real time.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Clinic schedule</h2>
              <p className="mt-2 text-slate-600">View available appointment slots for your clinic.</p>
              <div className="mt-6 space-y-4">
                {isLoading ? (
                  <p className="text-slate-500">Loading schedule slots...</p>
                ) : (
                  slots?.map(slot => (
                    <div key={slot.id} className="rounded-3xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">{slot.slotType}</p>
                          <p className="text-sm text-slate-600">Provider: {slot.providerId}</p>
                        </div>
                        <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
                          {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">Status: {slot.status}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Add schedule slot</h2>
              <div className="mt-5 space-y-4">
                <label className="block text-sm text-slate-700">
                  Clinic ID
                  <input value={clinicId} onChange={event => setClinicId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Provider ID
                  <input value={providerId} onChange={event => setProviderId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
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
                  Slot type
                  <select value={slotType} onChange={event => setSlotType(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none">
                    <option value="consultation">Consultation</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="surgery">Surgery</option>
                    <option value="follow-up">Follow-up</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => createSlot.mutate({ clinicId, providerId, startTime, endTime, slotType, status: 'available' })}
                  disabled={createSlot.isPending}
                  className="inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {createSlot.isPending ? 'Adding slot...' : 'Add slot'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}