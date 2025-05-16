import { NextResponse } from 'next/server';
import type { Webtoon } from '@/lib/types';

// Mock data for the demo
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
    keywords: ["space", "exploration", "aliens", "future", "technology"]
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
    keywords: ["magic", "school", "wizard", "powers", "fantasy"]
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
    keywords: ["horror", "mystery", "investigation", "supernatural", "urban"]
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
    keywords: ["romance", "college", "spring", "love", "slice of life"]
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
    keywords: ["cyberpunk", "detective", "future", "virtual reality", "crime"]
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
    keywords: ["history", "heroes", "action", "war", "adventure"]
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
    keywords: ["cooking", "food", "competition", "comedy", "chef"]
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
    keywords: ["spirits", "supernatural", "adventure", "teenager", "powers"]
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract search parameters
    const {
      query = '',
      searchIn = 'all',
      genres = [],
      status = 'all',
      language = ['en'],
      minRating = 0,
      sortBy = 'relevance',
      adultContent = false
    } = body;

    // Clone the data to prevent mutation
    let results = [...mockWebtoons];

    // Apply query filter with improved relevance scoring
    if (query) {
      const searchQuery = query.toLowerCase();
      
      // Define weights for different fields
      const weights = {
        title: 10,
        author: 7,
        description: 5,
        keywords: 8
      };
      
      // Calculate relevance score for each webtoon
      results = results.map(webtoon => {
        let score = 0;
        
        // Check title
        if (searchIn === 'all' || searchIn === 'title') {
          if (webtoon.title.toLowerCase() === searchQuery) {
            score += weights.title * 2; // Exact match gets double points
          } else if (webtoon.title.toLowerCase().includes(searchQuery)) {
            score += weights.title;
          }
        }
        
        // Check creator name
        if (searchIn === 'all' || searchIn === 'creator') {
          if (webtoon.author.name.toLowerCase() === searchQuery) {
            score += weights.author * 2; // Exact match gets double points
          } else if (webtoon.author.name.toLowerCase().includes(searchQuery)) {
            score += weights.author;
          }
        }
        
        // Check description
        if (searchIn === 'all' || searchIn === 'description') {
          if (webtoon.description.toLowerCase().includes(searchQuery)) {
            score += weights.description;
          }
        }
        
        // Check keywords
        if (webtoon.keywords) {
          const matchedKeywords = webtoon.keywords.filter(keyword => 
            keyword.toLowerCase().includes(searchQuery) || 
            searchQuery.includes(keyword.toLowerCase())
          );
          score += matchedKeywords.length * weights.keywords;
        }
        
        return { ...webtoon, relevanceScore: score };
      });
      
      // Filter out items with zero relevance score
      results = results.filter(webtoon => webtoon.relevanceScore > 0);
    }

    // Apply genre filter
    if (genres.length > 0) {
      results = results.filter(webtoon => 
        webtoon.genre.some(g => genres.includes(g))
      );
    }

    // Apply status filter
    if (status !== 'all') {
      results = results.filter(webtoon => webtoon.status === status);
    }

    // Apply language filter
    if (language.length > 0) {
      results = results.filter(webtoon => 
        language.includes(webtoon.language)
      );
    }

    // Apply rating filter
    if (minRating > 0) {
      results = results.filter(webtoon => webtoon.rating >= minRating);
    }

    // Apply adult content filter
    if (!adultContent) {
      results = results.filter(webtoon => !webtoon.isAdult);
    }

    // Apply sorting
    switch (sortBy) {
      case 'latest':
        results.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'popular':
        results.sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'relevance':
      default:
        // If we did a text search, sort by relevance score
        if (query) {
          results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
        } else {
          // Default sorting if no text search was performed
          results.sort((a, b) => b.views - a.views);
        }
        break;
    }

    // Remove the temporary relevanceScore field
    results = results.map(({ relevanceScore, ...rest }) => rest);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to process search request' },
      { status: 500 }
    );
  }
} 