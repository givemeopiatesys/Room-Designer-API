// import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
// import { JwtContextType } from 'src/types/jwt-context.type';
// import { AuthService } from './auth.service';
// import { ExtractJwtContext } from './decorators/jwt.decorator';
// import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
// import { JwtAuthGuard } from './guards/jwt.guard';
//
// @Controller('auth')
// export class AuthController {
//   constructor(@Inject(AuthService) private readonly authService: AuthService) {}
//
//   @Post('/register')
//   registerUser(@Body() body: RegisterUserDto) {
//     return this.authService.registerUser(body);
//   }
//
//   @Post('/login')
//   loginUser(@Body() body: LoginUserDto) {
//     return this.authService.loginUser(body);
//   }
//
//   @UseGuards(new JwtAuthGuard())
//   @Get('/test-identity')
//   testIdentity(@ExtractJwtContext() context: JwtContextType) {
//     return context;
//   }
// }