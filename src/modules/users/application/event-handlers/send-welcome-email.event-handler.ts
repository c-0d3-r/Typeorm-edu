import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserCreatedEvent }             from '../events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class SendWelcomeEmailEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  public async handle({ username }: UserCreatedEvent) {
    console.log('Sending welcome email for %s...', username);
  }
  public constructor() {}
}
