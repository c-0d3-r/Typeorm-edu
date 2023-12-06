import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CreateUserDto }   from '../application/dtos/create-user.dto';
import { GetUserDto }      from '../application/dtos/get-user.dto';
import { User }            from '../domain/entities/user.entity';
import { UsersRepository } from '../infrastructure/repositories/users.repository';

@Controller('users')
export class UsersControllers {
  public constructor(private readonly usersRepository: UsersRepository) {}

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
}
