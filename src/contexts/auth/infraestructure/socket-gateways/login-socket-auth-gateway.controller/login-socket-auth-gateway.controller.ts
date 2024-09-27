import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { LoginSocketUseCase } from 'src/contexts/auth/application/use-cases/login-socket-use-case/login-socket-use-case';
import { envs } from 'src/config';

@Injectable()
@WebSocketGateway(envs.socketOptions)
export class LoginSocketAuthGatewayController {
  @WebSocketServer() server: Server;

  constructor(private loginSocketUseCase: LoginSocketUseCase) {}

  @SubscribeMessage('auth.login-socket')
  async run(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const natsConfig = {
      authUserId: '',
      lang: data.lang ?? 'es',
    };

    const { token } = data;

    this.loginSocketUseCase.run(token, client, natsConfig);
  }
}
