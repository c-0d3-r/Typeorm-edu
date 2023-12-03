import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity }                                        from '../../../../@core/entities/base.entity';
import type { Post }                                         from '../../../posts/domain/entities/post.entity';
import type { User }                                         from '../../../users/domain/entities/user.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public text: string;

  @ManyToOne('User', 'comments')
  public author: User; // --> authorId

  @ManyToOne('Post', 'comments', { nullable: false })
  public post: Post; // --> postId
}
