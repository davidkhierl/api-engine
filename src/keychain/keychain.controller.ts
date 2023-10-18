import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { User } from '@/common/decorators/user.decorator';
import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { KeyEntity } from '@/key/entities/key.entity';
import { KeychainEntity } from '@/keychain/entities/keychain.entity';
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
    @User() user: UserEntity,
    @Body() createKeychainDto: CreateKeychainDto,
  ): Promise<KeychainEntity> {
    return this.keychainService.create(user.id, createKeychainDto);
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
    @User() user: UserEntity,
    @Query() paginationOptions: PaginationOptions,
  ): Promise<KeychainEntity[]> {
    return this.keychainService.findAll(user.id, paginationOptions);
  }

  /**
   * Get keychain
   */
  @Get(':keychainId')
  @ApiOkResponse({ description: 'Keychain', type: KeychainEntity })
  findOne(
    @User() user: UserEntity,
    @Param('keychainId', ParseUUIDPipe) keychainId: string,
  ): Promise<KeychainEntity> {
    return this.keychainService.findOne(keychainId, user.id);
  }

  /**
   * Get keychain keys
   */
  @Get(':keychainId/keys')
  @ApiOkResponse({
    description: 'Keychain keys',
    type: KeyEntity,
    isArray: true,
  })
  findKeychainKeys(
    @User() user: UserEntity,
    @Param('keychainId', ParseUUIDPipe) keychainId: string,
    @Query() paginationOptions: PaginationOptions,
  ): Promise<KeyEntity[]> {
    return this.keychainService.findAllKeychainKeys(
      keychainId,
      user.id,
      paginationOptions,
    );
  }

  /**
   * Update keychain
   */
  @Patch(':keychainId')
  @ApiOkResponse({ description: 'Updated keychain', type: KeychainEntity })
  update(
    @User() user: UserEntity,
    @Param('keychainId', ParseUUIDPipe) keychainId: string,
    @Body() updateKeychainDto: UpdateKeychainDto,
  ): Promise<KeychainEntity> {
    return this.keychainService.update(keychainId, user.id, updateKeychainDto);
  }

  /**
   * Delete keychain
   */
  @Delete(':keychainId')
  @ApiOkResponse({
    description: 'Deleted keychain',
    type: KeychainEntity,
  })
  remove(
    @User() user: UserEntity,
    @Param('keychainId', ParseUUIDPipe) keychainId: string,
  ): Promise<KeychainEntity> {
    return this.keychainService.remove(keychainId, user.id);
  }
}
