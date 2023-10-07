import { PaginationOptions } from '@/common/dto/pagination-options.dto';

import { CreateKeyDto } from '@/key/dto/create-key.dto';
import { UpdateKeyDto } from '@/key/dto/update-key.dto';
import { KeyEntity } from '@/key/entities/key.entity';
import { KeyService } from '@/key/key.service';
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

@ApiTags('Keys')
@Controller('keys')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  /**
   * Create key
   * @param createKeyDto {CreateKeyDto}
   */
  @Post()
  @ApiCreatedResponse({
    description: 'Created key',
    type: KeyEntity,
  })
  create(@Body() createKeyDto: CreateKeyDto) {
    return this.keyService.create(createKeyDto);
  }

  /**
   * Find all keys
   */
  @Get()
  @ApiOkResponse({
    description: 'Keys',
    type: KeyEntity,
    isArray: true,
  })
  findAll(@Query() paginationOptions: PaginationOptions) {
    return this.keyService.findAll(paginationOptions);
  }

  /**
   * Find key
   * @param id {string}
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'Key',
    type: KeyEntity,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.keyService.findOne(id);
  }

  /**
   * Update key
   * @param id {string}
   * @param updateKeyDto {UpdateKeyDto}
   */
  @Patch(':id')
  @ApiOkResponse({
    description: 'Updated key',
    type: KeyEntity,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateKeyDto: UpdateKeyDto,
  ) {
    return this.keyService.update(id, updateKeyDto);
  }

  /**
   * Delete key
   * @param id {string}
   */
  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted key',
    type: KeyEntity,
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.keyService.remove(id);
  }
}
