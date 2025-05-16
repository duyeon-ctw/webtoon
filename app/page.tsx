import Link from "next/link"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { WebtoonCard } from "../components/ui/webtoon-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
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
import type { Webtoon, Genre } from "../lib/types"

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
    cover: "/webtoon_cover/webtoon_cover (1).jpeg",
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
    cover: "/webtoon_cover/webtoon_cover (2).jpeg",
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
    cover: "/webtoon_cover/webtoon_cover (3).jpeg",
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
    cover: "/webtoon_cover/webtoon_cover (4).jpeg",
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
                  src="/webtoon_cover/webtoon_cover (5).jpeg"
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

      {/* Recommended Webtoons */}
      <section className="w-full py-12 md:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">추천 웹툰</h2>
              <p className="text-muted-foreground mt-1">사용자의 취향을 고려한 맞춤 추천</p>
            </div>
            <Button variant="link" asChild className="hidden md:flex">
              <Link href="/discover">
                더보기
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="/read/5">
              <WebtoonCard
                webtoon={{
                  id: "5",
                  title: "마법사의 여정",
                  author: {
                    id: "author5",
                    name: "김민준",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (6).jpeg",
                  genre: ["판타지", "모험"],
                  rating: 4.9,
                  views: 1800000,
                  likes: 750000,
                  description: "어린 마법사가 세계를 여행하며 다양한 마법을 배우는 이야기",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-21",
                  episodes: 78,
                  isAdult: false,
                }}
              />
            </Link>
            <Link href="/read/6">
              <WebtoonCard
                webtoon={{
                  id: "6",
                  title: "도시의 비밀",
                  author: {
                    id: "author6",
                    name: "박지윤",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (7).jpeg",
                  genre: ["미스터리", "스릴러"],
                  rating: 4.7,
                  views: 1500000,
                  likes: 620000,
                  description: "대도시에서 벌어지는 미스터리한 사건을 추적하는 형사의 이야기",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-20",
                  episodes: 65,
                  isAdult: false,
                }}
              />
            </Link>
            <Link href="/read/7">
              <WebtoonCard
                webtoon={{
                  id: "7",
                  title: "로맨틱 코미디",
                  author: {
                    id: "author7",
                    name: "이수진",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (8).jpeg",
                  genre: ["로맨스", "코미디"],
                  rating: 4.8,
                  views: 1700000,
                  likes: 700000,
                  description: "대학교 캠퍼스에서 펼쳐지는 유쾌한 로맨스 이야기",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-19",
                  episodes: 92,
                  isAdult: false,
                }}
              />
            </Link>
            <Link href="/read/8">
              <WebtoonCard
                webtoon={{
                  id: "8",
                  title: "미래 세계",
                  author: {
                    id: "author8",
                    name: "정현우",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (9).jpeg",
                  genre: ["SF", "액션"],
                  rating: 4.6,
                  views: 1300000,
                  likes: 550000,
                  description: "디스토피아 세계에서 살아남기 위한 주인공들의 사투",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-18",
                  episodes: 56,
                  isAdult: false,
                }}
              />
            </Link>
          </div>

          <Button variant="link" asChild className="w-full mt-6 md:hidden">
            <Link href="/discover">
              더보기
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* New & Trending Webtoons */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">인기 상승 웹툰</h2>
              <p className="text-muted-foreground mt-1">지금 뜨고 있는 화제의 웹툰</p>
            </div>
            <Button variant="link" asChild className="hidden md:flex">
              <Link href="/popular">
                더보기
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="/read/9">
              <WebtoonCard
                webtoon={{
                  id: "9",
                  title: "용사의 모험",
                  author: {
                    id: "author9",
                    name: "황민석",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (10).jpeg",
                  genre: ["판타지", "액션"],
                  rating: 4.9,
                  views: 2000000,
                  likes: 850000,
                  description: "평범한 고등학생이 이세계 용사로 각성하는 이야기",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-21",
                  episodes: 48,
                  isAdult: false,
                }}
              />
            </Link>
            <Link href="/read/10">
              <WebtoonCard
                webtoon={{
                  id: "10",
                  title: "학교의 괴담",
                  author: {
                    id: "author10",
                    name: "오은지",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (11).jpeg",
                  genre: ["공포", "미스터리"],
                  rating: 4.7,
                  views: 1600000,
                  likes: 680000,
                  description: "오래된 고등학교에서 일어나는 기묘한 이야기들",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-20",
                  episodes: 35,
                  isAdult: false,
                }}
              />
            </Link>
            <Link href="/read/11">
              <WebtoonCard
                webtoon={{
                  id: "11",
                  title: "사랑의 시간",
                  author: {
                    id: "author11",
                    name: "최다인",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (12).jpeg",
                  genre: ["로맨스", "드라마"],
                  rating: 4.8,
                  views: 1900000,
                  likes: 790000,
                  description: "시간을 넘나드는 두 사람의 애틋한 사랑 이야기",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-19",
                  episodes: 72,
                  isAdult: false,
                }}
              />
            </Link>
            <Link href="/read/12">
              <WebtoonCard
                webtoon={{
                  id: "12",
                  title: "슈퍼 히어로",
                  author: {
                    id: "author12",
                    name: "김태호",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (13).jpeg",
                  genre: ["액션", "판타지"],
                  rating: 4.6,
                  views: 1500000,
                  likes: 620000,
                  description: "초능력을 가진 평범한 고등학생의 영웅 활약기",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-18",
                  episodes: 64,
                  isAdult: false,
                }}
              />
            </Link>
          </div>

          <Button variant="link" asChild className="w-full mt-6 md:hidden">
            <Link href="/popular">
              더보기
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Genre Showcase */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">uc7a5ub974ubcc4 uc6f9ud230</h2>
              <p className="text-muted-foreground mt-1">ub2e4uc591ud55c uc7a5ub974uc758 uc6f9ud230uc744 ub9ccub098ubcf4uc138uc694</p>
            </div>
            <Button variant="link" asChild className="hidden md:flex">
              <Link href="/genres">
                ub354ubcf4uae30
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="/read/13">
              <WebtoonCard
                webtoon={{
                  id: "13",
                  title: "ub9c8uc655uc758 uadc0ud658",
                  author: {
                    id: "author13",
                    name: "uc774uc9c4ud638",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (14).jpeg",
                  genre: ["ud310ud0c0uc9c0", "ub300uc791"],
                  rating: 4.9,
                  views: 2100000,
                  likes: 880000,
                  description: "uc804uc124uc758 ub9c8uc655uc774 ud604ub300uc5d0 ub3ccuc544uc640 ubca8uc5b4uc9c0ub294 uc7a0uc744 uae68uc6b0ub824ub294 uc774uc57cuae30",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-22",
                  episodes: 89,
                  isAdult: false,
                }}
              />
            </Link>
            <Link href="/read/14">
              <WebtoonCard
                webtoon={{
                  id: "14",
                  title: "ubc24uc758 uc544uc774ub4e4",
                  author: {
                    id: "author14",
                    name: "uc804ubbfcuc9c0",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (15).jpeg",
                  genre: ["uacf5ud3ec", "ud310ud0c0uc9c0"],
                  rating: 4.7,
                  views: 1650000,
                  likes: 700000,
                  description: "ubc24uc774 ub418uba74 ud2b9ubcc4ud55c ub2a5ub825uc744 uac00uc9c4 uc544uc774ub4e4uc758 uc774uc57cuae30",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-21",
                  episodes: 67,
                  isAdult: false,
                }}
              />
            </Link>
            <Link href="/read/15">
              <WebtoonCard
                webtoon={{
                  id: "15",
                  title: "ub85cubd95 uc544ub2c8uba54",
                  author: {
                    id: "author15",
                    name: "ubc15uc131ud6c4",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (16).jpeg",
                  genre: ["SF", "ubaa8ud5d8"],
                  rating: 4.8,
                  views: 1800000,
                  likes: 750000,
                  description: "ubbf8ub798 uc138uacc4uc5d0uc11c uc778uacf5uc9c0ub2a5 ub85cubd95uacfc uc0acub78cub4e4uc758 uc774uc57cuae30",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-20",
                  episodes: 75,
                  isAdult: false,
                }}
              />
            </Link>
            <Link href="/read/16">
              <WebtoonCard
                webtoon={{
                  id: "16",
                  title: "ud30cud0c0uc2dc uc6d4ub4dc",
                  author: {
                    id: "author16",
                    name: "uc720uc9c4ud638",
                    avatar: "/placeholder-user.jpg",
                  },
                  cover: "/webtoon_cover/webtoon_cover (17).jpeg",
                  genre: ["ud310ud0c0uc9c0", "ubaa8ud5d8"],
                  rating: 4.6,
                  views: 1400000,
                  likes: 580000,
                  description: "ube44ubc00uc758 ubb38uc744 ud1b5ud574 ud310ud0c0uc9c0 uc138uacc4ub85c ub118uc5b4uac04 uc544uc774ub4e4uc758 ubaa8ud5d8",
                  status: "ongoing",
                  language: "ko",
                  lastUpdated: "2024-03-19",
                  episodes: 52,
                  isAdult: false,
                }}
              />
            </Link>
          </div>

          <Button variant="link" asChild className="w-full mt-6 md:hidden">
            <Link href="/genres">
              ub354ubcf4uae30
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">ucd94ucc9c uc7a5ub974</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {popularGenres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genres/${genre.name.toLowerCase()}`}
                  className="group flex items-center p-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border/20 transition-all hover:shadow-md"
                >
                  <div className="rounded-full bg-primary/10 p-3 mr-3 group-hover:bg-primary/20 transition-colors">
                    {genre.icon === "Heart" && <Heart className="h-5 w-5 text-primary" />}
                    {genre.icon === "TrendingUp" && <TrendingUp className="h-5 w-5 text-primary" />}
                    {genre.icon === "Star" && <Star className="h-5 w-5 text-primary" />}
                    {genre.icon === "MessageSquare" && <MessageSquare className="h-5 w-5 text-primary" />}
                    {genre.icon === "Users" && <Users className="h-5 w-5 text-primary" />}
                    {genre.icon === "Globe" && <Globe className="h-5 w-5 text-primary" />}
                    {genre.icon === "Search" && <Search className="h-5 w-5 text-primary" />}
                    {genre.icon === "Clock" && <Clock className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <span className="font-medium">{genre.name}</span>
                    <p className="text-xs text-muted-foreground">{genre.count} uc791ud488</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
