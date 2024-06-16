import { Injectable } from '@nestjs/common';
import { CreateEmblemDto } from './dto/create-emblem.dto';
import { UpdateEmblemDto } from './dto/update-emblem.dto';

@Injectable()
export class EmblemsService {
  create(createEmblemDto: CreateEmblemDto) {
    return 'This action adds a new emblem';
  }

  findAll() {
    return `This action returns all emblems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emblem`;
  }

  update(id: number, updateEmblemDto: UpdateEmblemDto) {
    return `This action updates a #${id} emblem`;
  }

  remove(id: number) {
    return `This action removes a #${id} emblem`;
  }
}
