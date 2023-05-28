import { KeychainController } from '@/keychain/keychain.controller';
import { KeychainService } from '@/keychain/keychain.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('KeychainController', () => {
  let controller: KeychainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeychainController],
      providers: [KeychainService],
    }).compile();

    controller = module.get<KeychainController>(KeychainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
