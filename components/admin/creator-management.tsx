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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Clock,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Star,
  BarChart3,
  TrendingUp,
  Download,
  Settings,
  FileText,
  DollarSign,
  ThumbsUp,
  Mail,
  MessageSquare,
  Shield,
  UserPlus,
  Users,
} from "lucide-react"

// Mock data for creators
const mockCreators = [
  {
    id: "cr-001",
    name: "Sarah Chen",
    username: "sarahchen",
    email: "sarah.chen@example.com",
    status: "active",
    role: "creator",
    verified: true,
    joinDate: "2022-01-15",
    followers: 45678,
    webtoons: 3,
    featured: true,
    totalViews: 2345678,
    revenue: 15600,
    engagement: 8.7,
    completionRate: 92,
    demographics: { male: 55, female: 45 },
    ageGroups: { "13-17": 20, "18-24": 40, "25-34": 30, "35+": 10 },
    trending: true,
    contentQuality: "high",
    uploadFrequency: "weekly",
    lastActive: "2023-05-15",
    contentTypes: ["Action", "Fantasy"],
    avatar: "/placeholder.svg?height=40&width=40&text=SC",
    bio: "Award-winning webtoon creator specializing in action and fantasy genres. Creating stories that inspire and entertain since 2020.",
  },
  {
    id: "cr-002",
    name: "James Wilson",
    username: "jameswilson",
    email: "james.wilson@example.com",
    status: "active",
    role: "creator",
    verified: true,
    joinDate: "2022-02-20",
    followers: 32456,
    webtoons: 2,
    featured: true,
    totalViews: 1876543,
    revenue: 12300,
    engagement: 7.5,
    completionRate: 88,
    demographics: { male: 30, female: 70 },
    ageGroups: { "13-17": 25, "18-24": 45, "25-34": 20, "35+": 10 },
    trending: false,
    contentQuality: "high",
    uploadFrequency: "bi-weekly",
    lastActive: "2023-05-14",
    contentTypes: ["Romance"],
    avatar: "/placeholder.svg?height=40&width=40&text=JW",
    bio: "Romance webtoon creator with a passion for heartfelt storytelling. Known for creating emotional and engaging character-driven narratives.",
  },
  {
    id: "cr-003",
    name: "Alex Rivera",
    username: "alexrivera",
    email: "alex.rivera@example.com",
    status: "pending",
    role: "creator",
    verified: false,
    joinDate: "2022-03-10",
    followers: 5432,
    webtoons: 1,
    featured: false,
    totalViews: 234567,
    revenue: 2100,
    engagement: 5.2,
    completionRate: 75,
    demographics: { male: 65, female: 35 },
    ageGroups: { "13-17": 15, "18-24": 35, "25-34": 35, "35+": 15 },
    trending: false,
    contentQuality: "medium",
    uploadFrequency: "monthly",
    lastActive: "2023-05-05",
    contentTypes: ["Sci-Fi"],
    avatar: "/placeholder.svg?height=40&width=40&text=AR",
    bio: "Emerging sci-fi creator with a unique vision for futuristic storytelling. Blending technology and human emotion in compelling narratives.",
  },
  {
    id: "cr-004",
    name: "Mia Johnson",
    username: "miajohnson",
    email: "mia.johnson@example.com",
    status: "active",
    role: "creator",
    verified: true,
    joinDate: "2022-01-05",
    followers: 78901,
    webtoons: 4,
    featured: true,
    totalViews: 3456789,
    revenue: 23400,
    engagement: 9.3,
    completionRate: 94,
    demographics: { male: 40, female: 60 },
    ageGroups: { "13-17": 30, "18-24": 35, "25-34": 25, "35+": 10 },
    trending: true,
    contentQuality: "high",
    uploadFrequency: "weekly",
    lastActive: "2023-05-15",
    contentTypes: ["Fantasy", "Adventure"],
    avatar: "/placeholder.svg?height=40&width=40&text=MJ",
    bio: "Fantasy and adventure webtoon creator with a knack for world-building. Creating immersive universes that captivate readers of all ages.",
  },
  {
    id: "cr-005",
    name: "David Kim",
    username: "davidkim",
    email: "david.kim@example.com",
    status: "suspended",
    role: "creator",
    verified: true,
    joinDate: "2022-02-15",
    followers: 23456,
    webtoons: 2,
    featured: false,
    totalViews: 987654,
    revenue: 7800,
    engagement: 6.8,
    completionRate: 82,
    demographics: { male: 60, female: 40 },
    ageGroups: { "13-17": 10, "18-24": 30, "25-34": 40, "35+": 20 },
    trending: false,
    contentQuality: "medium",
    uploadFrequency: "bi-weekly",
    lastActive: "2023-04-20",
    contentTypes: ["Horror"],
    avatar: "/placeholder.svg?height=40&width=40&text=DK",
    bio: "Horror webtoon creator with a dark and atmospheric style. Creating spine-chilling stories that keep readers on the edge of their seats.",
  },
]

