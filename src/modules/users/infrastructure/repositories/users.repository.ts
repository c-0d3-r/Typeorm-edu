import { Injectable }          from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import type { EntityManager }  from 'typeorm';

import { CreateUserDto }       from '../../application/dtos/create-user.dto';
import { GetUserDto }          from '../../application/dtos/get-user.dto';
import { User }                from '../../domain/entities/user.entity';

// https://orkhan.gitbook.io/typeorm/docs/entity-manager-api
@Injectable()
export class UsersRepository {
  public constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async getAllAndCount(): Promise<[User[], number]> {
    try {
      const result = await this.entityManager.findAndCount(User);

      return result;
    } catch (error) {
      console.log(error);

      return [[], 0];
    }
  }

  public async getOneById(id: number): Promise<User> {
    try {
      const result = await this.entityManager.findOne(User, {
        where: { id },
        relations: {
          comments: true,
          posts: true,
        },
        // relations: ['comments', 'posts'],
      });

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public async getOneByQuery(query: GetUserDto): Promise<User> {
    try {
      const result = await this.entityManager.findOne(User, {
        where: query,
      });

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public async findByName(name: string): Promise<User[]> {
    try {
      const result = await this.entityManager
        .createQueryBuilder()
        .select('u')
        // .select(['u.id', 'u.username'])
        .from(User, 'u')
        .where('u.username LIKE :name', { name: `${name}%` })
        .printSql()
        .getMany();

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public async deleteById(id: number): Promise<void> {
    try {
      await this.entityManager.delete(User, id);
    } catch (error) {
      console.log(error);
    }
  }

  public async save(data: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.username = data.username;
      user.email = data.email;
      user.tel = data.tel ?? null;

      return await this.entityManager.save(user);
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
