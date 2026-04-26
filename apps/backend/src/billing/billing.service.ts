import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Payment } from './payment.entity';
import { InsuranceClaim } from './insurance-claim.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(InsuranceClaim) private claimRepository: Repository<InsuranceClaim>,
  ) {}

  async findInvoices() {
    return this.invoiceRepository.find();
  }

  async findPayments() {
    return this.paymentRepository.find();
  }

  async findClaims() {
    return this.claimRepository.find();
  }

  async createInvoice(payload: Partial<Invoice>) {
    const invoice = this.invoiceRepository.create(payload);
    return this.invoiceRepository.save(invoice);
  }

  async createPayment(payload: Partial<Payment>) {
    const payment = this.paymentRepository.create(payload);
    return this.paymentRepository.save(payment);
  }

  async createClaim(payload: Partial<InsuranceClaim>) {
    const claim = this.claimRepository.create(payload);
    return this.claimRepository.save(claim);
  }
}
