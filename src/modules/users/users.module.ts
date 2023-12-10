import { Module }           from '@nestjs/common';
import { TypeOrmModule }    from '@nestjs/typeorm';

import { Account, User }    from 'src/modules/users/domain/entities/user.entity';

import { UsersControllers } from './controllers/users.controller';
import { UsersRepository }  from './infrastructure/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account])],
  controllers: [UsersControllers],
  providers: [UsersRepository],
})
export class UsersModule {}
