import { Test, TestingModule } from '@nestjs/testing';
import { KryptoService } from './krypto.service';

describe('KryptoService', () => {
  let service: KryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KryptoService],
    }).compile();

    service = module.get<KryptoService>(KryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
