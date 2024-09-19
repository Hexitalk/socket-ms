import {
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { envs } from 'src/config';
import { LogoutSocketUseCase } from 'src/contexts/auth/application/use-cases';

@WebSocketGateway(envs.socketOptions)
export class DisconnectionSocketGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private socketDisconnectUseCase: LogoutSocketUseCase) {}

  handleDisconnect(client: Socket) {
    this.socketDisconnectUseCase.run({ socketId: client.id });
  }
}
