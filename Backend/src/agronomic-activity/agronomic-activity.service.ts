/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AgronomicActivityDto } from './dto/agronomicActivity.dto';

@Injectable()
export class AgronomicActivityService {
  constructor(private prisma: PrismaService) {}
  async createAgronomicActivity(dto: AgronomicActivityDto) {
    const { date, type, inputs, duration, userId, plotId } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const foundPlot = await this.prisma.plot.findUnique({
      where: { id: plotId },
    });
    if (!foundUser) {
      return { message: 'User or plot not found' };
    }
    if (!foundPlot) {
      return { message: 'Plot not found' };
    }
    const createdActivity = await this.prisma.agronomicActivity.create({
      data: {
        date,
        type,
        inputs,
        duration,
        userId,
        plotId,
      },
    });
    return {
      message: 'Agronomic activity created successfully',
      createdActivity,
    };
  }
  async deleteAgronomicActivity(id: string) {
    const foundActivity = await this.prisma.agronomicActivity.findUnique({
      where: { id },
    });
    if (!foundActivity) {
      return { message: 'Activity not found' };
    }
    await this.prisma.agronomicActivity.delete({ where: { id } });
    return {
      message: 'Agronomic activity deleted successfully',
      activityDeleted: foundActivity,
    };
  }
  async updateAgronomicActivity(id: string, dto: AgronomicActivityDto) {
    const { date, type, inputs, duration, userId, plotId } = dto;
    const foundActivity = await this.prisma.agronomicActivity.findUnique({
      where: { id },
    });
    if (!foundActivity) {
      return { message: 'Activity not found' };
    }
    const updatedActivity = await this.prisma.agronomicActivity.update({
      where: { id },
      data: {
        date,
        type,
        inputs,
        duration,
        userId,
        plotId,
      },
    });
    return {
      message: 'Agronomic activity updated successfully',
      updatedActivity,
    };
  }
  async getAgronomicActivity(id: string) {
    const activity = await this.prisma.agronomicActivity.findUnique({
      where: { id },
    });
    return { activity };
  }
  async getAgronomicActivities() {
    return await this.prisma.agronomicActivity.findMany();
  }
}
