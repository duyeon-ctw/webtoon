import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Heart, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "New Releases - COZWO WEBTOON",
  description: "Discover the newest webcomics on COZWO WEBTOON",
}

export default function NewReleasesPage() {
  // Mock data for new webcomics
  const newWebcomics = Array.from({ length: 16 }).map((_, i) => ({
    id: `${i + 1}`,
    title: `New Release ${i + 1}`,
    author: `Author ${i + 1}`,
    cover: `/placeholder.svg?height=400&width=300&text=New${i + 1}`,
    genre:
      i % 5 === 0 ? "Romance" : i % 5 === 1 ? "Action" : i % 5 === 2 ? "Fantasy" : i % 5 === 3 ? "Comedy" : "Drama",
    rating: (4 + Math.random()).toFixed(1),
    views: `${Math.floor(Math.random() * 100 + 10)}K`,
    likes: `${Math.floor(Math.random() * 50 + 5)}K`,
    releaseDate: i < 4 ? "Today" : i < 8 ? "Yesterday" : i < 12 ? "2 days ago" : "This week",
  }))

  // Time periods for new releases
  const timePeriods = [
    { value: "today", label: "Today" },
    { value: "thisWeek", label: "This Week" },
    { value: "thisMonth", label: "This Month" },
  ]

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Releases</h1>
          <p className="text-muted-foreground">The latest webcomics added to COZWO WEBTOON</p>
        </div>
      </div>

      <Tabs defaultValue="today" className="mt-6">
        <TabsList className="w-full justify-start rounded-full p-1 apple-glass">
          {timePeriods.map((period) => (
            <TabsTrigger key={period.value} value={period.value} className="rounded-full">
              {period.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {timePeriods.map((period) => (
          <div key={period.value} className={period.value === "today" ? "mt-8" : "hidden"}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {newWebcomics
                .filter((comic, index) => (period.value === "today" ? index < 8 : true))
                .map((comic) => (
                  <Card key={comic.id} className="apple-card overflow-hidden">
                    <Link href={`/read/${comic.id}`}>
                      <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
                        <div className="absolute right-0 top-0 z-10 m-2 rounded-full bg-primary px-2 py-1 text-xs text-white">
                          NEW
                        </div>
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
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {comic.releaseDate}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4 pt-0 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        <span>{comic.rating}</span>
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

      {/* Featured New Series */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Featured New Series</h2>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 to-blue-400/20 p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">
                New Series
              </span>
              <h3 className="mb-2 text-3xl font-bold">Stellar Odyssey</h3>
              <p className="mb-4 text-muted-foreground">
                A breathtaking space adventure following Captain Elara as she navigates uncharted galaxies and
                encounters alien civilizations. With stunning artwork and an engaging storyline, this new series is set
                to become a fan favorite.
              </p>
              <div className="mb-6 flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="mr-1 h-5 w-5 text-yellow-500" />
                  <span>4.9</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-1 h-5 w-5" />
                  <span>5 Episodes</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-5 w-5" />
                  <span>Updates Fridays</span>
                </div>
              </div>
              <Button variant="gradient" className="w-fit">
                Start Reading
              </Button>
            </div>
            <div className="relative h-[300px] md:h-auto">
              <Image
                src="/placeholder.svg?height=400&width=300&text=Stellar+Odyssey"
                alt="Stellar Odyssey"
                fill
                className="rounded-xl object-cover object-center"
              />
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl"></div>
        </div>
      </div>
    </div>
  )
}
