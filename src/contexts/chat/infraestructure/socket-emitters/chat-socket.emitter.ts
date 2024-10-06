import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { envs } from 'src/config';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { ChatEmitter } from '../../domain/ports/chat.emitter';
import { ChatLineInterface } from '../../domain/interfaces/chat-line.interface';

@Injectable()
@WebSocketGateway(envs.socketOptions)
export class ChatSocketEmitter extends ChatEmitter {
  @WebSocketServer() server: Server;

  constructor() {
    super();
  }

  async emitChatLine(
    rooms: string[],
    chatLine: ChatLineInterface,
  ): Promise<void> {
    console.log(rooms);

    this.server.to(rooms).emit('chats.new-chat-lines', chatLine);
  }
}
