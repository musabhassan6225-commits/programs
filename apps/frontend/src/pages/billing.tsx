import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/layout';
import { fetcher, post } from '../lib/api';

type Invoice = {
  id: string;
  patientId: string;
  totalAmount: number; // Changed to number for math consistency
  status: string;
};

type Payment = {
  id: string;
  invoiceId: string;
  amount: number;
  method: string;
  processedAt?: string;
};

type InsuranceClaim = {
  id: string;
  patientId: string;
  insurerName: string;
  policyNumber?: string;
  amountClaimed: number;
  amountPaid: number;
  status: string;
};

export default function BillingPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'claims'>('invoices');
  const [invoicePatientId, setInvoicePatientId] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('0');
  const [paymentInvoiceId, setPaymentInvoiceId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [claimPatientId, setClaimPatientId] = useState('');
  const [claimInsurerName, setClaimInsurerName] = useState('');
  const [claimPolicyNumber, setClaimPolicyNumber] = useState('');
  const [claimAmount, setClaimAmount] = useState('0');

  // Queries updated to use /api prefix
  const invoicesQuery = useQuery({
    queryKey: ['invoices'],
    queryFn: () => fetcher<Invoice[]>('/api/billing/invoices'),
  });

  const paymentsQuery = useQuery({
    queryKey: ['payments'],
    queryFn: () => fetcher<Payment[]>('/api/billing/payments'),
  });

  const claimsQuery = useQuery({
    queryKey: ['claims'],
    queryFn: () => fetcher<InsuranceClaim[]>('/api/billing/claims'),
  });

  // Mutations updated to v5 Object syntax and /api prefix
  const createInvoice = useMutation({
    mutationFn: (payload: Partial<Invoice>) => post<Invoice>('/api/billing/invoice', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      setInvoicePatientId('');
      setInvoiceAmount('0');
    },
  });

  const createPayment = useMutation({
    mutationFn: (payload: Partial<Payment>) => post<Payment>('/api/billing/payment', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      setPaymentInvoiceId('');
      setPaymentAmount('0');
    },
  });

  const createClaim = useMutation({
    mutationFn: (payload: Partial<InsuranceClaim>) => post<InsuranceClaim>('/api/billing/claim', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      setClaimPatientId('');
      setClaimInsurerName('');
      setClaimAmount('0');
    },
  });

  return (
    <Layout>
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Billing & Insurance</h1>
          <p className="mt-2 text-slate-600">Track invoices, payments, and insurance claims from a unified financial dashboard.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {['invoices', 'payments', 'claims'].map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab as 'invoices' | 'payments' | 'claims')}
                className={`rounded-3xl px-5 py-3 text-sm font-medium transition ${
                  activeTab === tab ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.8fr]">
            <div className="space-y-6">
              {activeTab === 'invoices' && (
                <div className="space-y-4">
                  {invoicesQuery.isLoading ? (
                    <p className="text-slate-500">Loading invoices...</p>
                  ) : (
                    invoicesQuery.data?.map(invoice => (
                      <div key={invoice.id} className="rounded-3xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-semibold text-slate-900">Invoice {invoice.id}</p>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{invoice.status}</span>
                        </div>
                        <p className="mt-2 text-slate-600">Patient ID: {invoice.patientId}</p>
                        <p className="mt-1 text-slate-600">Total: ${invoice.totalAmount}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="space-y-4">
                  {paymentsQuery.isLoading ? (
                    <p className="text-slate-500">Loading payments...</p>
                  ) : (
                    paymentsQuery.data?.map(payment => (
                      <div key={payment.id} className="rounded-3xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-semibold text-slate-900">Payment {payment.id}</p>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{payment.method}</span>
                        </div>
                        <p className="mt-2 text-slate-600">Invoice ID: {payment.invoiceId}</p>
                        <p className="mt-1 text-slate-600">Amount: ${payment.amount}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'claims' && (
                <div className="space-y-4">
                  {claimsQuery.isLoading ? (
                    <p className="text-slate-500">Loading claims...</p>
                  ) : (
                    claimsQuery.data?.map(claim => (
                      <div key={claim.id} className="rounded-3xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-semibold text-slate-900">Claim {claim.id}</p>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{claim.status}</span>
                        </div>
                        <p className="mt-2 text-slate-600">Patient ID: {claim.patientId}</p>
                        <p className="mt-1 text-slate-600">Insurer: {claim.insurerName}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              {activeTab === 'invoices' && (
                <>
                  <h2 className="text-xl font-semibold text-slate-900">Create invoice</h2>
                  <div className="mt-5 space-y-4">
                    <label className="block text-sm text-slate-700">
                      Patient ID
                      <input value={invoicePatientId} onChange={event => setInvoicePatientId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                    </label>
                    <label className="block text-sm text-slate-700">
                      Amount
                      <input type="number" value={invoiceAmount} onChange={event => setInvoiceAmount(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                    </label>
                    <button
                      type="button"
                      onClick={() => createInvoice.mutate({ patientId: invoicePatientId, totalAmount: parseFloat(invoiceAmount), status: 'pending' })}
                      disabled={createInvoice.isPending}
                      className="inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {createInvoice.isPending ? 'Creating...' : 'Create invoice'}
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'payments' && (
                <>
                  <h2 className="text-xl font-semibold text-slate-900">Log payment</h2>
                  <div className="mt-5 space-y-4">
                    <label className="block text-sm text-slate-700">
                      Invoice ID
                      <input value={paymentInvoiceId} onChange={event => setPaymentInvoiceId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                    </label>
                    <label className="block text-sm text-slate-700">
                      Amount
                      <input type="number" value={paymentAmount} onChange={event => setPaymentAmount(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                    </label>
                    <label className="block text-sm text-slate-700">
                      Method
                      <select value={paymentMethod} onChange={event => setPaymentMethod(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none">
                        <option value="card">Card</option>
                        <option value="cash">Cash</option>
                        <option value="insurance">Insurance</option>
                      </select>
                    </label>
                    <button
                      type="button"
                      onClick={() => createPayment.mutate({ invoiceId: paymentInvoiceId, amount: parseFloat(paymentAmount), method: paymentMethod })}
                      disabled={createPayment.isPending}
                      className="inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {createPayment.isPending ? 'Saving...' : 'Record payment'}
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'claims' && (
                <>
                  <h2 className="text-xl font-semibold text-slate-900">Submit claim</h2>
                  <div className="mt-5 space-y-4">
                    <label className="block text-sm text-slate-700">
                      Patient ID
                      <input value={claimPatientId} onChange={event => setClaimPatientId(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                    </label>
                    <label className="block text-sm text-slate-700">
                      Insurer
                      <input value={claimInsurerName} onChange={event => setClaimInsurerName(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                    </label>
                    <label className="block text-sm text-slate-700">
                      Policy number
                      <input value={claimPolicyNumber} onChange={event => setClaimPolicyNumber(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                    </label>
                    <label className="block text-sm text-slate-700">
                      Claim amount
                      <input type="number" value={claimAmount} onChange={event => setClaimAmount(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 outline-none" />
                    </label>
                    <button
                      type="button"
                      onClick={() => createClaim.mutate({ patientId: claimPatientId, insurerName: claimInsurerName, policyNumber: claimPolicyNumber, amountClaimed: parseFloat(claimAmount), amountPaid: 0, status: 'submitted' })}
                      disabled={createClaim.isPending}
                      className="inline-flex w-full justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {createClaim.isPending ? 'Submitting...' : 'Submit claim'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}