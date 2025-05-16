"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Bell, 
  BellOff, 
  Check, 
  ChevronRight, 
  Clock, 
  MailWarning, 
  MessageSquare, 
  Settings, 
  Trash2,
  BookOpen,
  Megaphone,
  Sparkles
} from "lucide-react"
import { NotificationService, Notification } from "@/lib/services/notification-service"
import { formatDate, getRelativeTime } from "@/lib/utils"
import Link from "next/link"

export function NotificationCenter() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [isOpen, setIsOpen] = useState(false)

  // Load notifications when component mounts or user changes
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) {
        setNotifications([])
        setUnreadCount(0)
        return
      }

      setIsLoading(true)
      setError(null)
      try {
        const userNotifications = await NotificationService.getUserNotifications(user.id)
        setNotifications(userNotifications)
        setUnreadCount(userNotifications.filter(n => !n.isRead).length)
      } catch (err) {
        setError("Failed to load notifications")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [user])

  // Mark notification as read when clicked
  const handleNotificationClick = async (notification: Notification) => {
    if (notification.isRead) return

    try {
      await NotificationService.markAsRead(user!.id, notification.id)
      setNotifications(prevNotifications => 
        prevNotifications.map(n => 
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      console.error("Failed to mark notification as read:", err)
    }
  }

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    if (!user) return

    try {
      await NotificationService.markAllAsRead(user.id)
      setNotifications(prevNotifications => 
        prevNotifications.map(n => ({ ...n, isRead: true }))
      )
      setUnreadCount(0)
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err)
    }
  }

  // Delete a notification
  const handleDeleteNotification = async (notificationId: string) => {
    if (!user) return

    try {
      const success = await NotificationService.deleteNotification(user.id, notificationId)
      if (success) {
        const deletedNotification = notifications.find(n => n.id === notificationId)
        setNotifications(prevNotifications => 
          prevNotifications.filter(n => n.id !== notificationId)
        )
        if (deletedNotification && !deletedNotification.isRead) {
          setUnreadCount(prev => Math.max(0, prev - 1))
        }
      }
    } catch (err) {
      console.error("Failed to delete notification:", err)
    }
  }

  // Filter notifications based on the active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    if (activeTab === "episodes") return notification.type === "episode_update"
    if (activeTab === "comments") return notification.type === "comment_reply" || notification.type === "comment_like"
    if (activeTab === "announcements") return notification.type === "announcement"
    return true
  })

  // Get icon for notification based on type
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "episode_update":
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case "comment_reply":
      case "comment_like":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "announcement":
        return <Megaphone className="h-4 w-4 text-purple-500" />
      case "recommendation":
        return <Sparkles className="h-4 w-4 text-amber-500" />
      case "subscription":
        return <Check className="h-4 w-4 text-emerald-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  if (!user) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Bell className="h-5 w-5 text-muted-foreground" />
      </Button>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7" 
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Mark all as read</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7" 
              asChild
            >
              <Link href="/account/notifications">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Notification settings</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full p-0 bg-transparent border-b rounded-none h-10">
            <TabsTrigger 
              value="all" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="unread" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Unread
            </TabsTrigger>
            <TabsTrigger 
              value="episodes" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Episodes
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[320px]">
            <TabsContent value={activeTab} className="m-0 p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Clock className="h-5 w-5 mr-2 animate-spin text-muted-foreground" />
                  <span className="text-muted-foreground">Loading notifications...</span>
                </div>
              ) : error ? (
                <Alert variant="destructive" className="m-2">
                  <MailWarning className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : filteredNotifications.length === 0 ? (
                <div className="flex flex-col justify-center items-center py-12">
                  <BellOff className="h-10 w-10 mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              ) : (
                <div>
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`
                        p-3 border-b last:border-b-0 hover:bg-muted/50 relative
                        ${notification.isRead ? '' : 'bg-primary/5'}
                      `}
                    >
                      <Link 
                        href={notification.link || '#'} 
                        className="block"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm line-clamp-1">{notification.title}</div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {getRelativeTime(notification.createdAt)}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 opacity-0 group-hover:opacity-100 absolute top-2 right-2"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleDeleteNotification(notification.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
        
        <div className="p-2 border-t">
          <Button variant="outline" className="w-full" size="sm" asChild>
            <Link href="/account/notifications" onClick={() => setIsOpen(false)}>
              View All Notifications
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
} 