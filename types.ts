
export interface CardData {
  senderName: string;
  recipientName: string;
  message: string;
  theme: 'classic' | 'modern' | 'minimal' | 'luxury';
  specialDay: string;
}

export type View = 'input' | 'preview';
