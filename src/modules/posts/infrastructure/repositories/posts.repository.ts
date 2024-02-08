import { Injectable }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { Comment }          from 'src/modules/comments/domain/entities/comment.entity';

import { CreateCommentDto } from '../../application/dtos/create-comment.dto';
import { CreatePostDto }    from '../../application/dtos/create-post.dto';
import { Post }             from '../../domain/entities/post.entity';
import { UpdatePostDto }    from '../../application/dtos/update-post.dto';

@Injectable()
export class PostsRepository {
  public constructor(
    @InjectRepository(Post)
    private readonly posts: Repository<Post>,
  ) {}

  public async getAllAndCount(): Promise<[Post[], number]> {
    try {
      const result = await this.posts.findAndCount({
        order: {
          title: 'ASC',
        },
        // take: 5,
      });

      return result;
    } catch (error) {
      console.log(error);

      return [[], 0];
    }
  }

  public async getOneById(id: number): Promise<Post> {
    try {
      const result = await this.posts.findOne({
        where: { id },
      });

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public async findByTitle(
    title: string,
    // { size, page }: { size: number; page: number } = { size: 1, page: 2 },
  ): Promise<[Post[], number]> {
    try {
      const result = await this.posts
        .createQueryBuilder('p')
        // .createQueryBuilder()
        // .where('title = :title', { title })
        // .leftJoin('p.author', 'a')
        .leftJoinAndSelect('p.author', 'a')
        // .leftJoinAndMapOne('p.postAuthor', 'p.author', 'a')
        // .select(['p.title', 'a.username'])
        // .select('a.*')
        // .skip((page - 1) * size)
        // .take(size)
        .getManyAndCount();

      // const rawData = await this.posts
      //   .createQueryBuilder('p')
      //   .leftJoinAndSelect('p.author', 'a')
      //   .select(['p.title', 'a.username'])
      //   .addSelect('SUM(2 + 2)', 'sum')
      //   .getRawMany();

      // console.log(rawData);

      return result;
    } catch (error) {
      console.log(error);

      return [[], 0];
    }
  }

  public async update(id: number, data: UpdatePostDto): Promise<void> {
    try {
      const result = await this.posts
        .createQueryBuilder()
        .update()
        .set(data)
        .where('id = :id', { id })
        .orWhere('authorId = :authorId', { authorId: 44 })
        .execute();

      console.log(result);
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public async create(data: CreatePostDto): Promise<Post> {
    try {
      const result = await this.posts.save(data);

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public async createComment(data: CreateCommentDto): Promise<Comment> {
    try {
      const post = await this.posts.findOne({
        where: { id: data.postId },
        relations: ['comments'],
      });

      const comment = new Comment();
      comment.authorId = data.authorId;
      comment.postId = data.postId;
      comment.text = data.text;

      post.comments.push(comment);

      await this.posts.save(post);

      return comment;
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
