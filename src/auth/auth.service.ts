import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtService } from '@nestjs/jwt';
import { CaptchaObj } from "svg-captcha";
import * as svgCaptcha from "svg-captcha";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly user: Repository<Auth>,
    private readonly JwtService: JwtService,
  ) {}

  /**
   * 注册
   * @param signupData
   */
  async register(signupData: CreateAuthDto) {
    if (signupData.password.length >= 20) return '密码过长';
    const findUser = await this.user.findOne({
      where: { username: signupData.username },
    });
    if (findUser && findUser.username === signupData.username)
      return '用户已存在';
    // 对密码进行加密处理
    signupData.password = bcryptjs.hashSync(signupData.password, 10);
    await this.user.save(signupData);
    return '注册成功';
  }

  /**
   * 登录
   * @param loginData
   */
  async login(loginData: CreateAuthDto) {
    if (loginData.role !== 'admin') return '权限不足';
    const findUser = await this.user.findOne({
      where: { username: loginData.username },
    });
    // 没有找到
    if (!findUser) return '用户不存在';

    // 找到了对比密码
    const compareRes: boolean = bcryptjs.compareSync(
      loginData.password,
      findUser.password,
    );
    // 密码不正确
    if (!compareRes) return '密码不正确';

    const payload = { username: findUser.username };

    return {
      token: this.JwtService.sign(payload),
    };
  }

  /**
   * 获取验证码
   */
  getCode(): CaptchaObj {
    return svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: `#${Math.random().toString(16).substr(-6)}`, //背景颜色
    });
  }
}
