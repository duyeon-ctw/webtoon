"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Loader2, 
  Search, 
  Trash2,
  BookOpen,
  MessageSquare,
  Megaphone,
  Sparkles,
  Bell
} from "lucide-react"
import { NotificationService, Notification } from "@/lib/services/notification-service"
import { formatDate, getRelativeTime } from "@/lib/utils"
import Link from "next/link"

export function NotificationList() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [readFilter, setReadFilter] = useState<string>("all")

  // Load notifications when component mounts or user changes
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) {
        setNotifications([])
        setFilteredNotifications([])
        return
      }

      setIsLoading(true)
      setError(null)
      try {
        const userNotifications = await NotificationService.getUserNotifications(user.id)
        setNotifications(userNotifications)
        applyFilters(userNotifications, searchQuery, typeFilter, readFilter)
      } catch (err) {
        setError("Failed to load notifications")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [user])

  // Apply filters to notifications
  const applyFilters = (
    notifs: Notification[], 
    query: string, 
    type: string, 
    read: string
  ) => {
    let filtered = [...notifs]
    
    // Apply search filter
    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(
        n => n.title.toLowerCase().includes(lowercaseQuery) || 
             n.message.toLowerCase().includes(lowercaseQuery)
      )
    }
    
    // Apply type filter
    if (type !== "all") {
      filtered = filtered.filter(n => n.type === type)
    }
    
    // Apply read filter
    if (read === "read") {
      filtered = filtered.filter(n => n.isRead)
    } else if (read === "unread") {
      filtered = filtered.filter(n => !n.isRead)
    }
    
    setFilteredNotifications(filtered)
  }

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    applyFilters(notifications, query, typeFilter, readFilter)
  }

  // Handle type filter change
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value)
    applyFilters(notifications, searchQuery, value, readFilter)
  }

  // Handle read filter change
  const handleReadFilterChange = (value: string) => {
    setReadFilter(value)
    applyFilters(notifications, searchQuery, typeFilter, value)
  }

  // Mark notification as read
  const handleMarkAsRead = async (notificationId: string) => {
    if (!user) return

    try {
      const updatedNotification = await NotificationService.markAsRead(user.id, notificationId)
      if (updatedNotification) {
        setNotifications(prevNotifications => 
          prevNotifications.map(n => 
            n.id === notificationId ? { ...n, isRead: true } : n
          )
        )
        applyFilters(
          notifications.map(n => n.id === notificationId ? { ...n, isRead: true } : n),
          searchQuery,
          typeFilter,
          readFilter
        )
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err)
    }
  }

  // Delete notification
  const handleDeleteNotification = async (notificationId: string) => {
    if (!user) return

    try {
      const success = await NotificationService.deleteNotification(user.id, notificationId)
      if (success) {
        const updatedNotifications = notifications.filter(n => n.id !== notificationId)
        setNotifications(updatedNotifications)
        applyFilters(updatedNotifications, searchQuery, typeFilter, readFilter)
      }
    } catch (err) {
      console.error("Failed to delete notification:", err)
    }
  }

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    if (!user) return

    try {
      const success = await NotificationService.markAllAsRead(user.id)
      if (success) {
        const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }))
        setNotifications(updatedNotifications)
        applyFilters(updatedNotifications, searchQuery, typeFilter, readFilter)
      }
    } catch (err) {
      console.error("Failed to mark all as read:", err)
    }
  }

  // Get icon for notification based on type
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "episode_update":
        return <BookOpen className="h-5 w-5 text-blue-500" />
      case "comment_reply":
      case "comment_like":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "announcement":
        return <Megaphone className="h-5 w-5 text-purple-500" />
      case "recommendation":
        return <Sparkles className="h-5 w-5 text-amber-500" />
      case "subscription":
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          Please sign in to view your notifications.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notifications..."
            className="pl-9"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-2">
          <Select 
            value={typeFilter} 
            onValueChange={handleTypeFilterChange}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="episode_update">Episodes</SelectItem>
              <SelectItem value="comment_reply">Comment Replies</SelectItem>
              <SelectItem value="comment_like">Comment Likes</SelectItem>
              <SelectItem value="announcement">Announcements</SelectItem>
              <SelectItem value="recommendation">Recommendations</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={readFilter} 
            onValueChange={handleReadFilterChange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllAsRead}
          disabled={!notifications.some(n => !n.isRead)}
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      {/* Notifications list */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="py-12 flex flex-col items-center justify-center text-center">
            <Bell className="h-12 w-12 mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No notifications found</h3>
            <p className="text-muted-foreground">
              {searchQuery || typeFilter !== 'all' || readFilter !== 'all' 
                ? "Try changing your filters to see more notifications"
                : "You don't have any notifications at the moment"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`relative overflow-hidden ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div className="flex-1">
                        <h3 className="font-medium text-base line-clamp-1">{notification.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                          <span>{formatDate(notification.createdAt)}</span>
                          <span>•</span>
                          <span>{getRelativeTime(notification.createdAt)}</span>
                        </div>
                      </div>
                      
                      {!notification.isRead && (
                        <Badge variant="default" className="bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm mt-3">{notification.message}</p>
                    
                    <div className="flex justify-between items-center mt-4">
                      {notification.link ? (
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="px-0 h-auto"
                          asChild
                          onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                        >
                          <Link href={notification.link}>
                            View details
                          </Link>
                        </Button>
                      ) : (
                        <div></div>
                      )}
                      
                      <div className="flex gap-2">
                        {!notification.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as read
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 