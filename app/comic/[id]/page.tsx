import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Globe, Heart, MessageSquare, Share2, Star, ThumbsUp, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Comic Details",
  description: "View comic details and episodes",
}

export default function ComicPage({ params }: { params: { id: string } }) {
  // Mock data for the comic
  const comic = {
    id: params.id,
    title: "The Cosmic Journey",
    author: "Alex Chen",
    cover: "/placeholder.svg?height=600&width=400",
    banner: "/placeholder.svg?height=400&width=1200",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    rating: 4.8,
    views: "1.2M",
    likes: "450K",
    subscribers: "120K",
    status: "Ongoing",
    releaseDay: "Friday",
    lastUpdated: "2 days ago",
    description:
      "Follow the adventures of Captain Nova as she explores the unknown regions of space. After a mysterious anomaly appears near Earth, Nova and her crew are sent to investigate, only to find themselves transported to a distant galaxy. Now, they must navigate this strange new world, encounter alien civilizations, and find a way back home while uncovering the secrets of the universe.",
    episodes: Array.from({ length: 10 }).map((_, i) => ({
      id: `${i + 1}`,
      number: i + 1,
      title: `Episode ${i + 1}: ${i === 0 ? "The Beginning" : `The Journey Continues ${i}`}`,
      thumbnail: `/placeholder.svg?height=120&width=200&text=${i + 1}`,
      releaseDate: `${10 - i} days ago`,
      views: `${Math.floor(Math.random() * 100 + 50)}K`,
      likes: `${Math.floor(Math.random() * 50 + 10)}K`,
      comments: Math.floor(Math.random() * 500 + 100),
    })),
    languages: ["English", "Spanish", "Korean", "Japanese", "Chinese"],
    comments: [
      {
        id: "1",
        user: "Reader123",
        avatar: "/placeholder.svg?height=40&width=40",
        content:
          "This is one of the best webcomics I've ever read! The artwork is stunning and the story is so captivating.",
        date: "3 days ago",
        likes: 45,
      },
      {
        id: "2",
        user: "ComicFan",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "I love how the author develops the characters. Can't wait for the next episode!",
        date: "1 week ago",
        likes: 32,
      },
    ],
    similar: Array.from({ length: 4 }).map((_, i) => ({
      id: `similar-${i + 1}`,
      title: `Similar Comic ${i + 1}`,
      cover: `/placeholder.svg?height=300&width=200&text=S${i + 1}`,
      genre: i % 2 === 0 ? "Sci-Fi" : "Adventure",
    })),
  }

  return (
    <div className="container pb-10">
      {/* Banner */}
      <div className="relative h-[200px] w-full overflow-hidden sm:h-[300px] md:h-[400px]">
        <Image src={comic.banner || "/placeholder.svg"} alt={comic.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Comic Info */}
      <div className="relative z-10 mx-auto -mt-32 max-w-5xl px-4 sm:-mt-40 md:-mt-48">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border shadow-lg">
            <Image src={comic.cover || "/placeholder.svg"} alt={comic.title} fill className="object-cover" priority />
          </div>
          <div className="flex flex-col justify-end space-y-4 pt-4 md:pt-0">
            <h1 className="text-3xl font-bold md:text-4xl">{comic.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/creator/${comic.author.toLowerCase().replace(" ", "-")}`}
                className="flex items-center text-sm font-medium hover:underline"
              >
                <User className="mr-1 h-4 w-4" />
                {comic.author}
              </Link>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center text-sm">
                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                {comic.rating}
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center text-sm">
                <BookOpen className="mr-1 h-4 w-4" />
                {comic.views} views
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center text-sm">
                <Heart className="mr-1 h-4 w-4" />
                {comic.likes} likes
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {comic.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{comic.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Release Day</p>
                <p className="font-medium">{comic.releaseDay}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">{comic.lastUpdated}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subscribers</p>
                <p className="font-medium">{comic.subscribers}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button className="flex-1 sm:flex-none">
                <BookOpen className="mr-2 h-4 w-4" />
                Read First Episode
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Heart className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Synopsis</h2>
          <p className="mt-2 text-muted-foreground">{comic.description}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Available Languages</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {comic.languages.map((language) => (
              <Badge key={language} variant="outline" className="flex items-center">
                <Globe className="mr-1 h-3 w-3" />
                {language}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <Tabs defaultValue="episodes" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="episodes">Episodes</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="similar">Similar Comics</TabsTrigger>
          </TabsList>
          <TabsContent value="episodes" className="mt-6">
            <div className="space-y-4">
              {comic.episodes.map((episode) => (
                <div key={episode.id} className="flex flex-col overflow-hidden rounded-lg border sm:flex-row">
                  <div className="relative h-[120px] w-full sm:h-auto sm:w-[200px]">
                    <Image
                      src={episode.thumbnail || "/placeholder.svg"}
                      alt={episode.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h3 className="font-semibold">{episode.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {episode.releaseDate}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="mr-1 h-4 w-4" />
                          {episode.views} views
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          {episode.likes} likes
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          {episode.comments} comments
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button asChild>
                        <Link href={`/read/${comic.id}/${episode.id}`}>Read Episode</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="comments" className="mt-6">
            <div className="space-y-6">
              {comic.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={comment.avatar || "/placeholder.svg"}
                      alt={comment.user}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{comment.user}</h4>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="mt-1 text-sm">{comment.content}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Load More Comments
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="similar" className="mt-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {comic.similar.map((similar) => (
                <Link key={similar.id} href={`/comic/${similar.id}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={similar.cover || "/placeholder.svg"}
                      alt={similar.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-2 font-medium group-hover:underline">{similar.title}</h3>
                  <p className="text-sm text-muted-foreground">{similar.genre}</p>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
