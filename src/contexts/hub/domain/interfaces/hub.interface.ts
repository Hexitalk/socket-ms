import { HubChatInterface } from './hub-chat.interface';

export interface HubInterface {
  hub_chats: HubChatInterface[];
  user_id?: string;
}
