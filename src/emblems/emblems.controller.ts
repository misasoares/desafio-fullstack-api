import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmblemsService } from './emblems.service';
import { CreateEmblemDto } from './dto/create-emblem.dto';
import { UpdateEmblemDto } from './dto/update-emblem.dto';

@Controller('emblems')
export class EmblemsController {
  constructor(private readonly emblemsService: EmblemsService) {}

  @Post()
  create(@Body() createEmblemDto: CreateEmblemDto) {
    return this.emblemsService.create(createEmblemDto);
  }

  @Get()
  findAll() {
    return this.emblemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emblemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmblemDto: UpdateEmblemDto) {
    return this.emblemsService.update(+id, updateEmblemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emblemsService.remove(+id);
  }
}
