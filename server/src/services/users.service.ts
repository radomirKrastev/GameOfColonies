import { Socket } from 'socket.io';
import { usersRepository } from '../repository';

export const usersService = {
  addUserSocket: (userId: string, socket: Socket) => {
    console.log('addUserSocket')
    usersRepository.addUserSocket(userId, socket);
  },
  getUserSocket: async (userId: string) => {
    return await usersRepository.getUserSocket(userId);
  }
};
