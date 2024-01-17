import { Module }                       from '@nestjs/common';
import {
  CqrsModule,
  ICommandHandler,
  IEventHandler,
  IQueryHandler,
} from '@nestjs/cqrs';
import { TypeOrmModule }                from '@nestjs/typeorm';

import { User }                         from 'src/modules/users/domain/entities/user.entity';

import { SendWelcomeEmailEventHandler } from './application/event-handlers/send-welcome-email.event-handler';
import { UpdateStatisticsEventHandler } from './application/event-handlers/update-statistics.event-handler';
import { GetUserQuery }                 from './application/queries/get-user.query';
import { CreateUserUseCase }            from './application/use-cases/create-user.use-case';
import { UsersControllers }             from './controllers/users.controller';
import { Account }                      from './domain/entities/account.entity';
import { UserProductsRepository }       from './infrastructure/repositories/user-products.repository';
import { UsersQueryRepository }         from './infrastructure/repositories/users.query.repository';
import { UsersRepository }              from './infrastructure/repositories/users.repository';
import { Product }                      from '../products/domain/entities/product.entity';

const useCases: { new (...args: any): ICommandHandler<any, any> }[] = [
  CreateUserUseCase,
];

const queries: { new (...args: any): IQueryHandler<any, any> }[] = [
  GetUserQuery,
];

const eventHandlers: { new (...args: any): IEventHandler<any> }[] = [
  UpdateStatisticsEventHandler,
  SendWelcomeEmailEventHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, Product]), CqrsModule],
  controllers: [UsersControllers],
  providers: [
    UsersRepository,
    UsersQueryRepository,
    UserProductsRepository,
    ...useCases,
    ...queries,
    ...eventHandlers,
  ],
})
export class UsersModule {}
