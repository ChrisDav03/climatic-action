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
import { AgronomicActivityService } from './agronomic-activity.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AgronomicActivityDto } from './dto/agronomicActivity.dto';

@Controller('agronomic-activity')
export class AgronomicActivityController {
  constructor(
    private readonly agronomicActivityService: AgronomicActivityService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  createAgronomicActivity(@Body() dto: AgronomicActivityDto) {
    return this.agronomicActivityService.createAgronomicActivity(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteAgronomicActivity(@Param() params: { id: string }) {
    return this.agronomicActivityService.deleteAgronomicActivity(params.id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateAgronomicActivity(
    @Param() params: { id: string },
    @Body() dto: AgronomicActivityDto,
  ) {
    return this.agronomicActivityService.updateAgronomicActivity(
      params.id,
      dto,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getAgronomicActivity(@Param() params: { id: string }) {
    return this.agronomicActivityService.getAgronomicActivity(params.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAgronomicActivities() {
    return this.agronomicActivityService.getAgronomicActivities();
  }
}
