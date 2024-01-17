import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import type { User }                   from '../../domain/entities/user.entity';
import { UsersQueryRepository }        from '../../infrastructure/repositories/users.query.repository';

export class GetUserQueryCommand {
  public constructor(public readonly id: number) {}
}

@QueryHandler(GetUserQueryCommand)
export class GetUserQuery implements IQueryHandler<GetUserQueryCommand, User> {
  public constructor(
    public readonly usersQueryRepository: UsersQueryRepository,
  ) {}

  public async execute(query: GetUserQueryCommand): Promise<User> {
    return this.usersQueryRepository.getOneById(query.id);
  }
}
