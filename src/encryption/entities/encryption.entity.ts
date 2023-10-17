import { ApiHideProperty } from '@nestjs/swagger';import { Encryption } from '@prisma/client';import { Exclude } from 'class-transformer';export class EncryptionEntity implements Encryption {  constructor(partial: Partial<EncryptionEntity>) {    Object.assign(this, partial);  }  id: string;  short: string;  @Exclude()  @ApiHideProperty()  test: string;  created_at: Date;  updated_at: Date;  user_id: string;}