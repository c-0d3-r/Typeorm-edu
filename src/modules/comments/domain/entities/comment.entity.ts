import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity }                from '../../../../@core/entities/base.entity';
import type { Post }                 from '../../../posts/domain/entities/post.entity';
import type { User }                 from '../../../users/domain/entities/user.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  public text: string;

  @ManyToOne('User', 'comments')
  public author: User; // --> authorId

  @Column()
  public authorId: number;

  @ManyToOne('Post', 'comments', { nullable: false })
  public post: Post; // --> postId

  @Column()
  public postId: number;
}
