import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { CreateKeychainDto } from '@/keychain/dto/create-keychain.dto';
import { UpdateKeychainDto } from '@/keychain/dto/update-keychain.dto';
import { KeychainEntity } from '@/keychain/entities/keychain.entity';
import { KeychainService } from '@/keychain/keychain.service';
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
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Keychains')
@Controller('keychains')
export class KeychainController {
  constructor(private readonly keyService: KeychainService) {}

  /**
   * Create a user key
   * @param createKeychainDto {CreateKeychainDto}
   */
  @Post()
  @ApiCreatedResponse({
    description: 'Created keychain',
    type: KeychainEntity,
  })
  create(@Body() createKeychainDto: CreateKeychainDto) {
    return this.keyService.create(createKeychainDto);
  }

  /**
   * Find all keychains
   */
  @Get()
  @ApiOkResponse({
    description: 'Keychains',
    type: KeychainEntity,
    isArray: true,
  })
  findAll(@Query() paginationOptions: PaginationOptions) {
    return this.keyService.findAll(paginationOptions);
  }

  /**
   * Find keychain
   * @param id {string}
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'Keychain',
    type: KeychainEntity,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.keyService.findOne(id);
  }

  /**
   * Update keychain
   * @param id {string}
   * @param updateKeychainDto {UpdateKeychainDto}
   */
  @Patch(':id')
  @ApiOkResponse({
    description: 'Updated keychain',
    type: KeychainEntity,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateKeychainDto: UpdateKeychainDto,
  ) {
    return this.keyService.update(id, updateKeychainDto);
  }

  /**
   * Delete keychain
   * @param id {string}
   */
  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted keychain',
    type: KeychainEntity,
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.keyService.remove(id);
  }
}
