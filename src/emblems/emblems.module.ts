import { Module } from '@nestjs/common';
import { EmblemsService } from './emblems.service';
import { EmblemsController } from './emblems.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmblemsController],
  providers: [EmblemsService],
})
export class EmblemsModule {}
