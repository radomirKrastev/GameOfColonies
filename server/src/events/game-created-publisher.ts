import { Subjects, BasePublisher, GameCreatedEvent } from '@rkclns/colonies-common'

export class GameCreatedPublisher extends BasePublisher<GameCreatedEvent> {
  subject: Subjects.GameCreated = Subjects.GameCreated;
}
 