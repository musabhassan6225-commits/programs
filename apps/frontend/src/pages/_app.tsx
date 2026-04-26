import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getToken } from '../lib/auth';
import '../styles/globals.css';

const queryClient = new QueryClient();
const publicRoutes = ['/', '/login', '/preview'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    // if (!token && !publicRoutes.includes(router.pathname)) {
    //   router.push('/login');
    // }
  }, [router.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
