"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  UserPlus,
  Shield,
  Ban,
  Mail,
  Eye,
  ArrowUpDown,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface User {
  id: string
  username: string
  email: string
  role: string
  status: string
  joinDate: Date
  lastActive: Date
}

const users: User[] = [
  {
    id: "1",
    username: "john_doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    joinDate: new Date("2024-01-01"),
    lastActive: new Date("2024-03-20"),
  },
  {
    id: "2",
    username: "jane_smith",
    email: "jane@example.com",
    role: "creator",
    status: "active",
    joinDate: new Date("2024-02-01"),
    lastActive: new Date("2024-03-19"),
  },
  // Add more mock data as needed
]

export function UserManagement() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map((u) => u.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((uId) => uId !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>
      case "moderator":
        return <Badge className="bg-blue-500">Moderator</Badge>
      case "creator":
        return <Badge className="bg-green-500">Creator</Badge>
      default:
        return <Badge variant="outline">User</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSubscriptionBadge = (status: string) => {
    switch (status) {
      case "premium":
        return <Badge className="bg-amber-500">Premium</Badge>
      case "free":
        return <Badge variant="outline">Free</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">User Management</h2>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold">24,532</h3>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Premium Subscribers</p>
                <h3 className="text-2xl font-bold">8,245</h3>
                <p className="text-xs text-green-500">+8% from last month</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged Accounts</p>
                <h3 className="text-2xl font-bold">42</h3>
                <p className="text-xs text-red-500">+5 new this week</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
          <TabsTrigger value="moderators">Moderators</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search users..."
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
                    {selectedUsers.length > 0 && (
                      <>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Ban className="h-4 w-4 mr-2" />
                          Suspend
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
                        <SelectItem value="active">Most Active</SelectItem>
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
                            checked={selectedUsers.length === users.length && users.length > 0}
                            onCheckedChange={toggleSelectAll}
                          />
                        </TableHead>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Last Active
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={() => toggleSelect(user.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.username} />
                              <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{getSubscriptionBadge(user.status)}</TableCell>
                          <TableCell>{user.joinDate.toLocaleDateString()}</TableCell>
                          <TableCell>{user.lastActive.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Change Role
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500 hover:text-red-600">
                                  <Ban className="h-4 w-4 mr-2" />
                                  Suspend User
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
                    Showing <strong>5</strong> of <strong>24,532</strong> users
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
        </TabsContent>

        {/* Other tab contents would be similar but with filtered data */}
        <TabsContent value="creators" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Creator users would be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
