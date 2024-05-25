import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {}

  async login(user: any) {
    const payload = { 
      username: user.username,
      sub: user.userId,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserFromToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      if (!decoded) {
        return null;
      }
      //return this.usersService.findOne(decoded.sub);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
