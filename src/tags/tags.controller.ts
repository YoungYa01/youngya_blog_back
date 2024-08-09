import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  Query,
  HttpCode,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PaginateType } from '../utils/types';

@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('add')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Post()
  @HttpCode(200)
  findAll(
    @Query() params: PaginateType,
    @Body() createTagDto: CreateTagDto | undefined,
  ) {
    return this.tagsService.findAll(params, createTagDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
