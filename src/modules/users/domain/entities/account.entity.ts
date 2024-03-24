import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity }                           from 'src/@core/entities/base.entity';

import type { User }                            from './user.entity';

enum AccountType {
  facebook = 'facebook',
  google = 'google',
}

@Entity()
export class Account extends BaseEntity {
  @Column({ type: 'enum', enum: AccountType, default: AccountType.facebook })
  public accountType: AccountType;

  @OneToOne('User')
  // @JoinColumn([
  //   { referencedColumnName: 'email', name: 'email' },
  //   { referencedColumnName: 'username', name: 'username' },
  // ])
  @JoinColumn({
    referencedColumnName: 'email',
    foreignKeyConstraintName: 'user_email',
  })
  public user: User;
}
