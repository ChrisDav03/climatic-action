/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
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
    return { message: 'Sign-up was successful' };
  }

  async signIn(dto: AuthDto, req: Request, res: Response) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }
    const isMatch = await this.comparePassword({
      password,
      hash: foundUser.hashedPassword,
    });
    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }
    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });
    if (!token) {
      throw new BadRequestException('Something went wrong');
    }
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    return res.send({
      message: 'Sign-in was successful',
      userId: foundUser.id,
      email: foundUser.email,
    });
  }

  async getUser(req: Request) {
    const token = req.cookies['token'];
    if (!token) throw new ForbiddenException('Not authenticated');

    try {
      const decoded = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) throw new ForbiddenException('User not found');
      return { id: user.id, email: user.email };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ForbiddenException('Token has expired');
      }
      throw new ForbiddenException('Invalid token');
    }
  }

  signOut(req: Request, res: Response) {
    res.clearCookie('token', { httpOnly: true, secure: true });
    return res.send({ message: 'Sign-out was successful' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(args: { password: string; hash: string }) {
    return bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; email: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET });
  }
}
