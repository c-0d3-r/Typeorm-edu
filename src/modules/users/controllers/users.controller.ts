import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CreateProductDto }       from 'src/modules/products/application/dtos/create-product.dto';
import type { Product }           from 'src/modules/products/domain/entities/product.entity';

import { CreateUserDto }          from '../application/dtos/create-user.dto';
import { GetUserDto }             from '../application/dtos/get-user.dto';
import type { User }              from '../domain/entities/user.entity';
import { UserProductsRepository } from '../infrastructure/repositories/user-products.repository';
import { UsersRepository }        from '../infrastructure/repositories/users.repository';

@Controller('users')
export class UsersControllers {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userProductsRepository: UserProductsRepository,
  ) {}

  @Get('all')
  public async getAllAndCount(
    @Query('name') name?: string,
  ): Promise<[User[], number]> {
    if (name) {
      const result = await this.usersRepository.findByName(name);

      return [result, result.length];
    }

    return this.usersRepository.getAllAndCount();
  }

  @Post()
  public async save(@Body() data: CreateUserDto): Promise<User> {
    return this.usersRepository.save(data);
  }

  @Get(':id')
  public async getById(@Param('id') id: number): Promise<User> {
    return this.usersRepository.getOneById(id);
  }

  @Delete(':id')
  public async deleteById(@Param('id') id: number): Promise<void> {
    return this.usersRepository.deleteById(id);
  }

  @Get()
  public async getOneByQuery(@Body() body: GetUserDto): Promise<User> {
    return this.usersRepository.getOneByQuery(body);
  }

  @Get(':id/products')
  public async getProducts(
    @Param('id') id: number,
  ): Promise<[Product[], number]> {
    return this.userProductsRepository.getAllAndCount(id);
  }

  @Delete(':id/products')
  public async deleteProducts(@Param('id') id: number): Promise<void> {
    return this.userProductsRepository.deleteAll(id);
  }

  @Post(':id/products')
  public async addProduct(
    @Param('id') id: number,
    @Body() data: CreateProductDto,
  ): Promise<Product> {
    return this.userProductsRepository.add(id, data);
  }
}
