import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KitchensService } from './kitchens.service';
import { CreateKitchenDto } from './dto/create-kitchen.dto';
import { UpdateKitchenDto } from './dto/update-kitchen.dto';

@Controller('kitchens')
export class KitchensController {
  constructor(private readonly kitchensService: KitchensService) {}

  @Post()
  create(@Body() createKitchenDto: CreateKitchenDto) {
    return this.kitchensService.create(createKitchenDto);
  }

  @Get()
  findAll() {
    return this.kitchensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kitchensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKitchenDto: UpdateKitchenDto) {
    return this.kitchensService.update(+id, updateKitchenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kitchensService.remove(+id);
  }
}
