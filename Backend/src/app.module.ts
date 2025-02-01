import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PlotsModule } from './plots/plots.module';
import { AgronomicActivityModule } from './agronomic-activity/agronomic-activity.module';

@Module({
  imports: [AuthModule, PrismaModule, PlotsModule, AgronomicActivityModule],
})
export class AppModule {}
