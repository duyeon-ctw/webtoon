"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Download, Flag, ShieldAlert } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for content reports
const mockReports = [
  {
    id: "rep-001",
    contentType: "webtoon",
    contentId: "wt-001",
    contentTitle: "The Silent Guardian",
    reportedBy: "user123",
    reason: "inappropriate_content",
    details: "Contains graphic violence not suitable for younger audiences",
    status: "pending",
    dateReported: "2023-05-15",
    priority: "high",
    reportCount: 5,
    timeToResolve: null,
    assignedTo: null,
    screenshot: "/placeholder.svg?height=200&width=300&text=Screenshot",
    contentCreator: "Sarah Chen",
    contentCreatorId: "cr-001",
    reporterHistory: 2,
  },
  {
    id: "rep-002",
    contentType: "comment",
    contentId: "com-456",
    contentTitle: "Comment on 'Moonlight Sonata'",
    reportedBy: "user456",
    reason: "harassment",
    details: "User is harassing the creator with offensive comments",
    status: "pending",
    dateReported: "2023-05-14",
    priority: "medium",
    reportCount: 3,
    timeToResolve: null,
    assignedTo: "moderator1",
    screenshot: "/placeholder.svg?height=200&width=300&text=Screenshot",
    contentCreator: "James Wilson",
    contentCreatorId: "cr-002",
    reporterHistory: 1,
  },
  {
    id: "rep-003",
    contentType: "webtoon",
    contentId: "wt-003",
    contentTitle: "Cyber Nexus",
    reportedBy: "user789",
    reason: "copyright_violation",
    details: "Content appears to be copied from another creator's work",
    status: "pending",
    dateReported: "2023-05-13",
    priority: "high",
    reportCount: 7,
    timeToResolve: null,
    assignedTo: "moderator2",
    screenshot: "/placeholder.svg?height=200&width=300&text=Screenshot",
    contentCreator: "Alex Rivera",
    contentCreatorId: "cr-003",
    reporterHistory: 0,
  },
  {
    id: "rep-004",
    contentType: "user",
    contentId: "usr-789",
    contentTitle: "User Profile: baduser123",
    reportedBy: "user234",
    reason: "impersonation",
    details: "This user is impersonating a well-known creator",
    status: "resolved",
    dateReported: "2023-05-12",
    priority: "medium",
    reportCount: 4,
    timeToResolve: "2h 15m",
    assignedTo: "moderator1",
    screenshot: "/placeholder.svg?height=200&width=300&text=Screenshot",
    contentCreator: "N/A",
    contentCreatorId: null,
    reporterHistory: 3,
    resolution: "account_suspended",
    resolutionNotes: "Account suspended for 30 days for impersonation",
  },
  {
    id: "rep-005",
    contentType: "comment",
    contentId: "com-789",
    contentTitle: "Comment on 'Urban Legends'",
    reportedBy: "user567",
    reason: "spam",
    details: "User is posting spam links in comments",
    status: "resolved",
    dateReported: "2023-05-11",
    priority: "low",
    reportCount: 2,
    timeToResolve: "45m",
    assignedTo: "moderator3",
    screenshot: "/placeholder.svg?height=200&width=300&text=Screenshot",
    contentCreator: "David Kim",
    contentCreatorId: "cr-005",
    reporterHistory: 1,
    resolution: "content_removed",
    resolutionNotes: "Comment removed for containing spam links",
  },
  {
    id: "rep-006",
    contentType: "webtoon",
    contentId: "wt-006",
    contentTitle: "Chronicles of Valor",
    reportedBy: "user890",
    reason: "inappropriate_content",
    details: "Contains adult content without proper age restriction",
    status: "rejected",
    dateReported: "2023-05-10",
    priority: "high",
    reportCount: 1,
    timeToResolve: "1h 30m",
    assignedTo: "moderator2",
    screenshot: "/placeholder.svg?height=200&width=300&text=Screenshot",
    contentCreator: "Emma Thompson",
    contentCreatorId: "cr-006",
    reporterHistory: 5,
    resolution: "no_violation",
    resolutionNotes: "Content is properly age-restricted and follows platform guidelines",
  },
  {
    id: "rep-007",
    contentType: "user",
    contentId: "usr-456",
    contentTitle: "User Profile: spammer456",
    reportedBy: "user123",
    reason: "spam",
    details: "User is spamming promotional content across the platform",
    status: "pending",
    dateReported: "2023-05-09",
    priority: "medium",
    reportCount: 8,
    timeToResolve: null,
    assignedTo: null,
    screenshot: "/placeholder.svg?height=200&width=300&text=Screenshot",
    contentCreator: "N/A",
    contentCreatorId: null,
    reporterHistory: 2,
  },
]

