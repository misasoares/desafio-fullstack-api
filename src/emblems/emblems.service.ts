import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmblemsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const emblems = await this.prisma.emblems.findMany();
    return emblems;
  }

  findOne(id: number) {
    return `This action returns a #${id} emblem`;
  }
}
