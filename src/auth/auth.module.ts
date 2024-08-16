import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonsModule } from 'src/commons/commons.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    CommonsModule,
    JwtModule.register({
      secret: new ConfigService().get('JWT_SEED'),
      signOptions: { expiresIn: '2h' }
    })],
  exports: [JwtModule]
})
export class AuthModule { }
