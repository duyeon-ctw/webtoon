import type { User, Webtoon } from '@/lib/types';
import { NotificationService } from '@/lib/services/notification-service';

// Mock webtoons data for demo
const mockWebtoons: Webtoon[] = [
  {
    id: "1",
    title: "The Cosmic Journey",
    author: {
      id: "author1",
      name: "Alex Chen",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Sci-Fi", "Adventure"],
    rating: 4.8,
    views: 1200000,
    likes: 450000,
    description: "Follow the adventures of Captain Nova as she explores the unknown regions of space.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-20",
    episodes: 52,
    isAdult: false,
  },
  {
    id: "2",
    title: "Mystic Academy",
    author: {
      id: "author2",
      name: "Sophia Kim",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Fantasy", "Drama"],
    rating: 4.7,
    views: 980000,
    likes: 410000,
    description: "A young wizard discovers her hidden powers at the prestigious Mystic Academy.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-19",
    episodes: 45,
    isAdult: false,
  },
  {
    id: "3",
    title: "Urban Legends",
    author: {
      id: "author3",
      name: "Michael Rodriguez",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Horror", "Mystery"],
    rating: 4.5,
    views: 750000,
    likes: 320000,
    description: "A journalist investigates urban legends only to discover they might be more real than anyone thought.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-18",
    episodes: 30,
    isAdult: true,
  },
  {
    id: "4",
    title: "Love in Spring",
    author: {
      id: "author4",
      name: "Emily Wang",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Romance", "Slice of Life"],
    rating: 4.6,
    views: 890000,
    likes: 380000,
    description: "Two college students meet during spring break and find themselves falling in love despite their different backgrounds.",
    status: "completed",
    language: "en",
    lastUpdated: "2024-03-15",
    episodes: 25,
    isAdult: false,
  },
  {
    id: "5",
    title: "Cyber Detective",
    author: {
      id: "author5",
      name: "David Park",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Sci-Fi", "Thriller"],
    rating: 4.9,
    views: 1100000,
    likes: 470000,
    description: "In a future where crimes happen in virtual reality, one detective specializes in solving these digital mysteries.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-17",
    episodes: 40,
    isAdult: false,
  },
  {
    id: "6",
    title: "Historical Heroes",
    author: {
      id: "author6",
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Historical", "Action"],
    rating: 4.3,
    views: 650000,
    likes: 280000,
    description: "The stories of unsung heroes throughout history who changed the course of the world.",
    status: "hiatus",
    language: "en",
    lastUpdated: "2024-02-28",
    episodes: 20,
    isAdult: false,
  },
  {
    id: "7",
    title: "Cooking Master",
    author: {
      id: "author7",
      name: "Chen Wei",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Comedy", "Slice of Life"],
    rating: 4.4,
    views: 720000,
    likes: 310000,
    description: "A clumsy but passionate chef aims to become the greatest culinary master in the world.",
    status: "ongoing",
    language: "cn",
    lastUpdated: "2024-03-16",
    episodes: 35,
    isAdult: false,
  },
  {
    id: "8",
    title: "Spirit Walker",
    author: {
      id: "author8",
      name: "Kim Min-ho",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Fantasy", "Adventure"],
    rating: 4.8,
    views: 950000,
    likes: 420000,
    description: "A teenager discovers he can communicate with spirits and must learn to use his powers to protect the living and the dead.",
    status: "ongoing",
    language: "ko",
    lastUpdated: "2024-03-21",
    episodes: 42,
    isAdult: false,
  },
  {
    id: "9",
    title: "Office Romance",
    author: {
      id: "author9",
      name: "Jasmine Lee",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Romance", "Comedy"],
    rating: 4.2,
    views: 580000,
    likes: 240000,
    description: "Two rival executives find themselves falling for each other despite their professional competition.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-14",
    episodes: 28,
    isAdult: false,
  },
  {
    id: "10",
    title: "Monster Hunter Chronicles",
    author: {
      id: "author10",
      name: "Thomas Wilson",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Fantasy", "Action"],
    rating: 4.7,
    views: 920000,
    likes: 400000,
    description: "Follow a group of monster hunters as they protect their world from dangerous mythical creatures.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-13",
    episodes: 60,
    isAdult: false,
  }
];

// Mock user reading history and favorites
const mockUserPreferences: Record<string, {
  readWebtoons: string[];
  favoriteWebtoons: string[];
  favoriteGenres: string[];
}> = {
  'user1': {
    readWebtoons: ['1', '2', '5'],
    favoriteWebtoons: ['1', '5'],
    favoriteGenres: ['Sci-Fi', 'Fantasy', 'Adventure'],
  }
};

export interface RecommendationResult {
  webtoons: Webtoon[];
  reason: string;
}

export class RecommendationService {
  /**
   * Get personalized recommendations for a user
   */
  static async getRecommendationsForUser(userId: string): Promise<RecommendationResult[]> {
    // In a real app, this would involve more complex recommendation algorithms,
    // possibly using machine learning or collaborative filtering
    const results: RecommendationResult[] = [];
    
    // Get user preferences (in a real app, these would come from a database)
    const userPrefs = mockUserPreferences[userId];
    if (!userPrefs) {
      return this.getDefaultRecommendations();
    }
    
    // 1. Recommend based on favorite genres
    if (userPrefs.favoriteGenres.length > 0) {
      const genreRecommendations = this.getGenreBasedRecommendations(
        userPrefs.favoriteGenres, 
        userPrefs.readWebtoons
      );
      
      if (genreRecommendations.webtoons.length > 0) {
        results.push(genreRecommendations);
      }
    }
    
    // 2. Recommend based on similar webtoons
    if (userPrefs.favoriteWebtoons.length > 0) {
      const similarRecommendations = this.getSimilarWebtoons(
        userPrefs.favoriteWebtoons, 
        userPrefs.readWebtoons
      );
      
      if (similarRecommendations.webtoons.length > 0) {
        results.push(similarRecommendations);
      }
    }
    
    // 3. Add popular webtoons as fallback
    if (results.length === 0 || results.reduce((total, r) => total + r.webtoons.length, 0) < 5) {
      results.push(this.getPopularRecommendations(userPrefs.readWebtoons));
    }
    
    return results;
  }
  
  /**
   * Get recommendations based on genres the user likes
   */
  private static getGenreBasedRecommendations(
    favoriteGenres: string[], 
    alreadyRead: string[]
  ): RecommendationResult {
    const filteredWebtoons = mockWebtoons.filter(webtoon => 
      // Should contain at least one of the user's favorite genres
      webtoon.genre.some(genre => favoriteGenres.includes(genre)) &&
      // Should not be already read by the user
      !alreadyRead.includes(webtoon.id)
    );
    
    // Sort by most genre matches and then by rating
    const sortedWebtoons = filteredWebtoons.sort((a, b) => {
      const aMatches = a.genre.filter(genre => favoriteGenres.includes(genre)).length;
      const bMatches = b.genre.filter(genre => favoriteGenres.includes(genre)).length;
      
      if (aMatches !== bMatches) {
        return bMatches - aMatches;
      }
      
      return b.rating - a.rating;
    });
    
    return {
      webtoons: sortedWebtoons.slice(0, 5),
      reason: `Based on your interest in ${favoriteGenres.join(', ')}`,
    };
  }
  
  /**
   * Get recommendations based on webtoons similar to user's favorites
   */
  private static getSimilarWebtoons(
    favoriteWebtoonIds: string[], 
    alreadyRead: string[]
  ): RecommendationResult {
    // Get the user's favorite webtoons
    const favoriteWebtoons = mockWebtoons.filter(webtoon => 
      favoriteWebtoonIds.includes(webtoon.id)
    );
    
    // Extract all genres from favorite webtoons
    const favoriteGenres = new Set<string>();
    favoriteWebtoons.forEach(webtoon => {
      webtoon.genre.forEach(genre => favoriteGenres.add(genre));
    });
    
    // Get the most read webtoon from favorites
    const primaryFavorite = favoriteWebtoons[0];
    
    // Find similar webtoons
    const similarWebtoons = mockWebtoons.filter(webtoon => 
      // Should not be already read
      !alreadyRead.includes(webtoon.id) &&
      // Should not be a favorite already
      !favoriteWebtoonIds.includes(webtoon.id) &&
      // Should share at least one genre with the favorite webtoons
      webtoon.genre.some(genre => favoriteGenres.has(genre))
    );
    
    // Sort by genre similarity score and then by rating
    const sortedSimilar = similarWebtoons.sort((a, b) => {
      const aScore = a.genre.filter(genre => favoriteGenres.has(genre)).length;
      const bScore = b.genre.filter(genre => favoriteGenres.has(genre)).length;
      
      if (aScore !== bScore) {
        return bScore - aScore;
      }
      
      return b.rating - a.rating;
    });
    
    return {
      webtoons: sortedSimilar.slice(0, 5),
      reason: `Because you enjoyed ${primaryFavorite.title}`,
    };
  }
  
  /**
   * Get popular webtoons as recommendations
   */
  private static getPopularRecommendations(alreadyRead: string[]): RecommendationResult {
    const filteredWebtoons = mockWebtoons.filter(webtoon => 
      !alreadyRead.includes(webtoon.id)
    );
    
    // Sort by views (popularity)
    const popularWebtoons = filteredWebtoons.sort((a, b) => b.views - a.views);
    
    return {
      webtoons: popularWebtoons.slice(0, 5),
      reason: 'Popular with readers',
    };
  }
  
  /**
   * Get default recommendations for new users
   */
  private static getDefaultRecommendations(): RecommendationResult[] {
    return [
      {
        webtoons: mockWebtoons
          .filter(w => w.rating >= 4.7)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5),
        reason: 'Highest rated webtoons',
      },
      {
        webtoons: mockWebtoons
          .sort((a, b) => b.views - a.views)
          .slice(0, 5),
        reason: 'Most popular webtoons',
      }
    ];
  }
  
  /**
   * Send personalized recommendations to user as notifications
   */
  static async sendRecommendationNotifications(userId: string): Promise<void> {
    const recommendations = await this.getRecommendationsForUser(userId);
    
    if (recommendations.length === 0) return;
    
    // Pick a random recommendation group
    const randomIndex = Math.floor(Math.random() * recommendations.length);
    const recommendation = recommendations[randomIndex];
    
    // Pick a random webtoon from the group
    if (recommendation.webtoons.length > 0) {
      const randomWebtoonIndex = Math.floor(Math.random() * recommendation.webtoons.length);
      const webtoon = recommendation.webtoons[randomWebtoonIndex];
      
      // Send notification
      await NotificationService.sendRecommendation(
        userId,
        webtoon.id,
        webtoon.title,
        recommendation.reason,
        webtoon.genre
      );
    }
  }
} 