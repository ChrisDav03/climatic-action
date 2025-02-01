/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PlotDto } from './dto/plot.dto';

@Injectable()
export class PlotsService {
  constructor(private prisma: PrismaService) {}

  async createPlot(dto: PlotDto) {
    const { latitude, longitude, size, cropType, userId } = dto;
    await this.prisma.plot.create({
      data: {
        latitude,
        longitude,
        size,
        cropType,
        userId,
      },
    });
    return { message: 'Plot created successfully' };
  }

  async getMyPlot(id: string) {
    const plot = await this.prisma.plot.findUnique({ where: { id } });
    return { plot };
  }
  async getPlots() {
    return await this.prisma.plot.findMany();
  }

  async deletePlot(id: string) {
    const foundPlot = await this.prisma.plot.findUnique({
      where: { id },
    });
    if (!foundPlot) {
      return { message: 'Merchant not found' };
    }
    await this.prisma.plot.delete({ where: { id } });
    return {
      message: 'Plot deleted successfully',
      merchantDeleted: foundPlot,
    };
  }
  async updatePlot(id: string, dto: PlotDto) {
    const { latitude, longitude, size, cropType, userId } = dto;
    const foundPlot = await this.prisma.plot.findUnique({ where: { id } });
    if (!foundPlot) {
      throw new NotFoundException('Plot not found');
    }
    const updatedPlot = await this.prisma.plot.update({
      where: { id },
      data: {
        latitude,
        longitude,
        size,
        cropType,
        userId,
      },
    });
    return { message: 'Plot updated successfully', data: updatedPlot };
  }
}
