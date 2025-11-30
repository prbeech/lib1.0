export interface Book {
  title: string;
  author: string;
  genre: string;
  description: string;
  reason: string;
}

export interface Seat {
  id: string;
  status: 'occupied' | 'available' | 'reserved';
  zone: 'Quiet Zone' | 'Collab Area' | 'Computer Lab';
}

export type ViewState = 'dashboard' | 'recommendations' | 'seats';

export interface UserPreferences {
  favoriteGenres: string;
  lastRead: string;
  mood: string;
}