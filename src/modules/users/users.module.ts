import { Module }           from '@nestjs/common';
import { TypeOrmModule }    from '@nestjs/typeorm';

import { User }             from 'src/modules/users/domain/entities/user.entity';

import { UsersControllers } from './controllers/users.controller';
import { UsersRepository }  from './infrastructure/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersControllers],
  providers: [UsersRepository],
})
export class UsersModule {}
