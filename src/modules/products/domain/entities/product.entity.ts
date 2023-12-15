import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity }                            from '../../../../@core/entities/base.entity';
import type { User }                             from '../../../users/domain/entities/user.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  public title: string;

  @ManyToMany('User', 'products', { nullable: false })
  @JoinTable({
    name: 'users_products',
  })
  public users: User[];
}
