import { PaginationOptions } from '@/common/dto/pagination-options.dto';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { UpdateKeyDto } from '@/key/dto/update-key.dto';
import { KeyEntity } from '@/key/entities/key.entity';
import { KeyService } from '@/key/key.service';
import { UserEntity } from '@/user/entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('keys')
@ApiTags('Keys')
@UseGuards(JwtAuthGuard)
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  /**
   * Create key
   */
  @Post()
  @ApiCreatedResponse({
    description: 'Created key',
    type: KeyEntity,
  })
  create(
    @User() user: UserEntity,
    @Body() createKeyDto: CreateKeyDto,
  ): Promise<KeyEntity> {
    return this.keyService.create(user.id, createKeyDto);
  }

  /**
   * Get all keys
   */
  @Get()
  @ApiOkResponse({
    description: 'Keys',
    type: KeyEntity,
  })
  findAll(
    @User() user: UserEntity,
    @Query() paginationOptions: PaginationOptions,
  ): Promise<KeyEntity[]> {
    return this.keyService.findAll(user.id, paginationOptions);
  }

  /**
   * Get key
   */
  @Get(':keyId')
  @ApiOkResponse({
    description: 'Key',
    type: KeyEntity,
  })
  findOne(
    @User() user: UserEntity,
    @Param('keyId', ParseUUIDPipe) keyId: string,
  ): Promise<KeyEntity> {
    return this.keyService.findOne(keyId, user.id);
  }

  /**
   * Update key
   */
  @Patch(':keyId')
  @ApiOkResponse({
    description: 'Updated key',
    type: KeyEntity,
  })
  update(
    @User() user: UserEntity,
    @Param('keyId', ParseUUIDPipe) keyId: string,
    @Body() updateKeyDto: UpdateKeyDto,
  ): Promise<KeyEntity> {
    return this.keyService.update(keyId, user.id, updateKeyDto);
  }

  /**
   * Delete key
   */
  @Delete(':keyId')
  @ApiOkResponse({
    description: 'Deleted key',
    type: KeyEntity,
  })
  remove(
    @User() user: UserEntity,
    @Param('keyId', ParseUUIDPipe) keyId: string,
  ): Promise<KeyEntity> {
    return this.keyService.remove(keyId, user.id);
  }
}
