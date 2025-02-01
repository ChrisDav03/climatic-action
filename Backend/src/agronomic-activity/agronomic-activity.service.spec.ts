import { Test, TestingModule } from '@nestjs/testing';
import { AgronomicActivityService } from './agronomic-activity.service';

describe('AgronomicActivityService', () => {
  let service: AgronomicActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgronomicActivityService],
    }).compile();

    service = module.get<AgronomicActivityService>(AgronomicActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
