import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res, HttpCode
} from "@nestjs/common";
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * 登录
   * @param req
   * @param createAdminDto
   */
  @HttpCode(200)
  @Post('login')
  login(@Req() req, @Body() createAdminDto: CreateAdminDto) {
    const { code } = req.session;
    return this.adminService.login(code, createAdminDto);
  }

  /**
   * 注册
   */
  @Post('register')
  register(@Req() req, @Body() createAdminDto: CreateAdminDto) {
    const { captcha } = createAdminDto;
    // if (captcha !== req.session.code) {
    //   return '验证码错误';
    // }
    return this.adminService.register(createAdminDto);
  }

  /**
   * 获取验证码
   */
  @Get('code')
  getCode(@Req() req, @Res() res) {
    const { text, data } = this.adminService.getCode();
    console.log(text, data);
    req.session.code = text;
    res.type('image/svg+xml');
    return res.send(data);
  }

  /**
   * 查询
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  /**
   * 更新
   * @param id
   * @param updateAdminDto
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  /**
   * 删除
   * @param id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
