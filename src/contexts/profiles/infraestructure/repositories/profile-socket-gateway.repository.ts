import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../../domain/ports/profile.repository';
import { ProfileInterface } from '../../domain/interfaces/profile.interface';

@Injectable()
@WebSocketGateway({ cors: true })
export class ProfileSocketGateway extends ProfileRepository {
  @WebSocketServer() server: Server;

  constructor() {
    super();
  }

  async emitProfile(room: string, profile: ProfileInterface): Promise<void> {
    this.server.to(room).emit('profile', JSON.stringify(profile));
  }
}
