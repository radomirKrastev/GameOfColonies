import { Subjects, Publisher, GameCreatedEvent } from '@rkclns/colonies-common'

export class GameCreatedPublisher extends Publisher<GameCreatedEvent> {
  subject: Subjects.GameCreated = Subjects.GameCreated;
}
 