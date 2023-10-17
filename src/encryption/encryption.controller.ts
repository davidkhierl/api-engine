import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { CreateEncryptionResponseDto } from '@/encryption/dto/create-encryption-response.dto';
import { EncryptionEntity } from '@/encryption/entities/encryption.entity';
import { UserEntity } from '@/user/entities/user.entity';
import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { EncryptionService } from './encryption.service';

@Controller('encryption')
@ApiTags('Encryption')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created encryption key',
    type: CreateEncryptionResponseDto,
  })
  create(@User() user: UserEntity): Promise<CreateEncryptionResponseDto> {
    return this.encryptionService.create(user.id);
  }

  @Get()
  async findOne(@User() user: UserEntity): Promise<EncryptionEntity> {
    const encryption = await this.encryptionService.findOne(user.id);
    return new EncryptionEntity(encryption);
  }

  @Delete()
  remove(@User() user: UserEntity): Promise<EncryptionEntity> {
    return this.encryptionService.remove(user.id);
  }
}
