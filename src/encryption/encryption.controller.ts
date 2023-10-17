import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { UserEntity } from '@/user/entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateEncryptionDto } from './dto/create-encryption.dto';
import { UpdateEncryptionDto } from './dto/update-encryption.dto';
import { EncryptionService } from './encryption.service';

@Controller('encryption')
@ApiTags('Encryption')
@UseGuards(JwtAuthGuard)
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post()
  @ApiCreatedResponse()
  create(
    @User() user: UserEntity,
    @Body() createEncryptionDto: CreateEncryptionDto,
  ) {
    return this.encryptionService.create(user.id, createEncryptionDto);
  }

  @Get()
  findAll() {
    return this.encryptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encryptionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEncryptionDto: UpdateEncryptionDto,
  ) {
    return this.encryptionService.update(+id, updateEncryptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encryptionService.remove(+id);
  }
}
