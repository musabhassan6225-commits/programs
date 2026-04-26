import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { Role } from './common/constants';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  // We use NestExpressApplication to give us access to 'useStaticAssets'
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1. Fix the "fuck this shit" issue (CORS)
  // This allows your browser to accept data from this API
  app.enableCors();

  // 2. Set the Global Prefix
  // This ensures your frontend calls to /api/doctors actually hit the controllers
  app.setGlobalPrefix('api');

  // 3. Standard Middleware & Pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' });

  // 4. Seeding Logic (Admin User)
  const usersService = app.get(UsersService);
  const users = await usersService.findAll();
  if (!users.length) {
    const passwordHash = await bcrypt.hash('Password123!', 10);
    await usersService.create({
      email: 'admin@example.com',
      fullName: 'Clinic Admin',
      passwordHash,
      roles: [Role.Admin],
      clinicId: 'clinic-1',
    });
    console.log('✅ Seeded default admin user: admin@example.com / Password123!');
  }

  // 5. Start the Server
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 4200;
  
  await app.listen(port);
  console.log(`🚀 Backend is live at: http://localhost:${port}/api`);
}

bootstrap();