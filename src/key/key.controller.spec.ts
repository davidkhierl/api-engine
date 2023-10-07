import { KeyController } from '@/key/key.controller';
import { KeyService } from '@/key/key.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('KeychainController', () => {
  let controller: KeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyController],
      providers: [KeyService],
    }).compile();

    controller = module.get<KeyController>(KeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
