import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { envs } from 'src/config';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { HubEmitter } from '../../domain/ports/hub.emitter';
import { HubInterface } from '../../domain/interfaces';

@Injectable()
@WebSocketGateway(envs.socketOptions)
export class HubSocketEmitter extends HubEmitter {
  @WebSocketServer() server: Server;

  constructor() {
    super();
  }

  async emitHub(room: string, hub: HubInterface): Promise<void> {
    this.server.to(room).emit('hub.hub-update', hub);
  }
}
