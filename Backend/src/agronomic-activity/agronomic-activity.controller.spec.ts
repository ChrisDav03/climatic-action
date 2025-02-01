import { Test, TestingModule } from '@nestjs/testing';
import { AgronomicActivityController } from './agronomic-activity.controller';
import { AgronomicActivityService } from './agronomic-activity.service';

describe('AgronomicActivityController', () => {
  let controller: AgronomicActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgronomicActivityController],
      providers: [AgronomicActivityService],
    }).compile();

    controller = module.get<AgronomicActivityController>(AgronomicActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
