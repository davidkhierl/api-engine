import { KeyService } from '@/key/key.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('KeyService', () => {
  let service: KeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyService],
    }).compile();

    service = module.get<KeyService>(KeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
