import { Controller, Post, Body, Req, HttpCode, Get, Res } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 注册
  @Public()
  @Post('/register')
  @HttpCode(200)
  signup(@Req() req, @Body() createAuthDto: CreateAuthDto) {
    const { captcha } = createAuthDto;
    if (captcha !== req.session.code) {
      return '验证码错误';
    }
    return this.authService.register(createAuthDto);
  }

  // 登录
  @Public()
  @Post('/login')
  @HttpCode(200)
  login(@Body() loginData: CreateAuthDto) {
    return this.authService.login(loginData);
  }
  /**
   * 获取验证码
   */
  @Public()
  @Get('code')
  getCode(@Req() req, @Res() res) {
    const { text, data } = this.authService.getCode();
    req.session.code = text;
    res.type('image/svg+xml');
    return res.send(data);
  }
}
