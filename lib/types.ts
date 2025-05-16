export interface Webtoon {
  id: string
  title: string
  author: {
    id: string
    name: string
    avatar: string
  }
  cover: string
  genre: string[]
  rating: number
  views: number
  likes: number
  description: string
  status: 'ongoing' | 'completed' | 'hiatus'
  language: string
  lastUpdated: string
  episodes: number
  isAdult: boolean
  keywords?: string[]
}

export interface Creator {
  id: string
  name: string
  avatar: string
  followers: number
  works: number
  biography?: string
  socialLinks?: {
    twitter?: string
    instagram?: string
    website?: string
  }
  joinedAt: string
}

export interface Episode {
  id: string
  webtoonId: string
  number: number
  title: string
  thumbnail: string
  publishedAt: string
  likes: number
  views: number
  isLocked: boolean
}

export interface Genre {
  id: string
  name: string
  count: number
  icon: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
  likes: number
  replies?: Comment[]
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'user' | 'creator' | 'admin'
  favorites: string[]
  readingHistory: {
    webtoonId: string
    episodeId: string
    progress: number
    lastRead: string
  }[]
  createdAt: string
}

export interface EpisodeImage {
  id: string
  url: string
  width: number
  height: number
  order: number
  blurHash?: string
}

export interface EpisodeContent {
  id: string
  episodeId: string
  images: EpisodeImage[]
  format: 'vertical' | 'horizontal' | 'cuttoon'
  language: string
  translatedBy?: string
}

export interface ViewerSettings {
  theme: 'light' | 'dark' | 'sepia'
  fontSize: number
  brightness: number
  contrast: number
  autoScroll: boolean
  autoScrollSpeed: number
  showPageNumber: boolean
  showProgressBar: boolean
  doublePagesForHorizontal: boolean
}

export interface ReadingProgress {
  userId: string
  webtoonId: string
  episodeId: string
  lastReadImage: number
  totalImages: number
  scrollPosition: number
  completedAt?: string
  updatedAt: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'creator' | 'admin'
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}

export interface UserSettings {
  language: string
  theme: 'light' | 'dark' | 'system'
  emailNotifications: {
    newEpisodes: boolean
    comments: boolean
    announcements: boolean
  }
  contentPreferences: {
    showAdultContent: boolean
    autoplayVideos: boolean
    defaultEpisodeSort: 'newest' | 'oldest'
  }
}

export interface UserProfile extends AuthUser {
  settings: UserSettings
  bio?: string
  website?: string
  socialLinks?: {
    twitter?: string
    instagram?: string
    discord?: string
  }
  stats: {
    totalReads: number
    totalComments: number
    joinedDate: string
    lastActive: string
  }
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpData extends SignInCredentials {
  name: string
  confirmPassword: string
  acceptTerms: boolean
}

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