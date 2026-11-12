export interface Treatment {
  id: string;
  name: string;
  category: 'cut' | 'color' | 'perm' | 'specials';
  categoryLabel: string;
  price: string;
  priceNum: number;
  duration: string;
  description: string;
  popular?: boolean;
  note?: string;
}

export interface OpeningHourDay {
  day: string;
  dayShort: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, etc.
  morning: string;
  afternoon: string;
  isClosed?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  residence: string;
  rating: number;
  date: string;
  comment: string;
  service: string;
}
