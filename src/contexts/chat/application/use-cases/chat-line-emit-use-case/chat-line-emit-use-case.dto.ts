import { ChatLineInterface } from 'src/contexts/chat/domain/interfaces/chat-line.interface';

export interface ChatLineEmitDto {
  profilesIds: string[];
  chatLine: ChatLineInterface;
}