// Mock data for moderation team
const moderationTeam = [
  {
    id: "moderator1",
    name: "John Smith",
    role: "Senior Moderator",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
  },
  {
    id: "moderator2",
    name: "Emily Davis",
    role: "Content Moderator",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
  },
  {
    id: "moderator3",
    name: "Michael Wong",
    role: "Community Moderator",
    avatar: "/placeholder.svg?height=40&width=40&text=MW",
  },
  {
    id: "moderator4",
    name: "Sophia Garcia",
    role: "Junior Moderator",
    avatar: "/placeholder.svg?height=40&width=40&text=SG",
  },
]

// Mock data for moderation stats
const moderationStats = {
  totalReports: mockReports.length,
  pendingReports: mockReports.filter((r) => r.status === "pending").length,
  resolvedReports: mockReports.filter((r) => r.status === "resolved").length,
  rejectedReports: mockReports.filter((r) => r.status === "rejected").length,
  avgTimeToResolve: "1h 20m",
  reportsByType: {
    webtoon: mockReports.filter((r) => r.contentType === "webtoon").length,
    comment: mockReports.filter((r) => r.contentType === "comment").length,
    user: mockReports.filter((r) => r.contentType === "user").length,
  },
  reportsByReason: {
    inappropriate_content: mockReports.filter((r) => r.reason === "inappropriate_content").length,
    harassment: mockReports.filter((r) => r.reason === "harassment").length,
    copyright_violation: mockReports.filter((r) => r.reason === "copyright_violation").length,
    impersonation: mockReports.filter((r) => r.reason === "impersonation").length,
    spam: mockReports.filter((r) => r.reason === "spam").length,
  },
}

export default function ContentModerationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
    key: "dateReported",
    direction: "desc",
  })
  const [activeTab, setActiveTab] = useState("all")
  const [dateRange, setDateRange] = useState("last30days")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  // Filter reports based on search query and filters
  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.contentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesType = typeFilter === "all" || report.contentType === typeFilter
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter
    const matchesTab = 
      (activeTab === "all") || 
      (activeTab === "pending" && report.status === "pending") ||
      (activeTab === "resolved" && report.status === "resolved") ||
      (activeTab === "rejected" && report.status === "rejected")

    return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesTab
  })

  // Sort reports
  const sortedReports = [...filteredReports].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof typeof a]
    const bValue = b[sortConfig.key as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    } else {
      return sortConfig.direction === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    }
  })

  // Handle sort
  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Get reason badge
  const getReasonBadge = (reason: string) => {
    switch (reason) {
      case "inappropriate_content":
        return <Badge className="bg-red-500">Inappropriate Content</Badge>
      case "harassment":
        return <Badge className="bg-orange-500">Harassment</Badge>
      case "copyright_violation":
        return <Badge className="bg-purple-500">Copyright Violation</Badge>
      case "impersonation":
        return <Badge className="bg-blue-500">Impersonation</Badge>
      case "spam":
        return <Badge className="bg-yellow-500">Spam</Badge>
      default:
        return <Badge variant="outline">{reason}</Badge>
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
            Pending
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            Resolved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  // Get resolution badge
  const getResolutionBadge = (resolution: string) => {
    switch (resolution) {
      case "content_removed":
        return <Badge className="bg-red-500">Content Removed</Badge>
      case "account_suspended":
        return <Badge className="bg-orange-500">Account Suspended</Badge>
      case "warning_issued":
        return <Badge className="bg-yellow-500">Warning Issued</Badge>
      case "no_violation":
        return <Badge className="bg-blue-500">No Violation</Badge>
      default:
        return <Badge variant="outline">{resolution}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Content Moderation</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button size="sm">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Moderation Guidelines
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.totalReports}</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            <Progress className="mt-2" value={75} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.pendingReports}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
            <Progress className="mt-2" value={45} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <AlertCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.resolvedReports}</div>
            <p className="text-xs text-muted-foreground">Issues addressed</p>
            <Progress className="mt-2" value={35} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.avgTimeToResolve}</div>
            <p className="text-xs text-muted-foreground">-10min from last week</p>
            <Progress className="mt-2" value={65} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
  }
