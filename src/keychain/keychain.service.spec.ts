import { Test, TestingModule } from '@nestjs/testing';
import { KeychainService } from './keychain.service';

describe('KeychainService', () => {
  let service: KeychainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeychainService],
    }).compile();

    service = module.get<KeychainService>(KeychainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
