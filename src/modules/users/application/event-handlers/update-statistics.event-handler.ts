import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserCreatedEvent }             from '../events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UpdateStatisticsEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  public async handle({ username }: UserCreatedEvent) {
    await new Promise((res) => setTimeout(res, 1000));
    console.log('Updating statistics...');
    console.log(
      'User with username %s created, writing to repository...',
      username,
    );
  }
  public constructor() {}
}
