import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DesksService } from './desks.service';
import { CreateDeskDto } from './dto/create-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';

@Controller('desks')
export class DesksController {
  constructor(private readonly desksService: DesksService) {}

  @Post()
  create(@Body() createDeskDto: CreateDeskDto) {
    return this.desksService.create(createDeskDto);
  }

  @Get()
  findAll() {
    return this.desksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeskDto: UpdateDeskDto) {
    return this.desksService.update(+id, updateDeskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desksService.remove(+id);
  }
}
