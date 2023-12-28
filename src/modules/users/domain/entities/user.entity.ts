import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

import type { Product } from 'src/modules/products/domain/entities/product.entity';

import type { Account } from './account.entity';
import { BaseEntity }   from '../../../../@core/entities/base.entity';
import type { Comment } from '../../../comments/domain/entities/comment.entity';
import type { Post }    from '../../../posts/domain/entities/post.entity';

@Entity()
// @Index(['username', 'email'], { unique: true })
export class User extends BaseEntity {
  @Column()
  public username: string;

  @Column()
  @Index('userEmail', { unique: true })
  public email: string;

  @Column({ nullable: true })
  public tel: string;

  @OneToOne('Account')
  public account: Account;

  // @OneToMany(() => Comment, (comment) => comment.author)
  @OneToMany('Comment', 'author')
  public comments: Comment[];

  @OneToMany('Post', 'author')
  public posts: Post[];

  @ManyToMany('Product', 'users')
  public products: Product[];
}
