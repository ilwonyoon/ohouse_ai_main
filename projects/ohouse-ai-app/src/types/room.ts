/**
 * Room-related types
 */

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  area: number; // in square meters
  budget: number; // in currency units
  style?: DesignStyle;
  colors?: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RoomType =
  | 'living-room'
  | 'bedroom'
  | 'kitchen'
  | 'bathroom'
  | 'dining-room'
  | 'office'
  | 'other';

export type DesignStyle =
  | 'modern'
  | 'minimalist'
  | 'traditional'
  | 'scandinavian'
  | 'bohemian'
  | 'industrial'
  | 'luxury'
  | 'eclectic';

export interface RoomDetails {
  type: RoomType;
  area: number;
  style: DesignStyle;
  colors: string[];
  budget: number;
  additionalNotes?: string;
}
