import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { UpdateKeyDto } from '@/key/dto/update-key.dto';
import { KeyEntity } from '@/key/entities/key.entity';
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
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateKeychainDto } from './dto/create-keychain.dto';
import { UpdateKeychainDto } from './dto/update-keychain.dto';
import { KeychainService } from './keychain.service';

@ApiTags('Keychains')
@Controller('keychains')
export class KeychainController {
  constructor(private readonly keychainService: KeychainService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created keychain',
    type: KeychainEntity,
  })
  create(@Body() createKeychainDto: CreateKeychainDto) {
    return this.keychainService.create(createKeychainDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Keychains',
    type: KeychainEntity,
    isArray: true,
  })
  findAll(@Query() paginationOptions: PaginationOptions) {
    return this.keychainService.findAll(paginationOptions);
  }

  @Get(':keychainId')
  @ApiOkResponse({
    description: 'Keychain',
    type: KeychainEntity,
  })
  findOne(@Param('keychainId') keychainId: string) {
    return this.keychainService.findOne(keychainId);
  }

  @Patch(':keychainId')
  @ApiOkResponse({
    description: 'Updated keychain',
    type: KeychainEntity,
  })
  update(
    @Param('keychainId') keychainId: string,
    @Body() updateKeychainDto: UpdateKeychainDto,
  ) {
    return this.keychainService.update(keychainId, updateKeychainDto);
  }

  @Delete(':keychainId')
  @ApiOkResponse({
    description: 'Deleted keychain',
    type: KeychainEntity,
  })
  remove(@Param('keychainId') keychainId: string) {
    return this.keychainService.remove(keychainId);
  }

  @Post(':keychainId/keys')
  @ApiCreatedResponse({
    description: 'Created key',
    type: KeyEntity,
  })
  createKey(
    @Param('keychainId') keychainId: string,
    @Body() createKeyDto: CreateKeyDto,
  ) {
    return this.keychainService.createKey(keychainId, createKeyDto);
  }

  @Get(':keychainId/keys')
  @ApiOkResponse({
    description: 'Keychain keys',
    type: KeyEntity,
    isArray: true,
  })
  findAllKeys(
    @Param('keychainId') keychainId: string,
    @Query() paginationOptions: PaginationOptions,
  ) {
    return this.keychainService.findAllKeys(keychainId, paginationOptions);
  }

  @Get(':keychainId/keys/:keyId')
  @ApiOkResponse({
    description: 'Key',
    type: KeyEntity,
  })
  findOneKey(
    @Param('keychainId') keychainId: string,
    @Param('keyId') keyId: string,
  ) {
    return this.keychainService.findKey(keychainId, keyId);
  }

  @Patch(':keychainId/keys/:keyId')
  @ApiOkResponse({
    description: 'Updated key',
    type: KeyEntity,
  })
  updateKey(
    @Param('keychainId') keychainId: string,
    @Param('keyId') keyId: string,
    @Body() updateKeyDto: UpdateKeyDto,
  ) {
    return this.keychainService.updateKey(keychainId, keyId, updateKeyDto);
  }

  @Delete(':keychainId/keys/:keyId')
  @ApiOkResponse({
    description: 'Deleted key',
    type: KeyEntity,
  })
  removeKey(
    @Param('keychainId') keychainId: string,
    @Param('keyId') keyId: string,
  ) {
    return this.keychainService.removeKey(keychainId, keyId);
  }
}
