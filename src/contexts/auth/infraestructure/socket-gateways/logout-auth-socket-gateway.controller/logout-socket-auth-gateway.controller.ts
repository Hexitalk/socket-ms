import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import { LogoutSocketUseCase } from 'src/contexts/auth/application/use-cases';

@Injectable()
@WebSocketGateway(envs.socketOptions)
export class LogoutSocketAuthGatewayController {
  @WebSocketServer() server: Server;

  constructor(private logoutSocketUseCase: LogoutSocketUseCase) {}

  @SubscribeMessage('auth.logout-socket')
  async run(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const natsConfig = {
      authUserId: '',
      lang: data.lang ?? 'es',
    };

    this.logoutSocketUseCase.run({ socketId: client.id }, natsConfig);
  }
}
