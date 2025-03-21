import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
  @Post('signin')
  signIn(@Body() dto: AuthDto, @Req() req, @Res() res) {
    return this.authService.signIn(dto, req, res);
  }
  @Post('signout')
  signOut(@Req() req, @Res() res) {
    return this.authService.signOut(req, res);
  }
  @Get('me')
  getUser(@Req() req) {
    return this.authService.getUser(req);
  }
}
