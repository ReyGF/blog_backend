import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';
import { LoginAuthDto } from './dto/login-auth.dto';
import { BcryptService } from 'src/commons/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from 'src/interfaces/user-response.interface';
import { UserMapper } from './mappers/user.mapper';
import { Request } from 'express';



@Injectable()
export class AuthService {

  constructor(

    private readonly pismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,

  ) { }

  private async findByEmail(email: string): Promise<Users> {
    return await this.pismaService.users.findUnique({
      where: {
        email: email
      }
    });
  }

  async register(createAuthDto: RegisterAuthDto): Promise<UserResponse> {

    const existsUser = await this.findByEmail(createAuthDto.email);

    if (existsUser) {
      throw new BadRequestException('Failed to register');
    }

    createAuthDto.password = this.bcryptService.hasher(createAuthDto.password);

    const user = await this.pismaService.users.create({
      data: createAuthDto
    });

    const token = this.jwtService.sign({ id: user.id });

    return UserMapper.toResponse(user, token);
  }

  async login(loginAuthDto: LoginAuthDto): Promise<UserResponse> {

    const user = await this.findByEmail(loginAuthDto.email);

    if (!user) {
      throw new BadRequestException('Failed to login');
    }

    const isValidCredentials = await this.bcryptService.comparer(loginAuthDto.password, user.password);
    if (!isValidCredentials) {
      throw new UnauthorizedException('Failed to login');
    }

    const token = this.jwtService.sign({ id: user.id });

    return UserMapper.toResponse(user, token);
  }

  async publi() {

    return { ok: true, msg: 'Public route' };
  }

  async privi(req: Request) {
    return { ok: true, msg: 'Private route', user: req['user'] };
  }

}
