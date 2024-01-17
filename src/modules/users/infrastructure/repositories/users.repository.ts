import { Injectable }          from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import type { EntityManager }  from 'typeorm';

import { CreateUserDto }       from '../../application/dtos/create-user.dto';
import { User }                from '../../domain/entities/user.entity';

// https://orkhan.gitbook.io/typeorm/docs/entity-manager-api
@Injectable()
export class UsersRepository {
  public constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

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
