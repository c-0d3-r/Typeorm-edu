import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus }   from '@nestjs/cqrs';

import { CreateProductDto }       from 'src/modules/products/application/dtos/create-product.dto';
import type { Product }           from 'src/modules/products/domain/entities/product.entity';

import { CreateUserDto }          from '../application/dtos/create-user.dto';
import { GetUserDto }             from '../application/dtos/get-user.dto';
import { GetUserQueryCommand }    from '../application/queries/get-user.query';
import { CreateUserCommand }      from '../application/use-cases/create-user.use-case';
import type { User }              from '../domain/entities/user.entity';
import { UserProductsRepository } from '../infrastructure/repositories/user-products.repository';
import { UsersQueryRepository }   from '../infrastructure/repositories/users.query.repository';
import { UsersRepository }        from '../infrastructure/repositories/users.repository';

@Controller('users')
export class UsersControllers {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly userProductsRepository: UserProductsRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('all')
  public async getAllAndCount(
    @Query('name') name?: string,
  ): Promise<[User[], number]> {
    if (name) {
      const result = await this.usersQueryRepository.findByName(name);

      return [result, result.length];
    }

    return this.usersQueryRepository.getAllAndCount();
  }

  @Post()
  public async save(@Body() data: CreateUserDto): Promise<User> {
    const { username, email, tel } = data;
    const result = await this.commandBus.execute(
      new CreateUserCommand(username, email, tel),
    );

    return result;
  }

  @Get(':id')
  public async getById(@Param('id') id: number): Promise<User> {
    return this.queryBus.execute(new GetUserQueryCommand(id));
  }

  @Delete(':id')
  public async deleteById(@Param('id') id: number): Promise<void> {
    return this.usersRepository.deleteById(id);
  }

  @Get()
  public async getOneByQuery(@Body() body: GetUserDto): Promise<User> {
    return this.usersQueryRepository.getOneByQuery(body);
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
