import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { AuthService } from './auth.service';

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.signIn(body.email, body.password);
  }
}
