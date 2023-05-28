import { KeychainService } from '@/keychain/keychain.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('KeyService', () => {
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
