import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../../../@core/entities/base.entity';
import type { Comment } from '../../../comments/domain/entities/comment.entity';
import type { Post } from '../../../posts/domain/entities/post.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

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
}
