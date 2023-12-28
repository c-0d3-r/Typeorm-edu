import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity }                                   from '../../../../@core/entities/base.entity';
import type { User }                                    from '../../../users/domain/entities/user.entity';

@Entity()
export class Product extends BaseEntity {
  @Index('product_title', { unique: true })
  @Column()
  public title: string;

  @Column({ default: '' })
  public description: string;

  @ManyToMany('User', 'products', { nullable: false })
  @JoinTable({
    name: 'users_products',
  })
  public users: User[];
}
