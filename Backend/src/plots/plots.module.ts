import { Module } from '@nestjs/common';
import { PlotsService } from './plots.service';
import { PlotsController } from './plots.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [PlotsController],
  providers: [PlotsService, JwtStrategy],
})
export class PlotsModule {}
