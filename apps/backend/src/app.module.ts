import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { ClinicModule } from './clinic/clinic.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ChartingModule } from './charting/charting.module';
import { DoctorModule } from './doctor/doctor.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { BillingModule } from './billing/billing.module';
import { ImagingModule } from './imaging/imaging.module';
import { TreatmentModule } from './treatments/treatment.module';
import { RolesGuard } from './common/guards/roles.guard';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { User } from './users/user.entity';
import { Clinic } from './clinic/clinic.entity';
import { Patient } from './patients/patient.entity';
import { Appointment } from './appointments/appointment.entity';
import { ToothChart } from './charting/chart.entity';
import { PeriodontalRecord } from './charting/periodontal-record.entity';
import { DoctorProfile } from './doctor/doctor-profile.entity';
import { Invoice } from './billing/invoice.entity';
import { Payment } from './billing/payment.entity';
import { InsuranceClaim } from './billing/insurance-claim.entity';
import { ImagingAsset } from './imaging/image.entity';
import { TreatmentPlan } from './treatments/treatment-plan.entity';
import { ScheduleSlot } from './scheduling/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DATABASE_PORT', '5432'), 10),
        username: configService.get<string>('DATABASE_USER', 'dpms_user'),
        password: configService.get<string>('DATABASE_PASSWORD', 'dpms_password'),
        database: configService.get<string>('DATABASE_NAME', 'dpms'),
        entities: [
          User,
          Clinic,
          Patient,
          Appointment,
          ToothChart,
          PeriodontalRecord,
          DoctorProfile,
          Invoice,
          Payment,
          InsuranceClaim,
          ImagingAsset,
          TreatmentPlan,
          ScheduleSlot,
        ],
        autoLoadEntities: true,
        synchronize: true,
        logging: ['error', 'warn'],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ClinicModule,
    PatientsModule,
    AppointmentsModule,
    ChartingModule,
    DoctorModule,
    SchedulingModule,
    BillingModule,
    ImagingModule,
    TreatmentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
