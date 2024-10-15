// types for chat
export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'file';

export interface Message {
  body: string;
  userId: string;
  isRead: boolean;
  messageType: MessageType;
  readBy: string[];
  chatId: string;
  createdAt: Date;
  updatedAt: Date;
}
