import { Injectable } from '@nestjs/common';
import { CreateKitchenDto } from './dto/create-kitchen.dto';
import { UpdateKitchenDto } from './dto/update-kitchen.dto';

@Injectable()
export class KitchensService {
  create(createKitchenDto: CreateKitchenDto) {
    return 'This action adds a new kitchen';
  }

  findAll() {
    return `This action returns all kitchens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kitchen`;
  }

  update(id: number, updateKitchenDto: UpdateKitchenDto) {
    return `This action updates a #${id} kitchen`;
  }

  remove(id: number) {
    return `This action removes a #${id} kitchen`;
  }
}
