import { PartialType } from '@nestjs/swagger';
import { CreateKeychainDto } from './create-keychain.dto';

export class UpdateKeychainDto extends PartialType(CreateKeychainDto) {}
