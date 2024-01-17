import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import type { User }                       from '../../domain/entities/user.entity';
import { UsersRepository }                 from '../../infrastructure/repositories/users.repository';

export class CreateUserCommand {
  public constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly tel?: string,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase
  implements ICommandHandler<CreateUserCommand, User>
{
  public constructor(public readonly usersRepository: UsersRepository) {}

  public async execute(command: CreateUserCommand): Promise<User> {
    return this.usersRepository.save({
      username: command.username,
      email: command.email,
      tel: command.tel,
    });
  }
}
