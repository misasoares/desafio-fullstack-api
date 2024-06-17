import { Controller, Get, Param } from '@nestjs/common';
import { EmblemsService } from './emblems.service';

@Controller('emblems')
export class EmblemsController {
  constructor(private readonly emblemsService: EmblemsService) {}

  @Get()
  findAll() {
    return this.emblemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emblemsService.findOne(+id);
  }
}
