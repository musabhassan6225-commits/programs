import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import { setToken } from '../lib/auth';
import { Layout } from '../components/layout';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/auth/login', { email, password });
      return response;
    },
    onSuccess(data) {
      setToken(data.accessToken);
      router.push('/dashboard');
    },
    onError(err: any) {
      setError(err?.response?.data?.message || 'Login failed.');
    },
  });

  return (
    <Layout>
      <div className="mx-auto max-w-md space-y-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Clinic sign in</h1>
          <p className="mt-2 text-slate-600">Use the demo admin credentials to access DPMS features.</p>
        </div>

        {error ? <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}

        <div className="space-y-4">
          <label className="block text-sm text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 p-3 outline-none"
            />
          </label>
          <label className="block text-sm text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 p-3 outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => loginMutation.mutate()}
            disabled={loginMutation.isLoading}
            className="inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loginMutation.isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
