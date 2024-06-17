import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
      message: 'Usuário criado com sucesso.',
    };
  }

  async getUser(userId: string) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        emblems: true,
      },
    });
    if (!findUser) throw new BadRequestException('Usuário não encontrado.');
    return findUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: {
        emblems: true,
      },
    });
  }

  async getRandomEmblem(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        emblems: true,
      },
    });

    if (!user) throw new BadRequestException('Usuário não encontrado');

    const userEmblemIds = user.emblems.map((emblem) => emblem.id);

    const emblems = await this.prisma.emblems.findMany({
      where: {
        id: { notIn: userEmblemIds },
      },
    });

    if (emblems.length === 0)
      throw new BadRequestException('Você já possui todos os emblemas.');

    const randomEmblemIndex = Math.floor(Math.random() * emblems.length);

    const userConnectEmblem = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emblems: { connect: { id: emblems[randomEmblemIndex].id } },
      },
      include: {
        emblems: true,
      },
    });

    return userConnectEmblem;
  }
}
