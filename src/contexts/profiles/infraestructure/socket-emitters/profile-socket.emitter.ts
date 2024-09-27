import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
// import { Injectable } from '@nestjs/common';
import { ProfileInterface } from '../../domain/interfaces/profile.interface';
import { ProfileEmitter } from '../../domain/ports/profile.emitter';
import { envs } from 'src/config';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';

@Injectable()
@WebSocketGateway(envs.socketOptions)
export class ProfilesSocketEmitter extends ProfileEmitter {
  @WebSocketServer() server: Server;

  constructor() {
    super();
  }

  async emitProfile(rooms: string[], profile: ProfileInterface): Promise<void> {
    this.server.to(rooms).emit('profiles-profile-info', profile);
  }
}
