import { PartialType } from '@nestjs/mapped-types';
import { CreatePraiseDto } from './create-praise.dto';

export class UpdatePraiseDto extends PartialType(CreatePraiseDto) {}
