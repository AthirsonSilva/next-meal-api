import { PartialType } from '@nestjs/swagger';
import { CreateDeskDto } from './create-desk.dto';

export class UpdateDeskDto extends PartialType(CreateDeskDto) {}
