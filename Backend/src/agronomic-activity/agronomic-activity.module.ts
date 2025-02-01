import { Module } from '@nestjs/common';
import { AgronomicActivityService } from './agronomic-activity.service';
import { AgronomicActivityController } from './agronomic-activity.controller';

@Module({
  controllers: [AgronomicActivityController],
  providers: [AgronomicActivityService],
})
export class AgronomicActivityModule {}
