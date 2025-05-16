"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { WebtoonCard } from "@/components/ui/webtoon-card"
import { 
  AlertCircle, 
  BookOpen, 
  BookMarked, 
  Calendar, 
  Clock, 
  CreditCard, 
  Heart, 
  LayoutList, 
  Settings, 
  Star, 
  Ticket, 
  User
} from "lucide-react"
import { formatCurrency, formatDate, getRelativeTime } from "@/lib/utils"
import Link from "next/link"
import type { Webtoon, ReadingProgress, User as UserType } from "@/lib/types"
import { PaymentService, Subscription } from "@/lib/services/payment-service"

// Mock data for the demo
const mockFavorites: Webtoon[] = [
  {
    id: "1",
    title: "The Cosmic Journey",
    author: {
      id: "author1",
      name: "Alex Chen",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Sci-Fi", "Adventure"],
    rating: 4.8,
    views: 1200000,
    likes: 450000,
    description: "Follow the adventures of Captain Nova as she explores the unknown regions of space.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-20",
    episodes: 52,
    isAdult: false,
  },
  {
    id: "2",
    title: "Mystic Academy",
    author: {
      id: "author2",
      name: "Sophia Kim",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Fantasy", "Drama"],
    rating: 4.7,
    views: 980000,
    likes: 410000,
    description: "A young wizard discovers her hidden powers at the prestigious Mystic Academy.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-19",
    episodes: 45,
    isAdult: false,
  },
];

const mockReadingHistory: (ReadingProgress & { webtoon: Webtoon, episodeTitle: string })[] = [
  {
    userId: "user1",
    webtoonId: "1",
    episodeId: "ep52",
    lastReadImage: 10,
    totalImages: 25,
    scrollPosition: 0.4,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    webtoon: mockFavorites[0],
    episodeTitle: "Beyond the Stars",
  },
  {
    userId: "user1",
    webtoonId: "2",
    episodeId: "ep45",
    lastReadImage: 15,
    totalImages: 30,
    scrollPosition: 0.5,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    webtoon: mockFavorites[1],
    episodeTitle: "The Hidden Power",
  },
];

export function UserDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [favoriteWebtoons, setFavoriteWebtoons] = useState<Webtoon[]>([])
  const [readingHistory, setReadingHistory] = useState<any[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load user data when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return

      setIsLoading(true)
      setError(null)
      
      try {
        // In a real app, these would be API calls to fetch user data
        setFavoriteWebtoons(mockFavorites)
        setReadingHistory(mockReadingHistory)
        
        // This one is from our actual payment service
        const userSubscriptions = await PaymentService.getUserSubscriptions(user.id)
        setSubscriptions(userSubscriptions)
      } catch (err) {
        setError("Failed to load user data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadUserData()
  }, [user])

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          Please sign in to view your dashboard.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* User info card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline" className="gap-1">
                  <BookMarked className="h-3 w-3" /> 
                  {favoriteWebtoons.length} Favorites
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" /> 
                  Joined {formatDate(user.createdAt.toString())}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/account/profile">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="mb-6 overflow-x-auto">
          <TabsList className="w-full sm:w-auto bg-transparent p-0 border-b">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent px-4 py-2"
            >
              <LayoutList className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="reading-history" 
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent px-4 py-2"
            >
              <BookOpen className="h-4 w-4" />
              Reading History
            </TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent px-4 py-2"
            >
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger 
              value="subscriptions" 
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent px-4 py-2"
            >
              <Star className="h-4 w-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger 
              value="coins" 
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent px-4 py-2"
            >
              <Ticket className="h-4 w-4" />
              Coins
            </TabsTrigger>
          </TabsList>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Overview tab */}
        <TabsContent value="overview" className="space-y-6">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {/* Continue reading section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Continue Reading</h2>
                {readingHistory.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {readingHistory.slice(0, 2).map(item => (
                      <Card key={`${item.webtoonId}-${item.episodeId}`} className="overflow-hidden">
                        <div className="flex h-full">
                          <div className="w-1/3 relative">
                            <img 
                              src={item.webtoon.cover} 
                              alt={item.webtoon.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                              Episode {item.episodeId.replace('ep', '')}
                            </div>
                          </div>
                          <div className="w-2/3 p-4 flex flex-col justify-between">
                            <div>
                              <h3 className="font-medium line-clamp-1">{item.webtoon.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {item.episodeTitle}
                              </p>
                              <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${Math.round(item.scrollPosition * 100)}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {Math.round(item.scrollPosition * 100)}% complete
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">
                                Last read {getRelativeTime(item.updatedAt)}
                              </span>
                              <Button 
                                size="sm"
                                asChild
                              >
                                <Link href={`/read/${item.webtoonId}/${item.episodeId}`}>
                                  Continue
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">You haven't read any webtoons yet.</p>
                      <Button className="mt-4" asChild>
                        <Link href="/explore">
                          Explore Webtoons
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Subscription status */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
                {subscriptions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subscriptions.map(subscription => (
                      <Card key={subscription.id}>
                        <CardHeader>
                          <CardTitle className="flex justify-between items-start">
                            <span>{subscription.planName}</span>
                            <Badge className={
                              subscription.status === 'active' ? 'bg-green-500' : 
                              subscription.status === 'canceled' ? 'bg-red-500' : 
                              'bg-amber-500'
                            }>
                              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {formatCurrency(subscription.amount, subscription.currency)} per month
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Next billing date:</span>
                              <span>{formatDate(subscription.currentPeriodEnd)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <span>{subscription.cancelAtPeriodEnd ? 'Cancels at period end' : 'Auto-renews'}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            asChild
                          >
                            <Link href="/account/payments?tab=subscriptions">
                              Manage Subscription
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <Star className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">You don't have any active subscriptions.</p>
                      <Button className="mt-4" asChild>
                        <Link href="/account/payments?tab=subscriptions">
                          View Subscription Plans
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Favorite webtoons */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Favorite Webtoons</h2>
                  {favoriteWebtoons.length > 0 && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="#" onClick={() => setActiveTab("favorites")}>
                        View All
                      </Link>
                    </Button>
                  )}
                </div>
                
                {favoriteWebtoons.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {favoriteWebtoons.slice(0, 5).map(webtoon => (
                      <WebtoonCard key={webtoon.id} webtoon={webtoon} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <Heart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">You haven't added any favorites yet.</p>
                      <Button className="mt-4" asChild>
                        <Link href="/explore">
                          Explore Webtoons
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </TabsContent>

        {/* Reading History tab */}
        <TabsContent value="reading-history">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Reading History</h2>
              <Button variant="outline" size="sm">
                Clear History
              </Button>
            </div>

            {isLoading ? (
              <div>Loading...</div>
            ) : readingHistory.length > 0 ? (
              <div className="space-y-4">
                {readingHistory.map(item => (
                  <Card key={`${item.webtoonId}-${item.episodeId}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 relative flex-shrink-0">
                          <img 
                            src={item.webtoon.cover} 
                            alt={item.webtoon.title} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.webtoon.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                Episode {item.episodeId.replace('ep', '')}: {item.episodeTitle}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${Math.round(item.scrollPosition * 100)}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {Math.round(item.scrollPosition * 100)}%
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                              <span className="text-xs text-muted-foreground">
                                {getRelativeTime(item.updatedAt)}
                              </span>
                              <Button 
                                size="sm"
                                asChild
                              >
                                <Link href={`/read/${item.webtoonId}/${item.episodeId}`}>
                                  Continue
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Your reading history is empty.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/explore">
                      Explore Webtoons
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Favorites tab */}
        <TabsContent value="favorites">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Favorite Webtoons</h2>

            {isLoading ? (
              <div>Loading...</div>
            ) : favoriteWebtoons.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {favoriteWebtoons.map(webtoon => (
                  <WebtoonCard key={webtoon.id} webtoon={webtoon} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">You haven't added any favorites yet.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/explore">
                      Explore Webtoons
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Subscriptions tab */}
        <TabsContent value="subscriptions">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Subscriptions</h2>

            {isLoading ? (
              <div>Loading...</div>
            ) : subscriptions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subscriptions.map(subscription => (
                  <Card key={subscription.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{subscription.planName}</span>
                        <Badge className={
                          subscription.status === 'active' ? 'bg-green-500' : 
                          subscription.status === 'canceled' ? 'bg-red-500' : 
                          'bg-amber-500'
                        }>
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {formatCurrency(subscription.amount, subscription.currency)} per month
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Started:</span>
                          <span>{formatDate(subscription.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current period:</span>
                          <span>
                            {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span>{subscription.cancelAtPeriodEnd ? 'Cancels at period end' : 'Auto-renews'}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        asChild
                      >
                        <Link href="/account/payments?tab=subscriptions">
                          Manage Subscription
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">You don't have any active subscriptions.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/account/payments?tab=subscriptions">
                      View Subscription Plans
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Coins tab */}
        <TabsContent value="coins">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Coins</h2>
              <Button asChild>
                <Link href="/account/payments?tab=coins">
                  Buy Coins
                </Link>
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                    <Ticket className="h-8 w-8 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Current Balance</div>
                    <div className="text-3xl font-bold">250 Coins</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-lg font-medium mb-4">Transaction History</h3>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Purchased 100 Coins</div>
                        <div className="text-sm text-muted-foreground">March 15, 2024</div>
                      </div>
                      <Badge variant="outline" className="text-green-600">+100</Badge>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Unlocked Episode 12: The Hidden Power</div>
                        <div className="text-sm text-muted-foreground">March 10, 2024</div>
                      </div>
                      <Badge variant="outline" className="text-red-600">-25</Badge>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Premium Subscription Bonus</div>
                        <div className="text-sm text-muted-foreground">March 1, 2024</div>
                      </div>
                      <Badge variant="outline" className="text-green-600">+150</Badge>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Unlocked Episode 51: Beyond the Stars</div>
                        <div className="text-sm text-muted-foreground">February 28, 2024</div>
                      </div>
                      <Badge variant="outline" className="text-red-600">-25</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 