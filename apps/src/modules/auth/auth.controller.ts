import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDto) {
    return this.auth.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: AuthDto) {
    return this.auth.login(body.email, body.password);
  }
}
