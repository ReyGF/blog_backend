import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommonsModule } from './commons/commons.module';
import env from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env],
    }),
    AuthModule,
    PrismaModule,
    CommonsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {

}