// Mock data for creator webtoons
const mockCreatorWebtoons = [
  {
    id: "wt-001",
    creatorId: "cr-001",
    title: "The Silent Guardian",
    status: "published",
    genre: "Action",
    episodes: 45,
    views: 1245678,
    rating: 4.8,
    lastUpdated: "2023-05-15",
    thumbnail: "/placeholder.svg?height=60&width=40&text=SG",
  },
  {
    id: "wt-004",
    creatorId: "cr-001",
    title: "Ethereal Dreams",
    status: "published",
    genre: "Fantasy",
    episodes: 28,
    views: 876543,
    rating: 4.7,
    lastUpdated: "2023-05-05",
    thumbnail: "/placeholder.svg?height=60&width=40&text=ED",
  },
  {
    id: "wt-007",
    creatorId: "cr-001",
    title: "Crimson Dawn",
    status: "published",
    genre: "Action",
    episodes: 15,
    views: 456789,
    rating: 4.6,
    lastUpdated: "2023-04-28",
    thumbnail: "/placeholder.svg?height=60&width=40&text=CD",
  },
]

export function CreatorManagement() {
  const [selectedCreators, setSelectedCreators] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [verifiedFilter, setVerifiedFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"creators" | "webtoons">("creators")

  // Calculate total stats
  const totalFollowers = mockCreators.reduce((sum, creator) => sum + creator.followers, 0)
  const totalRevenue = mockCreators.reduce((sum, creator) => sum + creator.revenue, 0)
  const totalViews = mockCreators.reduce((sum, creator) => sum + creator.totalViews, 0)
  const activeCreators = mockCreators.filter((c) => c.status === "active").length
  const trendingCreators = mockCreators.filter((c) => c.trending).length

  // Filter creators based on search query and filters
  const filteredCreators = mockCreators.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || creator.status === statusFilter
    const matchesVerified =
      verifiedFilter === "all" ||
      (verifiedFilter === "verified" && creator.verified) ||
      (verifiedFilter === "unverified" && !creator.verified)
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && creator.status === "active") ||
      (activeTab === "pending" && creator.status === "pending") ||
      (activeTab === "suspended" && creator.status === "suspended") ||
      (activeTab === "trending" && creator.trending) ||
      (activeTab === "featured" && creator.featured)

    return matchesSearch && matchesStatus && matchesVerified && matchesTab
  })

  // Get webtoons for selected creator
  const filteredWebtoons = selectedCreator
    ? mockCreatorWebtoons.filter((webtoon) => webtoon.creatorId === selectedCreator)
    : []

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCreators(filteredCreators.map((creator) => creator.id))
    } else {
      setSelectedCreators([])
    }
  }

  // Handle select individual creator
  const handleSelectCreator = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCreators((prev) => [...prev, id])
    } else {
      setSelectedCreators((prev) => prev.filter((creatorId) => creatorId !== id))
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Creator Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Creator
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Creator</DialogTitle>
                <DialogDescription>
                  Enter the details for the new creator. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input id="username" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Textarea id="bio" className="col-span-3" />
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content-type" className="text-right">
                    Content Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select primary content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="action">Action</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="verified" className="text-right">
                    Verified
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch id="verified" />
                    <Label htmlFor="verified">Verify this creator</Label>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="featured" className="text-right">
                    Featured
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch id="featured" />
                    <Label htmlFor="featured">Feature this creator on the homepage</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Creator</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Dashboard Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCreators.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
            <Progress className="mt-2" value={75} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFollowers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
            <Progress className="mt-2" value={65} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Creator Revenue</CardTitle>
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
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+10.1% from last month</p>
            <Progress className="mt-2" value={70} />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Creators</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="suspended">Suspended</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "creators" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("creators")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Creators
              </Button>
              <Button
                variant={viewMode === "webtoons" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("webtoons")}
                disabled={!selectedCreator}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Webtoons
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search creators..."
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
              {selectedCreators.length > 0 && (
                <>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="verified-filter">Verification</Label>
                    <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
                      <SelectTrigger id="verified-filter" className="mt-1">
                        <SelectValue placeholder="Verification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="unverified">Unverified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sort-by">Sort By</Label>
                    <Select defaultValue="followers">
                      <SelectTrigger id="sort-by" className="mt-1">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="followers">Most Followers</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="revenue">Highest Revenue</SelectItem>
                        <SelectItem value="engagement">Highest Engagement</SelectItem>
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
            {viewMode === "creators" ? (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={selectedCreators.length === filteredCreators.length && filteredCreators.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead className="w-[250px]">
                          <div className="flex items-center cursor-pointer">
                            Creator
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Verified
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Followers
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Webtoons
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Revenue
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Engagement
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer">
                            Last Active
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCreators.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={10} className="h-24 text-center">
                            No creators found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredCreators.map((creator) => (
                          <TableRow key={creator.id} className={selectedCreator === creator.id ? "bg-muted/50" : ""}>
                            <TableCell>
                              <Checkbox
                                checked={selectedCreators.includes(creator.id)}
                                onCheckedChange={(checked) => handleSelectCreator(creator.id, checked as boolean)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                                  <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <button
                                    className="font-medium hover:underline text-left"
                                    onClick={() =>
                                      setSelectedCreator(creator.id === selectedCreator ? null : creator.id)
                                    }
                                  >
                                    {creator.name}
                                  </button>
                                  <div className="text-sm text-muted-foreground">@{creator.username}</div>
                                  <div className="flex gap-1 mt-1">
                                    {creator.featured && (
                                      <Badge variant="outline" className="bg-primary/10 text-xs">
                                        Featured
                                      </Badge>
                                    )}
                                    {creator.trending && (
                                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 text-xs">
                                        <TrendingUp className="mr-1 h-3 w-3" /> Trending
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(creator.status)}</TableCell>
                            <TableCell>
                              {creator.verified ? (
                                <Badge className="bg-blue-500">
                                  <Shield className="mr-1 h-3 w-3" /> Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline">Unverified</Badge>
                              )}
                            </TableCell>
                            <TableCell>{creator.followers.toLocaleString()}</TableCell>
                            <TableCell>{creator.webtoons}</TableCell>
                            <TableCell>${creator.revenue.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <ThumbsUp className="mr-1 h-4 w-4 text-blue-500" />
                                {creator.engagement.toFixed(1)}%
                              </div>
                            </TableCell>
                            <TableCell>{creator.lastActive}</TableCell>
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
                                  <DropdownMenuItem onClick={() => setSelectedCreator(creator.id)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Creator
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedCreator(creator.id)
                                      setViewMode("webtoons")
                                    }}
                                  >
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    View Webtoons
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    View Analytics
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Send Message
                                  </DropdownMenuItem>
                                  {!creator.verified && (
                                    <DropdownMenuItem>
                                      <Shield className="mr-2 h-4 w-4" />
                                      Verify Creator
                                    </DropdownMenuItem>
                                  )}
                                  {!creator.featured && (
                                    <DropdownMenuItem>
                                      <Star className="mr-2 h-4 w-4" />
                                      Feature Creator
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Account Settings
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Creator
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
                    Showing {filteredCreators.length} of {mockCreators.length} creators
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
                      <CardTitle>Webtoons by {mockCreators.find((c) => c.id === selectedCreator)?.name}</CardTitle>
                      <CardDescription>Manage webtoons for this creator</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Webtoon
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
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Episodes</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWebtoons.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={10} className="h-24 text-center">
                            No webtoons found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredWebtoons.map((webtoon) => (
                          <TableRow key={webtoon.id}>
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell>
                              <img
                                src={webtoon.thumbnail || "/placeholder.svg"}
                                alt={webtoon.title}
                                className="w-8 h-12 object-cover rounded-sm"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{webtoon.title}</TableCell>
                            <TableCell>
                              {webtoon.status === "published" ? (
                                <Badge className="bg-green-500">Published</Badge>
                              ) : (
                                <Badge variant="outline">Draft</Badge>
                              )}
                            </TableCell>
                            <TableCell>{webtoon.genre}</TableCell>
                            <TableCell>{webtoon.episodes}</TableCell>
                            <TableCell>{webtoon.views.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {webtoon.rating.toFixed(1)}
                              </div>
                            </TableCell>
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
                                  <DropdownMenuItem>
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
                                    Analytics
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
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Creators</CardTitle>
                <CardDescription>Manage all active creators on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Active creators will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Creators</CardTitle>
                <CardDescription>Review and approve pending creator applications.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Pending creators will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suspended" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Suspended Creators</CardTitle>
                <CardDescription>Manage creators who have been suspended from the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Suspended creators will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Featured Creators</CardTitle>
                <CardDescription>Creators highlighted on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <Star className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Featured creators will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Creator Details */}
      {selectedCreator && viewMode === "creators" && (
        <Card>
          <CardHeader>
            <CardTitle>Creator Details</CardTitle>
            <CardDescription>Detailed information about the selected creator</CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const creator = mockCreators.find((c) => c.id === selectedCreator)
              if (!creator) return null

              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                      <AvatarFallback className="text-4xl">{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-xl font-semibold">{creator.name}</h3>
                    <p className="text-sm text-muted-foreground">@{creator.username}</p>
                    <div className="flex gap-2 mt-4">
                      {creator.verified && (
                        <Badge className="bg-blue-500">
                          <Shield className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      )}
                      {creator.featured && (
                        <Badge variant="outline" className="bg-primary/10">
                          Featured
                        </Badge>
                      )}
                      {creator.trending && (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          <TrendingUp className="mr-1 h-3 w-3" /> Trending
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h4 className="font-medium">Bio</h4>
                      <p className="text-sm mt-1">{creator.bio}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium">{getStatusBadge(creator.status)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Join Date</p>
                        <p className="font-medium">{creator.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Followers</p>
                        <p className="font-medium">{creator.followers.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Webtoons</p>
                        <p className="font-medium">{creator.webtoons}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Views</p>
                        <p className="font-medium">{creator.totalViews.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="font-medium">${creator.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Upload Frequency</p>
                        <p className="font-medium capitalize">{creator.uploadFrequency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Active</p>
                        <p className="font-medium">{creator.lastActive}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-1">Content Quality</p>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={creator.contentQuality === "high" ? 90 : creator.contentQuality === "medium" ? 60 : 30}
                          className="h-2 flex-1"
                        />
                        <span className="text-sm font-medium capitalize">{creator.contentQuality}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-1">Engagement Rate</p>
                      <div className="flex items-center gap-2">
                        <Progress value={creator.engagement * 10} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{creator.engagement.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Content Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {creator.contentTypes.map((type) => (
                          <Badge key={type} variant="outline">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Quick Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => setViewMode("webtoons")}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Webtoons
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Analytics
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="mr-2 h-4 w-4" />
                          Account Settings
                        </Button>
                        {!creator.verified && (
                          <Button variant="outline" size="sm">
                            <Shield className="mr-2 h-4 w-4" />
                            Verify Creator
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* Creator Communication */}
      <Card>
        <CardHeader>
          <CardTitle>Creator Communication</CardTitle>
          <CardDescription>Manage announcements and messages to creators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Announcements</h3>
            <Button size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Platform Update: New Analytics Dashboard</TableCell>
                <TableCell>
                  <Badge className="bg-blue-500">Announcement</Badge>
                </TableCell>
                <TableCell>May 15, 2023</TableCell>
                <TableCell>All Creators</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Sent</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Creator Spotlight Program Launch</TableCell>
                <TableCell>
                  <Badge className="bg-purple-500">Program</Badge>
                </TableCell>
                <TableCell>May 10, 2023</TableCell>
                <TableCell>Verified Creators</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Sent</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Monetization Policy Updates</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-500">Policy</Badge>
                </TableCell>
                <TableCell>May 20, 2023</TableCell>
                <TableCell>All Creators</TableCell>
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
