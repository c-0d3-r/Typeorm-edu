import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity }   from '../../../../@core/entities/base.entity';
import type { Comment } from '../../../comments/domain/entities/comment.entity';
import type { User }    from '../../../users/domain/entities/user.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @ManyToOne('User', 'posts', { nullable: false })
  public author: User;

  @OneToMany('Comment', 'post')
  public comments: Comment[];
}
