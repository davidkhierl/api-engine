import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { KeyService } from '@/key/key.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('keys')
@ApiTags('Keys')
@UseGuards(JwtAuthGuard)
export class KeyController {
  constructor(private readonly keyService: KeyService) {}
  //
  // /**
  //  * Create key
  //  */
  // @Post()
  // @ApiCreatedResponse({
  //   description: 'Created key',
  //   type: KeyEntity,
  // })
  // create(
  //   @User() user: UserEntity,
  //   @Body() createKeyDto: CreateKeyDto,
  // ): Promise<KeyEntity> {
  //   return this.keyService.create(user.id, createKeyDto);
  // }
  //
  // /**
  //  * Get all keys
  //  */
  // @Get()
  // @ApiOkResponse({
  //   description: 'Keys',
  //   type: KeyEntity,
  // })
  // findAll(
  //   @User() user: UserEntity,
  //   @Query() paginationOptions: PaginationOptions,
  // ): Promise<KeyEntity[]> {
  //   return this.keyService.findAll(user.id, paginationOptions);
  // }
  //
  // /**
  //  * Get key
  //  */
  // @Get(':keyId')
  // @ApiOkResponse({
  //   description: 'Key',
  //   type: KeyEntity,
  // })
  // findOne(
  //   @User() user: UserEntity,
  //   @Param('keyId', ParseUUIDPipe) keyId: string,
  // ): Promise<KeyEntity> {
  //   return this.keyService.findOne(keyId, user.id);
  // }
  //
  // /**
  //  * Update key
  //  */
  // @Patch(':keyId')
  // @ApiOkResponse({
  //   description: 'Updated key',
  //   type: KeyEntity,
  // })
  // update(
  //   @User() user: UserEntity,
  //   @Param('keyId', ParseUUIDPipe) keyId: string,
  //   @Body() updateKeyDto: UpdateKeyDto,
  // ): Promise<KeyEntity> {
  //   return this.keyService.update(keyId, user.id, updateKeyDto);
  // }
  //
  // /**
  //  * Delete key
  //  */
  // @Delete(':keyId')
  // @ApiOkResponse({
  //   description: 'Deleted key',
  //   type: KeyEntity,
  // })
  // remove(
  //   @User() user: UserEntity,
  //   @Param('keyId', ParseUUIDPipe) keyId: string,
  // ): Promise<KeyEntity> {
  //   return this.keyService.remove(keyId, user.id);
  // }
}
