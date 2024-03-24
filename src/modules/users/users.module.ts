import { Module }                 from '@nestjs/common';
import { TypeOrmModule }          from '@nestjs/typeorm';

import { User }                   from 'src/modules/users/domain/entities/user.entity';

import { UsersControllers }       from './controllers/users.controller';
import { Account }                from './domain/entities/account.entity';
import { UserProductsRepository } from './infrastructure/repositories/user-products.repository';
import { UsersRepository }        from './infrastructure/repositories/users.repository';
import { Product }                from '../products/domain/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, Product])],
  controllers: [UsersControllers],
  providers: [UsersRepository, UserProductsRepository],
})
export class UsersModule {}
