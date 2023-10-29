import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import {
  ClassSerializerInterceptor,
  Controller,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EncryptionService } from './encryption.service';

@Controller('encryption')
@ApiTags('Encryption')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}
  //
  // @Post()
  // @ApiCreatedResponse({
  //   description: 'Created encryption key',
  //   type: CreateEncryptionResponseDto,
  // })
  // create(@User() user: UserEntity): Promise<CreateEncryptionResponseDto> {
  //   return this.encryptionService.create(user.id);
  // }
  //
  // @Get()
  // async findOne(@User() user: UserEntity): Promise<EncryptionEntity> {
  //   const encryption = await this.encryptionService.findOne(user.id);
  //   return new EncryptionEntity(encryption);
  // }
  //
  // @Delete()
  // remove(@User() user: UserEntity): Promise<EncryptionEntity> {
  //   return this.encryptionService.remove(user.id);
  // }
}
