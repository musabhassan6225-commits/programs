import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { Invoice } from './invoice.entity';
import { Payment } from './payment.entity';
import { InsuranceClaim } from './insurance-claim.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Payment, InsuranceClaim])],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
