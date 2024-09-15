import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../domain/ports/auth.repository';

@Injectable()
@WebSocketGateway({
  cors: { origin: '*', transports: ['websocket'] },
})
export class AuthSocketGatewayRepository extends AuthRepository {
  @WebSocketServer() server: Server;

  constructor() {
    super();
  }

  async emitUserAuthorized(room: string, isAuthorized: boolean): Promise<void> {
    this.server
      .to(room)
      .emit(
        'auth.user-authorized',
        JSON.stringify({ is_authorized: isAuthorized }),
      );
  }
}
