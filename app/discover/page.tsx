import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Heart, Search, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Discover Webcomics",
  description: "Explore and discover webcomics from around the world",
}

export default function DiscoverPage() {
  // Mock data for webcomics
  const webcomics = Array.from({ length: 12 }).map((_, i) => ({
    id: `${i + 1}`,
    title: `Webcomic Title ${i + 1}`,
    author: `Author ${i + 1}`,
    cover: `/placeholder.svg?height=400&width=300&text=${i + 1}`,
    genre: i % 3 === 0 ? "Fantasy" : i % 3 === 1 ? "Romance" : "Action",
    rating: (4 + Math.random()).toFixed(1),
    views: `${Math.floor(Math.random() * 900 + 100)}K`,
    likes: `${Math.floor(Math.random() * 400 + 50)}K`,
    description: "A captivating story that will keep you engaged from start to finish.",
    status: i % 4 === 0 ? "Completed" : "Ongoing",
    updateDay: i % 7 === 0 ? "Monday" : i % 7 === 1 ? "Wednesday" : "Friday",
  }))

  // Genres for filter
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Thriller",
  ]

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discover Webcomics</h1>
          <p className="text-muted-foreground">Explore and discover webcomics from around the world</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search webcomics..." className="w-full rounded-md pl-8 md:w-[300px]" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Select defaultValue="latest">
              <SelectTrigger className="w-[180px]">
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

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <div className="p-6">
              <h3 className="font-semibold">Filter</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Genres</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {genres.slice(0, 10).map((genre) => (
                      <div key={genre} className="flex items-center space-x-2">
                        <Checkbox id={`genre-${genre}`} />
                        <label
                          htmlFor={`genre-${genre}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {genre}
                        </label>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="mt-1 h-auto p-0 text-xs">
                    Show more
                  </Button>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Status</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-ongoing" />
                      <label
                        htmlFor="status-ongoing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Ongoing
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="status-completed" />
                      <label
                        htmlFor="status-completed"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Completed
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Update Day</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox id={`day-${day}`} />
                        <label
                          htmlFor={`day-${day}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </Card>

          {webcomics.map((comic) => (
            <Card key={comic.id} className="overflow-hidden">
              <Link href={`/comic/${comic.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={comic.cover || "/placeholder.svg"}
                    alt={comic.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <Link href={`/comic/${comic.id}`}>
                  <h3 className="line-clamp-1 font-semibold hover:underline">{comic.title}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">by {comic.author}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">{comic.genre}</span>
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

        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="mx-2">
            Previous
          </Button>
          <Button variant="outline" className="mx-2">
            Next
          </Button>
        </div>
      </Tabs>
    </div>
  )
}
