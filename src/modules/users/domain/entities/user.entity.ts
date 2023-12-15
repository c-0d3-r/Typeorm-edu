import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

import type { Product } from 'src/modules/products/domain/entities/product.entity';

import { BaseEntity }   from '../../../../@core/entities/base.entity';
import type { Comment } from '../../../comments/domain/entities/comment.entity';
import type { Post }    from '../../../posts/domain/entities/post.entity';

enum AccountType {
  facebook = 'facebook',
  google = 'google',
}

@Entity()
export class Account extends BaseEntity {
  @Column({ type: 'enum', enum: AccountType, default: AccountType.facebook })
  public accountType: AccountType;

  @OneToOne('Account')
  @JoinColumn()
  public user: number;
}

@Entity()
export class User extends BaseEntity {
  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column({ nullable: true })
  public tel: string;

  // @OneToMany(() => Comment, (comment) => comment.author)
  @OneToMany('Comment', 'author')
  public comments: Comment[];

  @OneToMany('Post', 'author')
  public posts: Post[];

  @ManyToMany('Product', 'users')
  public products: Product[];
}
