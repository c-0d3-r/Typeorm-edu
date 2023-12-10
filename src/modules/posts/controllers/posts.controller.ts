import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { Comment }                                   from 'src/modules/comments/domain/entities/comment.entity';

import { CreateCommentDto }                          from '../application/dtos/create-comment.dto';
import { CreatePostDto }                             from '../application/dtos/create-post.dto';
import { Post as PostEntity }                        from '../domain/entities/post.entity';
import { PostsRepository }                           from '../infrastructure/repositories/posts.repository';

@Controller('posts')
export class PostsController {
  public constructor(private readonly postsRepository: PostsRepository) {}

  @Post()
  public async create(@Body() data: CreatePostDto): Promise<PostEntity> {
    return this.postsRepository.create(data);
  }

  @Post(':id/comments')
  public async createComment(@Body() data: CreateCommentDto): Promise<Comment> {
    return this.postsRepository.createComment(data);
  }

  @Get('all')
  public async getAllAndCount(
    @Query('title') title?: string,
  ): Promise<[PostEntity[], number]> {
    if (title) {
      const result = await this.postsRepository.findByTitle(title);

      return result;
    }

    return this.postsRepository.getAllAndCount();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<PostEntity> {
    return this.postsRepository.getOneById(id);
  }
}
