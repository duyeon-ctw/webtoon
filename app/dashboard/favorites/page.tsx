"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, Search, Star, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Mock data for favorite items
const favoriteItems = [
  {
    id: "1",
    title: "The Cosmic Journey",
    author: "Alex Chen",
    cover: "/placeholder.svg?height=240&width=180",
    rating: 5,
    genre: "Sci-Fi",
    addedOn: "2 weeks ago",
  },
  {
    id: "2",
    title: "Mystic Academy",
    author: "Sophia Kim",
    cover: "/placeholder.svg?height=240&width=180",
    rating: 4,
    genre: "Fantasy",
    addedOn: "1 month ago",
  },
  {
    id: "3",
    title: "Urban Legends",
    author: "Marcus Johnson",
    cover: "/placeholder.svg?height=240&width=180",
    rating: 5,
    genre: "Horror",
    addedOn: "3 days ago",
  },
  {
    id: "4",
    title: "Dreamwalker",
    author: "Emma Roberts",
    cover: "/placeholder.svg?height=240&width=180",
    rating: 4,
    genre: "Fantasy",
    addedOn: "2 months ago",
  },
]

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState(favoriteItems)

  // Filter items based on search query
  const filteredItems = favorites.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genre.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Remove from favorites
  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Favorites</h2>
        <div className="relative md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search favorites..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <div className="absolute right-2 top-2 z-10 flex gap-1">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {item.genre}
                  </Badge>
                </div>
                <Image
                  src={item.cover || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="line-clamp-1 text-lg">{item.title}</CardTitle>
                <CardDescription className="line-clamp-1">by {item.author}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < item.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Added {item.addedOn}</span>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                <Button asChild variant="default">
                  <Link href={`/read/${item.id}`}>Read</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => removeFromFavorites(item.id)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Heart className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No favorites found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery ? "Try a different search term" : "Add comics to your favorites to see them here"}
          </p>
          <Button asChild className="mt-4">
            <Link href="/discover">Discover Comics</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
