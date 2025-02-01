/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async signUp(dto: AuthDto) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.hashPassword(password);
    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
    return { message: 'signUp was successfull' };
  }

  async signIn(dto: AuthDto, req: Request, res: Response) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (!foundUser) {
      throw new BadRequestException('Wrong Credentials');
    }
    const isMatch = await this.comparePassword({
      password,
      hash: foundUser.hashedPassword,
    });
    if (!isMatch) {
      throw new BadRequestException('Wrong Credentials');
    }
    //sign jwt and return the user
    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });
    if (!token) {
      throw new BadRequestException('Something went wrong');
    }
    res.cookie('token', token, { httpOnly: true });
    return res.send({
      message: 'Sign-in was successful',
      userId: foundUser.id,
      email: foundUser.email,
    });
  }

  signOut(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'signOut was successfull' });
  }

  async hashPassword(password: string) {
    const salt0rRounds = 10;
    return bcrypt.hash(password, salt0rRounds);
  }

  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }
  async signToken(args: { id: string; email: string }) {
    const payload = args;
    return await this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
