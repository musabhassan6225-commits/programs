import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/layout';
import api, { fetcher } from '../lib/api';

type ImagingAsset = {
  id: string;
  type: string;
  url: string;
  metadata?: Record<string, any>;
};

function isImageUrl(url: string) {
  return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
}

export default function ImagingPage() {
  const queryClient = useQueryClient();
  const [patientId, setPatientId] = useState('');
  const [type, setType] = useState('x-ray');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // 1. Updated useQuery to v5 Object syntax
  const { data, isLoading } = useQuery({
    queryKey: ['imaging'],
    queryFn: () => fetcher<ImagingAsset[]>('/api/imaging'),
  });

  // 2. Updated useMutation to v5 Object syntax
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error('Please select a file to upload');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('patientId', patientId);
      formData.append('type', type);
      formData.append('description', description);

      // Added /api prefix to the upload route
      const response = await api.post<ImagingAsset>('/api/imaging/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    onSuccess: () => {
      // Updated invalidateQueries to v5 Object syntax
      queryClient.invalidateQueries({ queryKey: ['imaging'] });
      // Reset form on success
      setFile(null);
      setDescription('');
    },
  });

  return (
    <Layout>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Imaging Assets</h1>
          <p className="mt-2 text-slate-600">Store and review X-rays, intraoral scans, and treatment images linked to patient records.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              {isLoading ? (
                <p className="text-slate-500">Fetching imaging assets...</p>
              ) : (
                <div className="grid gap-4">
                  {data?.map(asset => (
                    <div key={asset.id} className="rounded-3xl border border-slate-200 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold text-slate-900">{asset.type}</p>
                        <a href={asset.url} target="_blank" rel="noreferrer" className="text-sm text-slate-600 underline">
                          View
                        </a>
                      </div>
                      <p className="mt-2 text-slate-600">Asset ID: {asset.id}</p>
                      <p className="mt-2 text-sm text-slate-500">Patient ID: {asset.metadata?.patientId || 'unknown'}</p>
                      {isImageUrl(asset.url) ? (
                        <img src={asset.url} alt={asset.type} className="mt-4 max-h-64 w-full rounded-3xl object-contain" />
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Upload imaging asset</h2>
              <div className="mt-5 space-y-4">
                <label className="block text-sm text-slate-700">
                  Patient ID
                  <input value={patientId} onChange={event => setPatientId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Description
                  <textarea value={description} onChange={event => setDescription(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                </label>
                <label className="block text-sm text-slate-700">
                  Type
                  <select value={type} onChange={event => setType(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none">
                    <option value="x-ray">X-ray</option>
                    <option value="intraoral">Intraoral</option>
                    <option value="3d-scan">3D scan</option>
                    <option value="photo">Photo</option>
                  </select>
                </label>
                <label className="block text-sm text-slate-700">
                  File
                  <input type="file" accept="image/*" onChange={event => setFile(event.target.files?.[0] || null)} className="mt-2 w-full" />
                </label>
                <button
                  type="button"
                  onClick={() => uploadMutation.mutate()}
                  disabled={uploadMutation.isPending || !patientId || !file}
                  className="inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {uploadMutation.isPending ? 'Uploading...' : 'Upload asset'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}