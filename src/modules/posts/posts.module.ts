import { Module }          from '@nestjs/common';
import { TypeOrmModule }   from '@nestjs/typeorm';

import { Post }            from 'src/modules/posts/domain/entities/post.entity';

import { PostsController } from './controllers/posts.controller';
import { PostsRepository } from './infrastructure/repositories/posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsRepository],
})
export class PostsModule {}
