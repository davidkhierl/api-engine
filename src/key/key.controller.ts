import { PaginationOptions } from '@/common/dto/pagination-options.dto';
import { KeyEntity } from '@/key/entities/key.entity';
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
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { KeyService } from './key.service';

@ApiTags('Keys')
@Controller('keys')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  /**
   * Create a user key
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
   * Find all user keys
   */
  @Get()
  @ApiOkResponse({
    description: 'User keys',
    type: KeyEntity,
    isArray: true,
  })
  findAll(@Query() paginationOptions: PaginationOptions) {
    return this.keyService.findAll(paginationOptions);
  }

  /**
   * Find a user key
   * @param id {string}
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'User key',
    type: KeyEntity,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.keyService.findOne(id);
  }

  /**
   * Update user key
   * @param id {string}
   * @param updateKeyDto {UpdateKeyDto}
   */
  @Patch(':id')
  @ApiOkResponse({
    description: 'Update user key',
    type: KeyEntity,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateKeyDto: UpdateKeyDto,
  ) {
    return this.keyService.update(id, updateKeyDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted user key',
    type: KeyEntity,
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.keyService.remove(id);
  }
}
