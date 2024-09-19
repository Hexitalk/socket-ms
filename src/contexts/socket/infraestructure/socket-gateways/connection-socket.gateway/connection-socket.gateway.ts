import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { envs } from 'src/config';

@WebSocketGateway(envs.socketOptions)
export class ConnectionSocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor() {}

  handleConnection(client: Socket) {}
}
