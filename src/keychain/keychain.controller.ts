import { PaginationOptions } from '@/common/dto/pagination-options.dto';
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

  @Get(':id')
  @ApiOkResponse({
    description: 'Keychain',
    type: KeychainEntity,
  })
  findOne(@Param('id') id: string) {
    return this.keychainService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Updated keychain',
    type: KeychainEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateKeychainDto: UpdateKeychainDto,
  ) {
    return this.keychainService.update(id, updateKeychainDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted keychain',
    type: KeychainEntity,
  })
  remove(@Param('id') id: string) {
    return this.keychainService.remove(id);
  }

  @Get(':id/keys')
  @ApiOkResponse({
    description: 'Keychain keys',
    type: KeyEntity,
    isArray: true,
  })
  findAllKeys(
    @Query() paginationOptions: PaginationOptions,
    @Param('id') id: string,
  ) {
    return this.keychainService.findAllKeys(id, paginationOptions);
  }
}
