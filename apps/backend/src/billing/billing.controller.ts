import { Body, Controller, Get, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Invoice } from './invoice.entity';
import { Payment } from './payment.entity';
import { InsuranceClaim } from './insurance-claim.entity';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('invoices')
  async invoices(): Promise<Invoice[]> {
    return this.billingService.findInvoices();
  }

  @Get('payments')
  async payments(): Promise<Payment[]> {
    return this.billingService.findPayments();
  }

  @Get('claims')
  async claims(): Promise<InsuranceClaim[]> {
    return this.billingService.findClaims();
  }

  @Post('invoice')
  async createInvoice(@Body() payload: Partial<Invoice>): Promise<Invoice> {
    return this.billingService.createInvoice(payload);
  }

  @Post('payment')
  async createPayment(@Body() payload: Partial<Payment>): Promise<Payment> {
    return this.billingService.createPayment(payload);
  }

  @Post('claim')
  async createClaim(@Body() payload: Partial<InsuranceClaim>): Promise<InsuranceClaim> {
    return this.billingService.createClaim(payload);
  }
}
