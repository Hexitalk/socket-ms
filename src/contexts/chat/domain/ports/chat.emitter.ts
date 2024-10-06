import { ChatLineInterface } from '../interfaces/chat-line.interface';

export abstract class ChatEmitter {
  abstract emitChatLine(
    rooms: string[],
    chatLine: ChatLineInterface,
  ): Promise<void>;
}
