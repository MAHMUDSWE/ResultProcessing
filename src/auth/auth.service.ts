import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) { }

  async validateUser() {

  }

  async login(loginDto: LoginDto) {

  }

  async register() {

  }
}