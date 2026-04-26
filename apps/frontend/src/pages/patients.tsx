import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/layout';
import { fetcher, post } from '../lib/api';
import type { Patient } from '../lib/types';

export default function PatientsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: () => fetcher('/patients'),
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');

  const createPatient = useMutation({
    mutationFn: (payload: Partial<Patient>) => post<Patient>('/patients', payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['patients']);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setDateOfBirth('');
      setGender('');
      setInsuranceProvider('');
      setInsuranceNumber('');
    },
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Patient Management</h1>
          <p className="mt-2 text-slate-600">Access comprehensive records, clinical history, and treatment workflows.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Patient list</h2>
              {isLoading ? (
                <p className="mt-4 text-slate-500">Loading patients...</p>
              ) : (
                <div className="mt-6 space-y-4">
                  {data?.map(patient => (
                    <Link
                      key={patient.id}
                      href={`/patients/${patient.id}`}
                      className="block rounded-3xl border border-slate-200 p-4 transition hover:border-slate-900 hover:bg-slate-50"
                    >
                      <p className="font-semibold text-slate-900">{patient.firstName} {patient.lastName}</p>
                      <p className="text-sm text-slate-600">{patient.email || 'No email provided'} · {patient.phone || 'No phone'}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Add new patient</h2>
              <div className="mt-5 space-y-4">
                <label className="block text-sm text-slate-700">
                  First name
                  <input
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Last name
                  <input
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Phone
                  <input
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Date of birth
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={event => setDateOfBirth(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Gender
                  <select
                    value={gender}
                    onChange={event => setGender(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  >
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="block text-sm text-slate-700">
                  Insurance provider
                  <input
                    value={insuranceProvider}
                    onChange={event => setInsuranceProvider(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-700">
                  Policy number
                  <input
                    value={insuranceNumber}
                    onChange={event => setInsuranceNumber(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none"
                  />
                </label>
                <button
                  type="button"
                  onClick={() =>
                    createPatient.mutate({
                      firstName,
                      lastName,
                      email,
                      phone,
                      dateOfBirth,
                      gender,
                      insuranceProvider,
                      insuranceNumber,
                    })
                  }
                  disabled={createPatient.isLoading || !firstName || !lastName}
                  className="inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {createPatient.isLoading ? 'Saving patient...' : 'Add patient'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
