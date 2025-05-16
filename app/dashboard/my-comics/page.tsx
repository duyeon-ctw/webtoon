"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Filter, MoreHorizontal, Plus, Search, Star, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for creator's comics
const myComics = [
  {
    id: "1",
    title: "The Cosmic Journey",
    cover: "/placeholder.svg?height=240&width=180",
    status: "ongoing",
    episodes: 46,
    views: "125.4K",
    likes: "8.2K",
    lastUpdated: "2 days ago",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Mystic Academy",
    cover: "/placeholder.svg?height=240&width=180",
    status: "hiatus",
    episodes: 28,
    views: "75.2K",
    likes: "5.1K",
    lastUpdated: "3 months ago",
    rating: 4.5,
  },
  {
    id: "3",
    title: "Urban Legends",
    cover: "/placeholder.svg?height=240&width=180",
    status: "completed",
    episodes: 52,
    views: "210.8K",
    likes: "15.3K",
    lastUpdated: "1 year ago",
    rating: 4.9,
  },
]

// Mock data for draft comics
const draftComics = [
  {
    id: "draft-1",
    title: "Dreamwalker",
    cover: "/placeholder.svg?height=240&width=180",
    lastEdited: "Yesterday",
    completionStatus: 65,
  },
  {
    id: "draft-2",
    title: "Neon Knights",
    cover: "/placeholder.svg?height=240&width=180",
    lastEdited: "1 week ago",
    completionStatus: 30,
  },
]

export default function MyComicsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("published")

  // Filter comics based on search query
  const filteredPublishedComics = myComics.filter((comic) =>
    comic.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDraftComics = draftComics.filter((comic) =>
    comic.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Comics</h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64 md:flex-none">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search comics..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button asChild>
            <Link href="/dashboard/upload?tab=new-series">
              <Plus className="mr-2 h-4 w-4" />
              New Series
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="published" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="space-y-4">
          {filteredPublishedComics.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPublishedComics.map((comic) => (
                <Card key={comic.id} className="overflow-hidden">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <div className="absolute right-2 top-2 z-10">
                      <Badge
                        variant={
                          comic.status === "ongoing"
                            ? "default"
                            : comic.status === "completed"
                              ? "secondary"
                              : "outline"
                        }
                        className="capitalize"
                      >
                        {comic.status}
                      </Badge>
                    </div>
                    <Image src={comic.cover || "/placeholder.svg"} alt={comic.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="line-clamp-1">{comic.title}</CardTitle>
                        <CardDescription>
                          {comic.episodes} episodes • Last updated {comic.lastUpdated}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/upload?series=${comic.id}`}>Add Episode</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/analytics?series=${comic.id}`}>View Analytics</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/read/${comic.id}`}>View Series</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/edit-series/${comic.id}`}>Edit Series</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>{comic.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span>{comic.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Reader" />
                          <AvatarFallback>R</AvatarFallback>
                        </Avatar>
                        <span>{comic.likes} likes</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                    <Button asChild variant="default">
                      <Link href={`/dashboard/upload?series=${comic.id}`}>Add Episode</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/dashboard/analytics?series=${comic.id}`}>Analytics</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="No comics"
                width={100}
                height={100}
                className="mb-4"
              />
              <h3 className="text-lg font-semibold">No published comics found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchQuery ? "Try a different search term" : "Create your first comic series to get started"}
              </p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/upload?tab=new-series">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Series
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {filteredDraftComics.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDraftComics.map((draft) => (
                <Card key={draft.id} className="overflow-hidden">
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    {draft.cover ? (
                      <Image
                        src={draft.cover || "/placeholder.svg"}
                        alt={draft.title}
                        fill
                        className="object-cover opacity-70"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-muted-foreground">No Cover</span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        Draft
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="line-clamp-1">{draft.title}</CardTitle>
                        <CardDescription>Last edited {draft.lastEdited}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/edit-series/${draft.id}`}>Edit Draft</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete Draft</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completion</span>
                      <span>{draft.completionStatus}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary" style={{ width: `${draft.completionStatus}%` }} />
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                    <Button asChild variant="default">
                      <Link href={`/dashboard/edit-series/${draft.id}`}>Continue Editing</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="No drafts"
                width={100}
                height={100}
                className="mb-4"
              />
              <h3 className="text-lg font-semibold">No draft comics found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchQuery ? "Try a different search term" : "Create a new series and save it as a draft"}
              </p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/upload?tab=new-series">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Draft
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
