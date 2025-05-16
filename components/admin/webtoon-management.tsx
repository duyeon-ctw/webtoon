"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  ArrowUpDown,
  BookOpen,
  Star,
  BarChart3,
  TrendingUp,
  Download,
  Settings,
  FileText,
  Share2,
  DollarSign,
  ThumbsUp,
} from "lucide-react"

// Mock data for webtoons
const mockWebtoons = [
  {
    id: "wt-001",
    title: "The Silent Guardian",
    creator: "Sarah Chen",
    status: "published",
    genre: "Action",
    rating: 4.8,
    views: 1245678,
    lastUpdated: "2023-05-15",
    episodes: 45,
    featured: true,
    subscribers: 78500,
    comments: 12450,
    likes: 98700,
    shares: 34500,
    revenue: 12500,
    completionRate: 87,
    demographics: { male: 65, female: 35 },
    ageGroups: { "13-17": 15, "18-24": 35, "25-34": 30, "35+": 20 },
    trending: true,
    monetized: true,
    thumbnail: "/placeholder.svg?height=80&width=60&text=SG",
  },
  {
    id: "wt-002",
    title: "Moonlight Sonata",
    creator: "James Wilson",
    status: "published",
    genre: "Romance",
    rating: 4.5,
    views: 987543,
    lastUpdated: "2023-05-10",
    episodes: 32,
    featured: false,
    subscribers: 54300,
    comments: 8760,
    likes: 76500,
    shares: 21300,
    revenue: 8700,
    completionRate: 92,
    demographics: { male: 30, female: 70 },
    ageGroups: { "13-17": 25, "18-24": 40, "25-34": 25, "35+": 10 },
    trending: false,
    monetized: true,
    thumbnail: "/placeholder.svg?height=80&width=60&text=MS",
  },
  {
    id: "wt-003",
    title: "Cyber Nexus",
    creator: "Alex Rivera",
    status: "draft",
    genre: "Sci-Fi",
    rating: 0,
    views: 0,
    lastUpdated: "2023-05-08",
    episodes: 5,
    featured: false,
    subscribers: 0,
    comments: 0,
    likes: 0,
    shares: 0,
    revenue: 0,
    completionRate: 0,
    demographics: { male: 0, female: 0 },
    ageGroups: { "13-17": 0, "18-24": 0, "25-34": 0, "35+": 0 },
    trending: false,
    monetized: false,
    thumbnail: "/placeholder.svg?height=80&width=60&text=CN",
  },
  {
    id: "wt-004",
    title: "Ethereal Dreams",
    creator: "Mia Johnson",
    status: "published",
    genre: "Fantasy",
    rating: 4.7,
    views: 876543,
    lastUpdated: "2023-05-05",
    episodes: 28,
    featured: true,
    subscribers: 67800,
    comments: 9870,
    likes: 87600,
    shares: 29800,
    revenue: 10200,
    completionRate: 85,
    demographics: { male: 45, female: 55 },
    ageGroups: { "13-17": 30, "18-24": 35, "25-34": 25, "35+": 10 },
    trending: true,
    monetized: true,
    thumbnail: "/placeholder.svg?height=80&width=60&text=ED",
  },
  {
    id: "wt-005",
    title: "Urban Legends",
    creator: "David Kim",
    status: "under review",
    genre: "Horror",
    rating: 4.2,
    views: 543210,
    lastUpdated: "2023-05-01",
    episodes: 15,
    featured: false,
    subscribers: 32100,
    comments: 5430,
    likes: 43200,
    shares: 12300,
    revenue: 5600,
    completionRate: 78,
    demographics: { male: 55, female: 45 },
    ageGroups: { "13-17": 10, "18-24": 30, "25-34": 40, "35+": 20 },
    trending: false,
    monetized: true,
    thumbnail: "/placeholder.svg?height=80&width=60&text=UL",
  },
]

