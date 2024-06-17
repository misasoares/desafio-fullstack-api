import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserLoginResponse } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserLoginResponse {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      emblems: user.emblems,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
      id: user.id,
      name: user.name,
      emblems: user.emblems,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return { ...user, password: undefined };
      }
    }

    throw new UnauthorizedException('Email ou senha incorretos.');
  }
}
