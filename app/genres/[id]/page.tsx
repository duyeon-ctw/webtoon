import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Heart, Star } from "lucide-react"

type Props = {
  params: { id: string }
}

export function generateMetadata({ params }: Props): Metadata {
  // Capitalize the first letter of each word in the genre
  const genreName = params.id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${genreName} Webcomics - COZWO WEBTOON`,
    description: `Explore ${genreName} webcomics on COZWO WEBTOON`,
  }
}

export default function GenrePage({ params }: Props) {
  // Get the genre name from the URL parameter
  const genreName = params.id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Mock data for webcomics in this genre
  const webcomics = Array.from({ length: 12 }).map((_, i) => ({
    id: `${i + 1}`,
    title: `${genreName} Title ${i + 1}`,
    author: `Author ${i + 1}`,
    cover: `/placeholder.svg?height=400&width=300&text=${genreName}${i + 1}`,
    genre: genreName,
    rating: (4 + Math.random()).toFixed(1),
    views: `${Math.floor(Math.random() * 900 + 100)}K`,
    likes: `${Math.floor(Math.random() * 400 + 50)}K`,
    description: `A captivating ${genreName.toLowerCase()} story that will keep you engaged from start to finish.`,
    status: i % 4 === 0 ? "Completed" : "Ongoing",
    updateDay: i % 7 === 0 ? "Monday" : i % 7 === 1 ? "Wednesday" : "Friday",
  }))

  // Get genre color based on genre name
  const getGenreColor = (genre: string) => {
    const colorMap: Record<string, string> = {
      Romance: "bg-pink-500",
      Action: "bg-red-500",
      Fantasy: "bg-purple-500",
      Comedy: "bg-yellow-500",
      Drama: "bg-blue-500",
      "Sci Fi": "bg-cyan-500",
      Horror: "bg-gray-800",
      "Slice Of Life": "bg-green-500",
      Mystery: "bg-indigo-500",
      Thriller: "bg-orange-500",
      Historical: "bg-amber-700",
      Sports: "bg-emerald-500",
    }

    return colorMap[genre] || "bg-primary"
  }

  return (
    <div className="container py-6 md:py-10">
      {/* Genre Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl">
        <div className={`absolute inset-0 ${getGenreColor(genreName)} opacity-20`}></div>
        <div className="relative z-10 px-6 py-12 sm:px-12">
          <h1 className="text-4xl font-bold tracking-tight">{genreName}</h1>
          <p className="mt-2 max-w-3xl text-lg text-muted-foreground">
            Explore the best {genreName.toLowerCase()} webcomics on COZWO WEBTOON. From classics to new releases, find
            your next favorite read.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="apple">Most Popular</Button>
            <Button variant="outline">New Releases</Button>
            <Button variant="outline">Completed Series</Button>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <Tabs defaultValue="all" className="w-full sm:w-auto">
          <TabsList className="rounded-full p-1 apple-glass">
            <TabsTrigger value="all" className="rounded-full">
              All
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="rounded-full">
              Ongoing
            </TabsTrigger>
            <TabsTrigger value="completed" className="rounded-full">
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center space-x-2">
          <Select defaultValue="latest">
            <SelectTrigger className="w-[180px] rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest Update</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="newest">Newest Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Webcomics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {webcomics.map((comic) => (
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
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{comic.status}</span>
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

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-full" disabled>
            Previous
          </Button>
          <Button variant="outline" className="h-10 w-10 rounded-full p-0">
            1
          </Button>
          <Button variant="outline" className="h-10 w-10 rounded-full p-0">
            2
          </Button>
          <Button variant="outline" className="h-10 w-10 rounded-full p-0">
            3
          </Button>
          <span className="mx-2">...</span>
          <Button variant="outline" className="h-10 w-10 rounded-full p-0">
            10
          </Button>
          <Button variant="outline" className="rounded-full">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
