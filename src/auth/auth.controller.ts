import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtContextType } from '../Ultils/JwtContextType';
import { ExtractJwtContext } from '../Ultils/jwt.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() body: RegisterUserDto) {
    return this.authService.registerUser(body);
  }

  @Post('/login')
  loginUser(@Body() body: LoginUserDto) {
    return this.authService.loginUser(body);
  }

  @UseGuards(new JwtAuthGuard())
  @Get('/test-identity')
  testIdentity(@ExtractJwtContext() context: JwtContextType) {
    return context;
  }
}
