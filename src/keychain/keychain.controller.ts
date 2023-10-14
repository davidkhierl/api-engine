import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { KeyEntity } from '@/key/entities/key.entity';
import { CreateKeychainKeyDto } from '@/keychain/dto/create-keychain-key.dto';
import { UpdateKeychainKeyDto } from '@/keychain/dto/update-keychain-key.dto';
import { KeychainEntity } from '@/keychain/entities/keychain.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateKeychainDto } from './dto/create-keychain.dto';
import { UpdateKeychainDto } from './dto/update-keychain.dto';
import { KeychainService } from './keychain.service';

@Controller('keychains')
@ApiTags('Keychains')
@UseGuards(JwtAuthGuard)
export class KeychainController {
  constructor(private readonly keychainService: KeychainService) {}

  /**
   * Create keychain
   */
  @Post()
  @ApiCreatedResponse({
    description: 'Created keychain',
    type: KeychainEntity,
  })
  create(
    @Body() createKeychainDto: CreateKeychainDto,
  ): Promise<KeychainEntity> {
    return this.keychainService.create(createKeychainDto);
  }

  /**
   * Get all keychains
   */
  @Get()
  @ApiOkResponse({
    description: 'Keychains',
    type: KeychainEntity,
    isArray: true,
  })
  findAll(
    @Query() paginationOptions: PaginationOptions,
  ): Promise<KeychainEntity[]> {
    return this.keychainService.findAll(paginationOptions);
  }

  /**
   * Get keychain
   */
  @Get(':keychainId')
  @ApiOkResponse({ description: 'Keychain', type: KeychainEntity })
  findOne(@Param('keychainId') keychainId: string): Promise<KeychainEntity> {
    return this.keychainService.findOne(keychainId);
  }

  /**
   * Update keychain
   */
  @Patch(':keychainId')
  @ApiOkResponse({ description: 'Updated keychain', type: KeychainEntity })
  update(
    @Param('keychainId') keychainId: string,
    @Body() updateKeychainDto: UpdateKeychainDto,
  ): Promise<KeychainEntity> {
    return this.keychainService.update(keychainId, updateKeychainDto);
  }

  /**
   * Delete keychain
   */
  @Delete(':keychainId')
  @ApiOkResponse({
    description: 'Deleted keychain',
    type: KeychainEntity,
  })
  remove(@Param('keychainId') keychainId: string): Promise<KeychainEntity> {
    return this.keychainService.remove(keychainId);
  }

  /**
   * Create keychain key
   */
  @Post(':keychainId/keys')
  @ApiCreatedResponse({
    description: 'Created keychain key',
    type: KeyEntity,
  })
  createKey(
    @Param('keychainId') keychainId: string,
    @Body() createKeychainKeyDto: CreateKeychainKeyDto,
  ): Promise<KeyEntity> {
    return this.keychainService.createKey(keychainId, createKeychainKeyDto);
  }

  /**
   * Get all keychain keys
   */
  @Get(':keychainId/keys')
  @ApiOkResponse({
    description: 'Keychain keys',
    type: KeyEntity,
    isArray: true,
  })
  findAllKeys(
    @Param('keychainId') keychainId: string,
    @Query() paginationOptions: PaginationOptions,
  ): Promise<KeyEntity[]> {
    return this.keychainService.findAllKeys(keychainId, paginationOptions);
  }

  /**
   * Get keychain key
   */
  @Get(':keychainId/keys/:keyId')
  @ApiOkResponse({
    description: 'Keychain Key',
    type: KeyEntity,
  })
  findOneKey(
    @Param('keychainId') keychainId: string,
    @Param('keyId') keyId: string,
  ): Promise<KeyEntity> {
    return this.keychainService.findKey(keychainId, keyId);
  }

  /**
   * Update a keychain key
   */
  @Patch(':keychainId/keys/:keyId')
  @ApiOkResponse({
    description: 'Updated keychain key',
    type: KeyEntity,
  })
  updateKey(
    @Param('keychainId') keychainId: string,
    @Param('keyId') keyId: string,
    @Body() updateKeychainKeyDto: UpdateKeychainKeyDto,
  ): Promise<KeyEntity> {
    return this.keychainService.updateKey(
      keychainId,
      keyId,
      updateKeychainKeyDto,
    );
  }

  /**
   * Delete keychain key
   */
  @Delete(':keychainId/keys/:keyId')
  @ApiOkResponse({
    description: 'Deleted keychain key',
    type: KeyEntity,
  })
  removeKey(
    @Param('keychainId') keychainId: string,
    @Param('keyId') keyId: string,
  ): Promise<KeyEntity> {
    return this.keychainService.removeKey(keychainId, keyId);
  }
}
