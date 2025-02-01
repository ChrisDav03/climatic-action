import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PlotsService } from './plots.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PlotDto } from './dto/plot.dto';

@Controller('plots')
export class PlotsController {
  constructor(private readonly plotsService: PlotsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  createPlot(@Body() dto: PlotDto) {
    return this.plotsService.createPlot(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePlot(@Param() params: { id: string }) {
    return this.plotsService.deletePlot(params.id);
  }
  @Put(':id')
  updatePlot(@Param() params: { id: string }, @Body() dto: PlotDto) {
    return this.plotsService.updatePlot(params.id, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyPlot(@Param() params: { id: string }) {
    return this.plotsService.getMyPlot(params.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getPlots() {
    return this.plotsService.getPlots();
  }
}
