import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Heart, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "COZWO WEBTOON - Browse by Genre",
  description: "Explore webcomics by genre on COZWO WEBTOON",
}

export default function GenresPage() {
  // All available genres with their descriptions and comic counts
  const genres = [
    {
      id: "romance",
      name: "Romance",
      description: "Stories focusing on romantic relationships between characters",
      count: 1250,
      color: "bg-pink-500",
      image: "/webtoon_cover/webtoon_cover (1).jpeg",
    },
    {
      id: "action",
      name: "Action",
      description: "Fast-paced stories with exciting action sequences",
      count: 980,
      color: "bg-red-500",
      image: "/webtoon_cover/webtoon_cover (2).jpeg",
    },
    {
      id: "fantasy",
      name: "Fantasy",
      description: "Stories set in magical worlds with supernatural elements",
      count: 870,
      color: "bg-purple-500",
      image: "/webtoon_cover/webtoon_cover (3).jpeg",
    },
    {
      id: "comedy",
      name: "Comedy",
      description: "Humorous stories designed to make readers laugh",
      count: 760,
      color: "bg-yellow-500",
      image: "/webtoon_cover/webtoon_cover (4).jpeg",
    },
    {
      id: "drama",
      name: "Drama",
      description: "Character-driven stories with emotional depth",
      count: 650,
      color: "bg-blue-500",
      image: "/webtoon_cover/webtoon_cover (5).jpeg",
    },
    {
      id: "sci-fi",
      name: "Sci-Fi",
      description: "Stories exploring futuristic concepts and technology",
      count: 540,
      color: "bg-cyan-500",
      image: "/webtoon_cover/webtoon_cover (6).jpeg",
    },
    {
      id: "horror",
      name: "Horror",
      description: "Stories designed to frighten and unsettle readers",
      count: 430,
      color: "bg-gray-800",
      image: "/webtoon_cover/webtoon_cover (7).jpeg",
    },
    {
      id: "slice-of-life",
      name: "Slice of Life",
      description: "Stories depicting everyday experiences and challenges",
      count: 320,
      color: "bg-green-500",
      image: "/webtoon_cover/webtoon_cover (8).jpeg",
    },
    {
      id: "mystery",
      name: "Mystery",
      description: "Stories involving puzzles, crimes, or secrets to be solved",
      count: 290,
      color: "bg-indigo-500",
      image: "/webtoon_cover/webtoon_cover (9).jpeg",
    },
    {
      id: "thriller",
      name: "Thriller",
      description: "Suspenseful stories that keep readers on the edge of their seats",
      count: 250,
      color: "bg-orange-500",
      image: "/webtoon_cover/webtoon_cover (10).jpeg",
    },
    {
      id: "historical",
      name: "Historical",
      description: "Stories set in past time periods with historical context",
      count: 210,
      color: "bg-amber-700",
      image: "/webtoon_cover/webtoon_cover (11).jpeg",
    },
    {
      id: "sports",
      name: "Sports",
      description: "Stories centered around athletic competitions and sports",
      count: 180,
      color: "bg-emerald-500",
      image: "/webtoon_cover/webtoon_cover (12).jpeg",
    },
  ]

  // Sample comics for each genre (just showing for the first genre)
  const sampleComics = [
    {
      id: "1",
      title: "The Cosmic Journey",
      author: "Alex Chen",
      cover: "/webtoon_cover/webtoon_cover (13).jpeg",
      genre: "Sci-Fi",
      rating: 4.8,
      views: "1.2M",
      likes: "450K",
    },
    {
      id: "2",
      title: "Mystic Academy",
      author: "Sophia Kim",
      cover: "/webtoon_cover/webtoon_cover (14).jpeg",
      genre: "Fantasy",
      rating: 4.7,
      views: "980K",
      likes: "410K",
    },
    {
      id: "3",
      title: "Urban Legends",
      author: "Marcus Johnson",
      cover: "/webtoon_cover/webtoon_cover (15).jpeg",
      genre: "Horror",
      rating: 4.6,
      views: "850K",
      likes: "380K",
    },
    {
      id: "4",
      title: "Love in Spring",
      author: "Emily Wang",
      cover: "/webtoon_cover/webtoon_cover (16).jpeg",
      genre: "Romance",
      rating: 4.9,
      views: "1.5M",
      likes: "620K",
    },
  ]

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse by Genre</h1>
          <p className="text-muted-foreground">Explore webcomics across different genres</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="w-full justify-start rounded-full p-1 apple-glass">
          <TabsTrigger value="all" className="rounded-full">
            All Genres
          </TabsTrigger>
          <TabsTrigger value="popular" className="rounded-full">
            Popular
          </TabsTrigger>
          <TabsTrigger value="new" className="rounded-full">
            New Additions
          </TabsTrigger>
        </TabsList>

        {/* Genre Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {genres.map((genre) => (
            <Link key={genre.id} href={`/genres/${genre.id}`}>
              <Card className="apple-card h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-40 w-full overflow-hidden">
                  <div className={`absolute inset-0 ${genre.color} opacity-20`}></div>
                  <Image
                    src={genre.image || "/placeholder.svg"}
                    alt={genre.name}
                    fill
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-2xl font-bold text-foreground">{genre.name}</h2>
                    <p className="text-sm text-foreground/80">{genre.count} titles</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{genre.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="apple" size="sm" className="w-full">
                    Explore {genre.name}
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured in Romance Section */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Featured in Romance</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sampleComics.map((comic) => (
              <Card key={comic.id} className="apple-card overflow-hidden">
                <Link href={`/read/${comic.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
                    <Image
                      src={comic.cover || "/placeholder.svg"}
                      alt={comic.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link href={`/read/${comic.id}`}>
                    <h3 className="line-clamp-1 font-semibold hover:underline">{comic.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">by {comic.author}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{comic.genre}</span>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{comic.rating}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <BookOpen className="mr-1 h-4 w-4" />
                    <span>{comic.views}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="mr-1 h-4 w-4" />
                    <span>{comic.likes}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
