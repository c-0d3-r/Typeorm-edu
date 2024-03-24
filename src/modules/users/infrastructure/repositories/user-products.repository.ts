import { Injectable }                            from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import type { EntityManager, Repository }        from 'typeorm';

import { CreateProductDto }                      from 'src/modules/products/application/dtos/create-product.dto';
import { Product }                               from 'src/modules/products/domain/entities/product.entity';

import { User }                                  from '../../domain/entities/user.entity';

@Injectable()
export class UserProductsRepository {
  public constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async getAllAndCount(userId: number): Promise<[Product[], number]> {
    try {
      const result = await this.products
        .createQueryBuilder('p')
        // u -> alias for joined table
        // .leftJoinAndSelect('p.users', 'u')
        // .leftJoinAndSelect('p.users', 'u', 'p.title  = :title', {
        //   title: 'Spider Man',
        // })
        .leftJoinAndMapOne('p.userInfo', 'p.users', 'u')
        .select([
          'p.id',
          'p.title',
          'p.createdAt',
          'p.updatedAt',
          'u.id',
          'u.username',
        ])
        .where('u.id = :userId', { userId })
        .orderBy('p.id', 'DESC')
        .getManyAndCount();

      return result;
    } catch (error) {
      console.log(error);

      return [[], 0];
    }
  }

  public async deleteAll(userId: number): Promise<void> {
    try {
      const result = await this.entityManager
        .createQueryBuilder()
        .delete()
        .from('users_products')
        .where('up.userId = :userId', { userId })
        .execute();

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  public async add(userId: number, data: CreateProductDto): Promise<Product> {
    try {
      const product = new Product();
      product.title = data.title;

      await this.products.save(product);

      const productId = product.id;

      await this.entityManager
        .createQueryBuilder()
        .insert()
        .into('users_products')
        .values([{ productId, userId }])
        .execute();

      return product;
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
