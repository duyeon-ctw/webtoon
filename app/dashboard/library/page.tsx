"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BookOpen, Clock, Filter, Search, SortDesc } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for library items
const libraryItems = [
  {
    id: "1",
    title: "The Cosmic Journey",
    author: "Alex Chen",
    cover: "/placeholder.svg?height=240&width=180",
    lastRead: "2 hours ago",
    progress: 75,
    chapter: "Chapter 45",
    status: "reading",
  },
  {
    id: "2",
    title: "Mystic Academy",
    author: "Sophia Kim",
    cover: "/placeholder.svg?height=240&width=180",
    lastRead: "Yesterday",
    progress: 30,
    chapter: "Chapter 12",
    status: "reading",
  },
  {
    id: "3",
    title: "Urban Legends",
    author: "Marcus Johnson",
    cover: "/placeholder.svg?height=240&width=180",
    lastRead: "3 days ago",
    progress: 100,
    chapter: "Chapter 28",
    status: "completed",
  },
  {
    id: "4",
    title: "Dreamwalker",
    author: "Emma Roberts",
    cover: "/placeholder.svg?height=240&width=180",
    lastRead: "1 week ago",
    progress: 60,
    chapter: "Chapter 15",
    status: "reading",
  },
  {
    id: "5",
    title: "Neon Knights",
    author: "David Wong",
    cover: "/placeholder.svg?height=240&width=180",
    lastRead: "2 weeks ago",
    progress: 100,
    chapter: "Chapter 32",
    status: "completed",
  },
  {
    id: "6",
    title: "Ocean's Depths",
    author: "Maria Garcia",
    cover: "/placeholder.svg?height=240&width=180",
    lastRead: "1 month ago",
    progress: 40,
    chapter: "Chapter 8",
    status: "on-hold",
  },
]

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter items based on search query and active tab
  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && item.status === activeTab
  })

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Library</h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64 md:flex-none">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search library..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button variant="outline" size="icon">
            <SortDesc className="h-4 w-4" />
            <span className="sr-only">Sort</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="reading">Reading</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="on-hold">On Hold</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
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
                  <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>{item.chapter}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{item.lastRead}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full">
                      <Link href={`/read/${item.id}`}>{item.progress === 100 ? "Read Again" : "Continue"}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No comics found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchQuery ? "Try a different search term" : "Add comics to your library to see them here"}
              </p>
              <Button asChild className="mt-4">
                <Link href="/discover">Discover Comics</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
