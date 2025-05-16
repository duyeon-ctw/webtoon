"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, BookOpen, Clock, Eye, Heart, TrendingUp, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const { user } = useAuth()

  // Mock data for the dashboard
  const recentlyRead = [
    {
      id: "1",
      title: "The Cosmic Journey",
      author: "Alex Chen",
      cover: "/placeholder.svg?height=80&width=60",
      progress: 75,
      lastRead: "2 hours ago",
      chapter: "Chapter 45",
    },
    {
      id: "2",
      title: "Mystic Academy",
      author: "Sophia Kim",
      cover: "/placeholder.svg?height=80&width=60",
      progress: 30,
      lastRead: "Yesterday",
      chapter: "Chapter 12",
    },
    {
      id: "3",
      title: "Urban Legends",
      author: "Marcus Johnson",
      cover: "/placeholder.svg?height=80&width=60",
      progress: 100,
      lastRead: "3 days ago",
      chapter: "Chapter 28",
    },
  ]

  const creatorStats = {
    totalViews: "125.4K",
    totalLikes: "8.2K",
    totalComments: "1.5K",
    totalSubscribers: "2.3K",
    recentUploads: [
      {
        id: "1",
        title: "The Cosmic Journey",
        chapter: "Chapter 46",
        uploadDate: "2 days ago",
        views: "5.2K",
        likes: "420",
      },
      {
        id: "2",
        title: "The Cosmic Journey",
        chapter: "Chapter 45",
        uploadDate: "1 week ago",
        views: "12.8K",
        likes: "980",
      },
    ],
  }

  const translatorStats = {
    completedTranslations: 24,
    pendingTranslations: 3,
    languages: ["Spanish", "French", "German"],
    recentTranslations: [
      {
        id: "1",
        title: "The Cosmic Journey",
        chapter: "Chapter 46",
        language: "Spanish",
        status: "Completed",
        date: "3 days ago",
      },
      {
        id: "2",
        title: "Mystic Academy",
        chapter: "Chapter 15",
        language: "French",
        status: "In Progress",
        date: "1 day ago",
      },
    ],
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        {user?.role === "creator" && (
          <Button asChild>
            <Link href="/dashboard/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload New Episode
            </Link>
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg?height=48&width=48" alt={user?.name || "User"} />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium">{user?.name || "User"}</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="capitalize">
              {user?.role || "Reader"}
            </Badge>
            {user?.role === "creator" && <Badge variant="secondary">Pro Member</Badge>}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reading">Reading</TabsTrigger>
          {user?.role === "creator" && <TabsTrigger value="creator">Creator</TabsTrigger>}
          {user?.role === "translator" && <TabsTrigger value="translator">Translator</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 days</div>
                <p className="text-xs text-muted-foreground">+2 days compared to last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comics Read</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 comics this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 new favorites</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reading Time</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2 hrs</div>
                <p className="text-xs text-muted-foreground">+1.2 hrs compared to last week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recently Read</CardTitle>
                <CardDescription>Continue reading where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentlyRead.map((comic) => (
                    <div key={comic.id} className="flex items-center space-x-4">
                      <div className="relative h-20 w-14 overflow-hidden rounded">
                        <Image
                          src={comic.cover || "/placeholder.svg"}
                          alt={comic.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium">{comic.title}</h4>
                        <p className="text-sm text-muted-foreground">{comic.chapter}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {comic.lastRead}
                        </div>
                        <div className="w-full">
                          <Progress value={comic.progress} className="h-1" />
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/read/${comic.id}`}>Continue</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
                <CardDescription>Based on your reading history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Link key={i} href={`/comic/${i}`} className="space-y-1">
                      <div className="relative aspect-[3/4] overflow-hidden rounded">
                        <Image
                          src={`/placeholder.svg?height=120&width=90&text=${i}`}
                          alt={`Recommended comic ${i}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-xs font-medium line-clamp-1">Recommended Title {i}</p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reading History</CardTitle>
              <CardDescription>Your recent reading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentlyRead.map((comic) => (
                  <div key={comic.id} className="flex items-center space-x-4">
                    <div className="relative h-20 w-14 overflow-hidden rounded">
                      <Image src={comic.cover || "/placeholder.svg"} alt={comic.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium">{comic.title}</h4>
                      <p className="text-sm text-muted-foreground">by {comic.author}</p>
                      <p className="text-sm">
                        {comic.chapter} • {comic.lastRead}
                      </p>
                      <div className="w-full">
                        <Progress value={comic.progress} className="h-1" />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/read/${comic.id}`}>Continue</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user?.role === "creator" && (
          <TabsContent value="creator" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{creatorStats.totalViews}</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{creatorStats.totalLikes}</div>
                  <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{creatorStats.totalSubscribers}</div>
                  <p className="text-xs text-muted-foreground">+15.3% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,234.56</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
                <CardDescription>Performance of your recent episodes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creatorStats.recentUploads.map((upload) => (
                    <div key={upload.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{upload.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {upload.chapter} • {upload.uploadDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>{upload.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-muted-foreground" />
                          <span>{upload.likes}</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/analytics/${upload.id}`}>Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {user?.role === "translator" && (
          <TabsContent value="translator" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Translations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{translatorStats.completedTranslations}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Translations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{translatorStats.pendingTranslations}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {translatorStats.languages.map((language) => (
                      <Badge key={language} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Translations</CardTitle>
                <CardDescription>Your recent translation activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {translatorStats.recentTranslations.map((translation) => (
                    <div key={translation.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{translation.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {translation.chapter} • {translation.language}
                        </p>
                        <div className="flex items-center text-xs">
                          <Badge
                            variant={translation.status === "Completed" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {translation.status}
                          </Badge>
                          <span className="ml-2 text-muted-foreground">{translation.date}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/translations/${translation.id}`}>
                          {translation.status === "Completed" ? "View" : "Continue"}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
