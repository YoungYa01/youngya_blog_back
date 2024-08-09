import { Module } from '@nestjs/common';
import { PraiseService } from './praise.service';
import { PraiseController } from './praise.controller';
import { Praise } from './entities/praise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Praise])],
  controllers: [PraiseController],
  providers: [PraiseService],
})
export class PraiseModule {}