// Mock data for episodes
const mockEpisodes = [
  {
    id: "ep-001",
    webtoonId: "wt-001",
    title: "The Beginning",
    number: 1,
    status: "published",
    publishDate: "2023-01-15",
    views: 125000,
    likes: 8700,
    comments: 450,
    thumbnail: "/placeholder.svg?height=60&width=40&text=EP1",
  },
  {
    id: "ep-002",
    webtoonId: "wt-001",
    title: "The Encounter",
    number: 2,
    status: "published",
    publishDate: "2023-01-22",
    views: 118000,
    likes: 8200,
    comments: 420,
    thumbnail: "/placeholder.svg?height=60&width=40&text=EP2",
  },
  {
    id: "ep-003",
    webtoonId: "wt-001",
    title: "The Challenge",
    number: 3,
    status: "published",
    publishDate: "2023-01-29",
    views: 115000,
    likes: 7900,
    comments: 410,
    thumbnail: "/placeholder.svg?height=60&width=40&text=EP3",
  },
  {
    id: "ep-004",
    webtoonId: "wt-001",
    title: "The Revelation",
    number: 4,
    status: "scheduled",
    publishDate: "2023-06-05",
    views: 0,
    likes: 0,
    comments: 0,
    thumbnail: "/placeholder.svg?height=60&width=40&text=EP4",
  },
  {
    id: "ep-005",
    webtoonId: "wt-001",
    title: "The Confrontation",
    number: 5,
    status: "draft",
    publishDate: "",
    views: 0,
    likes: 0,
    comments: 0,
    thumbnail: "/placeholder.svg?height=60&width=40&text=EP5",
  },
]

