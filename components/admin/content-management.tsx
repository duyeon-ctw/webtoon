"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Clock,
  Calendar,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for webtoons
const webtoons = [
  {
    id: 1,
    title: "The Silent Guardian",
    author: "Sarah Chen",
    genre: "Action",
    episodes: 45,
    status: "published",
    lastUpdated: "2023-05-10",
    views: 1250000,
    rating: 4.8,
    thumbnail: "/placeholder.svg?height=80&width=60",
  },
  {
    id: 2,
    title: "Love in Bloom",
    author: "Michael Park",
    genre: "Romance",
    episodes: 32,
    status: "published",
    lastUpdated: "2023-05-08",
    views: 980000,
    rating: 4.6,
    thumbnail: "/placeholder.svg?height=80&width=60",
  },
  {
    id: 3,
    title: "Mystic Academy",
    author: "Emma Johnson",
    genre: "Fantasy",
    episodes: 28,
    status: "published",
    lastUpdated: "2023-05-05",
    views: 870000,
    rating: 4.7,
    thumbnail: "/placeholder.svg?height=80&width=60",
  },
  {
    id: 4,
    title: "Urban Legends",
    author: "David Kim",
    genre: "Horror",
    episodes: 15,
    status: "draft",
    lastUpdated: "2023-05-02",
    views: 0,
    rating: 0,
    thumbnail: "/placeholder.svg?height=80&width=60",
  },
  {
    id: 5,
    title: "Cosmic Odyssey",
    author: "Alex Wong",
    genre: "Sci-Fi",
    episodes: 22,
    status: "review",
    lastUpdated: "2023-05-01",
    views: 450000,
    rating: 4.5,
    thumbnail: "/placeholder.svg?height=80&width=60",
  },
]

export function ContentManagement() {
  const [selectedWebtoons, setSelectedWebtoons] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSelectAll = () => {
    if (selectedWebtoons.length === webtoons.length) {
      setSelectedWebtoons([])
    } else {
      setSelectedWebtoons(webtoons.map((w) => w.id))
    }
  }

  const toggleSelect = (id: number) => {
    if (selectedWebtoons.includes(id)) {
      setSelectedWebtoons(selectedWebtoons.filter((wId) => wId !== id))
    } else {
      setSelectedWebtoons([...selectedWebtoons, id])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "review":
        return <Badge className="bg-yellow-500">In Review</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Content Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Webtoon
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webtoons</CardTitle>
          <CardDescription>Manage all webtoons on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search webtoons..."
                    className="pl-8 w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {selectedWebtoons.length > 0 && (
                  <>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Publish
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </>
                )}
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedWebtoons.length === webtoons.length && webtoons.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-16"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Episodes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Views
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webtoons.map((webtoon) => (
                    <TableRow key={webtoon.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedWebtoons.includes(webtoon.id)}
                          onCheckedChange={() => toggleSelect(webtoon.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <img
                          src={webtoon.thumbnail || "/placeholder.svg"}
                          alt={webtoon.title}
                          className="w-10 h-14 object-cover rounded-sm"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{webtoon.title}</TableCell>
                      <TableCell>{webtoon.author}</TableCell>
                      <TableCell>{webtoon.genre}</TableCell>
                      <TableCell>{webtoon.episodes}</TableCell>
                      <TableCell>{getStatusBadge(webtoon.status)}</TableCell>
                      <TableCell>{webtoon.lastUpdated}</TableCell>
                      <TableCell>{webtoon.views.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {webtoon.rating > 0 ? webtoon.rating : "-"}
                          {webtoon.rating > 0 && (
                            <div className="ml-2 w-16">
                              <Progress value={webtoon.rating * 20} className="h-2" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>5</strong> of <strong>25</strong> webtoons
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Content Schedule</CardTitle>
            <CardDescription>Upcoming and scheduled releases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-2 hover:bg-muted rounded-md">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Episode {i + 20} Release</h4>
                    <p className="text-sm text-muted-foreground">The Silent Guardian • {i} days from now</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Health</CardTitle>
            <CardDescription>Status of your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Published Content</h4>
                  <p className="text-sm text-muted-foreground">3 webtoons • 105 episodes</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">In Review</h4>
                  <p className="text-sm text-muted-foreground">1 webtoon • 5 episodes</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Drafts</h4>
                  <p className="text-sm text-muted-foreground">1 webtoon • 3 episodes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
