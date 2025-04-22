import { Subjects, BaseListener, GameCreatedEvent } from '@rkclns/colonies-common'
import { Message } from 'node-nats-streaming';

export class GameCreatedListener extends BaseListener<GameCreatedEvent> {
  subject: Subjects.GameCreated = Subjects.GameCreated;
  queueGroupName = "game-service";

  onMessage(data: GameCreatedEvent['data'], msg: Message): void {
    console.log('Event data!', data);

    console.log(data.id)

    msg.ack();
  }
}