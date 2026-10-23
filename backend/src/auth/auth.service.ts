
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const validUsername = 'admin';
    const validPassword = 'admin123';

    if (
      username !== validUsername ||
      password !== validPassword
    ) {

      throw new UnauthorizedException(
        'Usuário ou senha inválidos',
      );
    }

    const payload = {
      sub: 1,
      username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }

}

