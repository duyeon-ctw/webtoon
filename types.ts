export interface WebtoonType {
  id: string;
  title: string;
  author: string;
  description: string;
  thumbnailUrl: string;
  genres: string[];
  rating: number;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserHistoryType {
  userId: string;
  webtoonId: string;
  readAt: Date;
  progress: number;
  rating?: number;
  liked: boolean;
}

export interface CreatorStats {
  views: number;
  comments: number;
  likes: number;
  revenue: number;
  subscribers: number;
}

export interface WebtoonStats extends CreatorStats {
  webtoonId: string;
  title: string;
  lastUpdated: Date;
  episodeCount: number;
}

export interface CreatorRevenue {
  total: number;
  thisMonth: number;
  lastMonth: number;
  history: {
    date: Date;
    amount: number;
    source: 'episodes' | 'tips' | 'merchandise';
  }[];
}

export interface CreatorAnnouncement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  likes: number;
  comments: number;
} 