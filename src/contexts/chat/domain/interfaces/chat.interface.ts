import { ChatLineInterface } from './chat-line.interface';
import { ChatProfileInterface } from './chat-profile.interface';

export interface ChatInterface {
  id: string;
  chat_lines: ChatLineInterface[];
  chats_profiles: ChatProfileInterface[];
  last_message_date: string;
  create_date: string;
  update_date: string;
}
