import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import * as svgCaptcha from 'svg-captcha';
import { CaptchaObj } from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async login(code: string, loginAdminDto: CreateAdminDto) {
    // if (code && code.toLowerCase() === loginAdminDto.captcha) {
    if (loginAdminDto.role !== 'admin') {
      return '权限错误！';
    }
    const resp = await this.adminRepository.findOne({
      where: {
        username: loginAdminDto.username,
        password: loginAdminDto.password,
        role: loginAdminDto.role,
      },
    });
    if (!resp) {
      return '用户名或密码错误！';
    }
    return resp;
    // } else {
    //   return '验证码错误！';
    // }
  }

  async register(createAdminDto: CreateAdminDto) {
    return await this.adminRepository.save(createAdminDto);
  }

  getCode(): CaptchaObj {
    return svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: `#${Math.random().toString(16).substr(-6)}`, //背景颜色
    });
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
