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

@Injectable()
@WebSocketGateway({
  cors: { origin: '*', transports: ['websocket'] },
})
export class LoginSocketGatewayController {
  @WebSocketServer() server: Server;

  constructor(private loginSocketUseCase: LoginSocketUseCase) {}

  @SubscribeMessage('auth.login-socket')
  async run(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log({ data, client_id: client.id });

    // const natsConfig = {
    //   authUserId: '',
    //   lang: data.lang ?? 'es',
    // };

    // this.loginSocketUseCase.run(data, client, natsConfig);
  }
}
