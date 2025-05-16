import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WebtoonCard } from "@/components/ui/webtoon-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  MessageSquare,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"
import type { Webtoon, Genre } from "@/lib/types"

// Mock data for the homepage
const featuredWebtoons: Webtoon[] = [
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
      name: "Marcus Johnson",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Horror", "Mystery"],
    rating: 4.6,
    views: 850000,
    likes: 380000,
    description: "A detective investigates supernatural occurrences in the city, uncovering dark secrets.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-18",
    episodes: 38,
    isAdult: false,
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
    rating: 4.9,
    views: 1500000,
    likes: 620000,
    description: "A heartwarming story of two strangers who meet during cherry blossom season.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-17",
    episodes: 64,
    isAdult: false,
  },
]

const popularGenres: Genre[] = [
  { id: "1", name: "Romance", count: 1250, icon: "Heart" },
  { id: "2", name: "Action", count: 980, icon: "TrendingUp" },
  { id: "3", name: "Fantasy", count: 870, icon: "Star" },
  { id: "4", name: "Comedy", count: 760, icon: "MessageSquare" },
  { id: "5", name: "Drama", count: 650, icon: "Users" },
  { id: "6", name: "Sci-Fi", count: 540, icon: "Globe" },
  { id: "7", name: "Horror", count: 430, icon: "Search" },
  { id: "8", name: "Slice of Life", count: 320, icon: "Clock" },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-muted/50" />
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-400/5 blur-3xl" />

        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none max-w-[800px]">
                  <span className="apple-text-gradient">Discover Amazing Webcomics</span> from Around the World
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Read, create, and share webcomics in your language. Join our global community of creators and readers.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="default" size="lg" asChild className="rounded-full">
                  <Link href="/discover">
                    Start Reading
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/creators">Become a Creator</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <Image
                  src="/placeholder.jpg"
                  alt="Diverse collection of webcomics from around the world"
                  fill
                  className="rounded-3xl object-cover shadow-xl"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full backdrop-blur-lg" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full backdrop-blur-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Categories */}
      <section className="w-full py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/popular"
              className="group flex flex-col items-center p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border/20 transition-all hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-3 mb-3 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Popular</span>
            </Link>
            <Link
              href="/new"
              className="group flex flex-col items-center p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border/20 transition-all hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-3 mb-3 group-hover:bg-primary/20 transition-colors">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">New Releases</span>
            </Link>
            <Link
              href="/genres"
              className="group flex flex-col items-center p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border/20 transition-all hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-3 mb-3 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Genres</span>
            </Link>
            <Link
              href="/discover"
              className="group flex flex-col items-center p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border/20 transition-all hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-3 mb-3 group-hover:bg-primary/20 transition-colors">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Discover</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Webtoons */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Featured Webtoons</h2>
              <p className="text-muted-foreground mt-1">Handpicked selections from our editors</p>
            </div>
            <Button variant="link" asChild className="hidden md:flex">
              <Link href="/discover">
                View all
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredWebtoons.map((webtoon) => (
              <Link key={webtoon.id} href={`/read/${webtoon.id}`}>
                <WebtoonCard webtoon={webtoon} />
              </Link>
            ))}
          </div>

          <Button variant="link" asChild className="w-full mt-6 md:hidden">
            <Link href="/discover">
              View all
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
        </div>
      </section>
    </div>
  )
}
