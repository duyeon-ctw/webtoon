import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Heart, Star, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Popular Webcomics - COZWO WEBTOON",
  description: "Explore the most popular webcomics on COZWO WEBTOON",
}

export default function PopularPage() {
  // Mock data for popular webcomics
  const popularWebcomics = Array.from({ length: 20 }).map((_, i) => ({
    id: `${i + 1}`,
    title: `Popular Title ${i + 1}`,
    author: `Author ${i + 1}`,
    cover: `/placeholder.svg?height=400&width=300&text=Popular${i + 1}`,
    genre:
      i % 5 === 0 ? "Romance" : i % 5 === 1 ? "Action" : i % 5 === 2 ? "Fantasy" : i % 5 === 3 ? "Comedy" : "Drama",
    rating: (4 + Math.random()).toFixed(1),
    views: `${Math.floor(Math.random() * 900 + 100)}K`,
    likes: `${Math.floor(Math.random() * 400 + 50)}K`,
    rank: i + 1,
    trending: i < 5 ? "up" : i < 10 ? "same" : "down",
    lastWeekRank: i < 5 ? i + 2 : i < 10 ? i + 1 : i - 2,
  }))

  // Time periods for popularity
  const timePeriods = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "allTime", label: "All Time" },
  ]

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Popular Webcomics</h1>
          <p className="text-muted-foreground">The most-read webcomics on COZWO WEBTOON</p>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="mt-6">
        <TabsList className="w-full justify-start rounded-full p-1 apple-glass">
          {timePeriods.map((period) => (
            <TabsTrigger key={period.value} value={period.value} className="rounded-full">
              {period.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {timePeriods.map((period) => (
          <div key={period.value} className={period.value === "weekly" ? "mt-8" : "hidden"}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {popularWebcomics.map((comic) => (
                <Card key={comic.id} className="apple-card overflow-hidden">
                  <Link href={`/comic/${comic.id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
                      <div className="absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-br-lg bg-black/70 text-white">
                        {comic.rank}
                      </div>
                      {comic.trending === "up" && (
                        <div className="absolute right-0 top-0 z-10 flex items-center rounded-bl-lg bg-green-500/70 px-2 py-1 text-xs text-white">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          {comic.lastWeekRank - comic.rank}
                        </div>
                      )}
                      {comic.trending === "down" && (
                        <div className="absolute right-0 top-0 z-10 flex items-center rounded-bl-lg bg-red-500/70 px-2 py-1 text-xs text-white">
                          <TrendingUp className="mr-1 h-3 w-3 rotate-180" />
                          {comic.rank - comic.lastWeekRank}
                        </div>
                      )}
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
        ))}
      </Tabs>

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
            5
          </Button>
          <Button variant="outline" className="rounded-full">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
