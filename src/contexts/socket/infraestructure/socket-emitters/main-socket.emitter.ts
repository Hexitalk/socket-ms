import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { MainEmitter } from '../../domain/ports/main.emitter';
import { ProfileInterface } from 'src/contexts/profiles/domain/interfaces/profile.interface';
import { envs } from 'src/config';

@Injectable()
@WebSocketGateway(envs.socketOptions)
export class MainSocketEmitter extends MainEmitter {
  @WebSocketServer() server: Server;

  constructor() {
    super();
  }

  async emitProfileConnectionStatus(
    room: string,
    profile: ProfileInterface,
    status: string,
  ): Promise<void> {
    this.server.to(room).emit('profile', JSON.stringify({ profile, status }));
  }
}
