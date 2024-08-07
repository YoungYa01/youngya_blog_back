import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * 查询
   */
  @Get('info')
  findOne(@Req() req) {
    const { authorization } = req.headers;
    return this.adminService.getUserInfo(
      authorization.split(' ')[0] === 'Bearer'
        ? authorization.split(' ')[1]
        : authorization,
    );
  }

  //
  // /**
  //  * 更新
  //  * @param id
  //  * @param updateAdminDto
  //  */
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return "this.adminService.update(+id, updateAdminDto)";
  // }
  //
  // /**
  //  * 删除
  //  * @param id
  //  */
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return "this.adminService.remove(+id)";
  // }
}
