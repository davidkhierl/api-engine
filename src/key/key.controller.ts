import { PaginationOptions } from '@/common/dto/pagination-options.dto';

import { Roles } from '@/auth/decorators/roles.decorators';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
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
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

@Controller('keys')
@ApiTags('Keys')
@Roles(UserRole.ADMIN)
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
  create(@Body() createKeyDto: CreateKeyDto): Promise<KeyEntity> {
    return this.keyService.create(createKeyDto);
  }

  /**
   * Get all keys
   */
  @Get()
  @ApiOkResponse({
    description: 'Keys',
    type: KeyEntity,
  })
  findAll(@Query() paginationOptions: PaginationOptions): Promise<KeyEntity[]> {
    return this.keyService.findAll(paginationOptions);
  }

  /**
   * Get key
   */
  @Get(':keyId')
  @ApiOkResponse({
    description: 'Key',
    type: KeyEntity,
  })
  findOne(@Param('keyId', ParseUUIDPipe) keyId: string): Promise<KeyEntity> {
    return this.keyService.findOne(keyId);
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
    @Param('keyId', ParseUUIDPipe) keyId: string,
    @Body() updateKeyDto: UpdateKeyDto,
  ): Promise<KeyEntity> {
    return this.keyService.update(keyId, updateKeyDto);
  }

  /**
   * Delete key
   */
  @Delete(':keyId')
  @ApiOkResponse({
    description: 'Deleted key',
    type: KeyEntity,
  })
  remove(@Param('keyId', ParseUUIDPipe) keyId: string): Promise<KeyEntity> {
    return this.keyService.remove(keyId);
  }
}
