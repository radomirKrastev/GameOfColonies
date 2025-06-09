import { Socket } from 'socket.io';

//TODO add actual DB
const usersSockets = new Set<{ id: string, socket: Socket }>();

export const usersRepository = {
  addUserSocket: (userId: string, socket: Socket) => {
    console.log(socket.id)
    usersRepository.deleteUserSockets(userId);
    usersSockets.add({ id: userId, socket })
  },
  deleteUserSockets: (userId: string) => {
    usersSockets.forEach(x => {
      if(x.id === userId) {
        usersSockets.delete(x);
      }
    })
  },
  getUserSocket: async (userId: string): Promise<Socket | null> => {
    const entries = usersSockets.entries();
    const values = usersSockets.values();
    const keys = usersSockets.keys();

    let socket: Socket | null = null;

    for (const key of keys) {
      if (key.id === userId) {
        socket = key.socket;
        break;
      }
    }

    return socket;
  }
}
