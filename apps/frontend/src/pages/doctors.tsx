import { useQuery } from '@tanstack/react-query';
import { Layout } from '../components/layout';
import { fetcher } from '../lib/api';

type DoctorProfile = {
  id: string;
  userId: string;
  specialization: string;
  biography?: string;
  availabilities?: string[];
};

export default function DoctorsPage() {
  // const { data, isLoading } = useQuery({ queryKey: ['doctors'], queryFn: fetchDoctors });
const { data, isLoading } = useQuery({
  queryKey: ['doctors'],
  queryFn: () => fetcher('/api/doctors') as Promise<DoctorProfile[]>
})

// testing issue
  return (
    <Layout>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Doctor Directory</h1>
          <p className="mt-2 text-slate-600">Review doctor expertise, availability, and assigned patient coverage.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {isLoading ? (
            <p className="text-slate-500">Loading doctor profiles...</p>
          ) : (
            <div className="grid gap-4">
              {data?.map(doctor => (
                <div key={doctor.id} className="rounded-3xl border border-slate-200 p-6">
                  <p className="text-lg font-semibold text-slate-900">{doctor.specialization}</p>
                  <p className="mt-2 text-slate-600">{doctor.biography || 'No biography available.'}</p>
                  <p className="mt-3 text-sm text-slate-500">Availability: {doctor.availabilities?.join(', ') || 'TBD'}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