export function WebtoonManagement() {
  const [selectedWebtoons, setSelectedWebtoons] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [genreFilter, setGenreFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedWebtoon, setSelectedWebtoon] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"webtoons" | "episodes">("webtoons")

  // Calculate total stats
  const totalViews = mockWebtoons.reduce((sum, webtoon) => sum + webtoon.views, 0)
  const totalSubscribers = mockWebtoons.reduce((sum, webtoon) => sum + webtoon.subscribers, 0)
  const totalRevenue = mockWebtoons.reduce((sum, webtoon) => sum + webtoon.revenue, 0)
  const totalLikes = mockWebtoons.reduce((sum, webtoon) => sum + webtoon.likes, 0)
  const publishedCount = mockWebtoons.filter((w) => w.status === "published").length
  const trendingCount = mockWebtoons.filter((w) => w.trending).length

  // Filter webtoons based on search query and filters
  const filteredWebtoons = mockWebtoons.filter((webtoon) => {
    const matchesSearch =
      webtoon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webtoon.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webtoon.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || webtoon.status === statusFilter
    const matchesGenre = genreFilter === "all" || webtoon.genre === genreFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "published" && webtoon.status === "published") ||
      (activeTab === "drafts" && webtoon.status === "draft") ||
      (activeTab === "flagged" && webtoon.status === "flagged") ||
      (activeTab === "trending" && webtoon.trending) ||
      (activeTab === "monetized" && webtoon.monetized)

    return matchesSearch && matchesStatus && matchesGenre && matchesTab
  })

  // Get episodes for selected webtoon
  const filteredEpisodes = selectedWebtoon
    ? mockEpisodes.filter((episode) => episode.webtoonId === selectedWebtoon)
    : []

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedWebtoons(filteredWebtoons.map((webtoon) => webtoon.id))
    } else {
      setSelectedWebtoons([])
    }
  }

  // Handle select individual webtoon
  const handleSelectWebtoon = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedWebtoons((prev) => [...prev, id])
    } else {
      setSelectedWebtoons((prev) => prev.filter((webtoonId) => webtoonId !== id))
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "under review":
        return <Badge className="bg-yellow-500">Under Review</Badge>
      case "flagged":
        return <Badge className="bg-red-500">Flagged</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Webtoon Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Webtoon
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Webtoon</DialogTitle>
                <DialogDescription>
                  Enter the details for the new webtoon. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="creator" className="text-right">
                    Creator
                  </Label>
                  <Input id="creator" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="genre" className="text-right">
                    Genre
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="action">Action</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="under review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="featured" className="text-right">
                    Featured
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch id="featured" />
                    <Label htmlFor="featured">Feature this webtoon on the homepage</Label>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="monetized" className="text-right">
                    Monetization
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch id="monetized" />
                    <Label htmlFor="monetized">Enable monetization for this webtoon</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Webtoon</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Dashboard Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            <Progress className="mt-2" value={75} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
            <Progress className="mt-2" value={65} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
            <Progress className="mt-2" value={85} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+10.1% from last month</p>
            <Progress className="mt-2" value={70} />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Webtoons</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="monetized">Monetized</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "webtoons" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("webtoons")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Webtoons
              </Button>
              <Button
                variant={viewMode === "episodes" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("episodes")}
                disabled={!selectedWebtoon}
              >
                <FileText className="mr-2 h-4 w-4" />
                Episodes
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search webtoons..."
                  className="w-full rounded-md pl-8 md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {selectedWebtoons.length > 0 && (
                <>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>

          {showAdvancedFilters && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="status-filter">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="status-filter" className="mt-1">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="under review">Under Review</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="genre-filter">Genre</Label>
                    <Select value={genreFilter} onValueChange={setGenreFilter}>
                      <SelectTrigger id="genre-filter" className="mt-1">
                        <SelectValue placeholder="Genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Genres</SelectItem>
                        <SelectItem value="Action">Action</SelectItem>
                        <SelectItem value="Romance">Romance</SelectItem>
                        <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                        <SelectItem value="Fantasy">Fantasy</SelectItem>
                        <SelectItem value="Horror">Horror</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                        <SelectItem value="Mystery">Mystery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sort-by">Sort By</Label>
                    <Select defaultValue="newest">
                      <SelectTrigger id="sort-by" className="mt-1">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="views">Most Views</SelectItem>
                        <SelectItem value="rating">Highest Rating</SelectItem>
                        <SelectItem value="az">A-Z</SelectItem>
                        <SelectItem value="za">Z-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Reset Filters
                  </Button>
                  <Button size="sm">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <TabsContent value="all" className="space-y-4">
            {viewMode === "webtoons" ? (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={selectedWebtoons.length === filteredWebtoons.length && filteredWebtoons.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead className="w-[60px]"></TableHead>
                        <TableHead className="min-w-[150px]">
                          <div className="flex items-center cursor-pointer">
                            Title
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Creator
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Rating
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Views
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Episodes
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Last Updated
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWebtoons.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={11} className="h-24 text-center">
                            No webtoons found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredWebtoons.map((webtoon) => (
                          <TableRow key={webtoon.id} className={selectedWebtoon === webtoon.id ? "bg-muted/50" : ""}>
                            <TableCell>
                              <Checkbox
                                checked={selectedWebtoons.includes(webtoon.id)}
                                onCheckedChange={(checked) => handleSelectWebtoon(webtoon.id, checked as boolean)}
                              />
                            </TableCell>
                            <TableCell>
                              <img
                                src={webtoon.thumbnail || "/placeholder.svg"}
                                alt={webtoon.title}
                                className="w-10 h-14 object-cover rounded-sm"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <button
                                  className="text-left font-medium hover:underline"
                                  onClick={() => setSelectedWebtoon(webtoon.id === selectedWebtoon ? null : webtoon.id)}
                                >
                                  {webtoon.title}
                                </button>
                                <div className="flex gap-1 mt-1">
                                  {webtoon.featured && (
                                    <Badge variant="outline" className="bg-primary/10 text-xs">
                                      Featured
                                    </Badge>
                                  )}
                                  {webtoon.trending && (
                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 text-xs">
                                      <TrendingUp className="mr-1 h-3 w-3" /> Trending
                                    </Badge>
                                  )}
                                  {webtoon.monetized && (
                                    <Badge variant="outline" className="bg-purple-500/10 text-purple-500 text-xs">
                                      <DollarSign className="mr-1 h-3 w-3" /> Monetized
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{webtoon.creator}</TableCell>
                            <TableCell>{getStatusBadge(webtoon.status)}</TableCell>
                            <TableCell>{webtoon.genre}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {webtoon.rating > 0 ? (
                                  <>
                                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    {webtoon.rating.toFixed(1)}
                                  </>
                                ) : (
                                  "N/A"
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{webtoon.views > 0 ? webtoon.views.toLocaleString() : "N/A"}</TableCell>
                            <TableCell>{webtoon.episodes}</TableCell>
                            <TableCell>{webtoon.lastUpdated}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => setSelectedWebtoon(webtoon.id)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Webtoon
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Manage Episodes
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    View Analytics
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Schedule Episodes
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Webtoon
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredWebtoons.length} of {mockWebtoons.length} webtoons
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Episodes for {mockWebtoons.find((w) => w.id === selectedWebtoon)?.title}</CardTitle>
                      <CardDescription>Manage episodes for this webtoon</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Episode
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead className="w-[60px]"></TableHead>
                        <TableHead>Episode</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Publish Date</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Likes</TableHead>
                        <TableHead>Comments</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEpisodes.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={10} className="h-24 text-center">
                            No episodes found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredEpisodes.map((episode) => (
                          <TableRow key={episode.id}>
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell>
                              <img
                                src={episode.thumbnail || "/placeholder.svg"}
                                alt={episode.title}
                                className="w-8 h-12 object-cover rounded-sm"
                              />
                            </TableCell>
                            <TableCell>Episode {episode.number}</TableCell>
                            <TableCell className="font-medium">{episode.title}</TableCell>
                            <TableCell>{getStatusBadge(episode.status)}</TableCell>
                            <TableCell>{episode.publishDate || "Not scheduled"}</TableCell>
                            <TableCell>{episode.views > 0 ? episode.views.toLocaleString() : "N/A"}</TableCell>
                            <TableCell>{episode.likes > 0 ? episode.likes.toLocaleString() : "N/A"}</TableCell>
                            <TableCell>{episode.comments > 0 ? episode.comments.toLocaleString() : "N/A"}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Episode
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Schedule
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    Analytics
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Episode
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Published Webtoons</CardTitle>
                <CardDescription>Manage all published webtoons that are live on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Published webtoons will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Draft Webtoons</CardTitle>
                <CardDescription>Manage all draft webtoons that are not yet published.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Draft webtoons will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trending Webtoons</CardTitle>
                <CardDescription>Webtoons that are currently trending and gaining popularity.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <TrendingUp className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Trending webtoons will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monetized" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monetized Webtoons</CardTitle>
                <CardDescription>Webtoons that are currently generating revenue.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <DollarSign className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Monetized webtoons will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Webtoon Details */}
      {selectedWebtoon && viewMode === "webtoons" && (
        <Card>
          <CardHeader>
            <CardTitle>Webtoon Details</CardTitle>
            <CardDescription>Detailed information about the selected webtoon</CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const webtoon = mockWebtoons.find((w) => w.id === selectedWebtoon)
              if (!webtoon) return null

              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={webtoon.thumbnail || "/placeholder.svg"}
                      alt={webtoon.title}
                      className="w-40 h-56 object-cover rounded-md mb-4"
                    />
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{webtoon.title}</h3>
                      <p className="text-sm text-muted-foreground">By {webtoon.creator}</p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {getStatusBadge(webtoon.status)}
                        <Badge variant="outline">{webtoon.genre}</Badge>
                        {webtoon.featured && (
                          <Badge variant="outline" className="bg-primary/10">
                            Featured
                          </Badge>
                        )}
                        {webtoon.trending && (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                            <TrendingUp className="mr-1 h-3 w-3" /> Trending
                          </Badge>
                        )}
                        {webtoon.monetized && (
                          <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                            <DollarSign className="mr-1 h-3 w-3" /> Monetized
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Episodes</p>
                        <p className="font-medium">{webtoon.episodes}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-medium flex items-center">
                          {webtoon.rating > 0 ? (
                            <>
                              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {webtoon.rating.toFixed(1)}/5.0
                            </>
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Views</p>
                        <p className="font-medium">{webtoon.views.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Subscribers</p>
                        <p className="font-medium">{webtoon.subscribers.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Updated</p>
                        <p className="font-medium">{webtoon.lastUpdated}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="font-medium">${webtoon.revenue.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
                      <div className="flex items-center gap-2">
                        <Progress value={webtoon.completionRate} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{webtoon.completionRate}%</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Quick Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => setViewMode("episodes")}>
                          <FileText className="mr-2 h-4 w-4" />
                          Manage Episodes
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Analytics
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* Scheduling and Publishing Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
          <CardDescription>Schedule and manage upcoming webtoon episodes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Upcoming Releases</h3>
            <Button size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              View Full Calendar
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Webtoon</TableHead>
                <TableHead>Episode</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>The Silent Guardian</TableCell>
                <TableCell>Episode 46: The Revelation</TableCell>
                <TableCell>May 22, 2023 - 10:00 AM</TableCell>
                <TableCell>
                  <Badge className="bg-blue-500">Scheduled</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Moonlight Sonata</TableCell>
                <TableCell>Episode 33: First Date</TableCell>
                <TableCell>May 20, 2023 - 2:00 PM</TableCell>
                <TableCell>
                  <Badge className="bg-blue-500">Scheduled</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ethereal Dreams</TableCell>
                <TableCell>Episode 29: The Awakening</TableCell>
                <TableCell>May 25, 2023 - 9:00 AM</TableCell>
                <TableCell>
                  <Badge variant="outline">Draft</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
