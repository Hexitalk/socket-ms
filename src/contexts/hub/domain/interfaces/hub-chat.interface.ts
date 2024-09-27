export interface HubChatInterface {
  id: string;
  user_id: string;
  profile_id: string | null;
  slot: number; // 1 - 6
  last_message_date: string;
  unread_messages: number;
}
