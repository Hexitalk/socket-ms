import { IsNotEmpty } from 'class-validator';
import { ChatLineInterface } from 'src/contexts/chat/domain/interfaces/chat-line.interface';

export class ChatLineEmitControllerDto {
  @IsNotEmpty()
  profilesIds: string[];

  @IsNotEmpty()
  chatLine: ChatLineInterface;
}
