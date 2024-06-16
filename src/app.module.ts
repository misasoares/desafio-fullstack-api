import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CustomResponseInterceptor } from './shared/response/custom-response.interceptor';
import { CustomExceptionFilter } from './shared/response/exceptions/custom-exception';
import { ClassValidatorPipe } from './shared/pipes/vaidation.pipe';
import { EmblemsModule } from './emblems/emblems.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, EmblemsModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ClassValidatorPipe,
    },
  ],
})
export class AppModule {}
