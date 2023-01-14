import { PartialType } from '@nestjs/swagger';
import { CreateKitchenDto } from './create-kitchen.dto';

export class UpdateKitchenDto extends PartialType(CreateKitchenDto) {}
