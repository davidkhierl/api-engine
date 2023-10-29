export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  //
  // /**
  //  * User id
  //  * @example 75b49489-e8f7-4a27-840a-b88a1b77e2df
  //  */
  // id: string;
  // /**
  //  * User name
  //  * @example "John doe"
  //  */
  // name: string;
  // /**
  //  * User email
  //  * @example johndoe@email.com
  //  */
  // email: string;
  // /**
  //  * User password hash
  //  */
  // @Exclude()
  // @ApiHideProperty()
  // password_hash: string;
  // /**
  //  * User role
  //  */
  // @ApiProperty({ enum: UserRole, default: UserRole.USER })
  // role: UserRole;
  // /**
  //  * User created date
  //  */
  // created_at: Date;
  // /**
  //  * User updated date
  //  */
  // updated_at: Date;
}
