"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Loader2, 
  AlertCircle, 
  Bell, 
  Mail, 
  MessageSquare, 
  Megaphone, 
  Sparkles, 
  BookOpen 
} from "lucide-react"
import { NotificationService, NotificationPreferences } from "@/lib/services/notification-service"

export function NotificationSettings() {
  const { user } = useAuth()
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Load notification preferences on mount
  useEffect(() => {
    const loadPreferences = async () => {
      if (!user) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        const userPreferences = await NotificationService.getUserNotificationPreferences(user.id)
        setPreferences(userPreferences)
      } catch (err) {
        setError("Failed to load notification preferences")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadPreferences()
  }, [user])

  // Handle preference toggle
  const handlePreferenceChange = async (key: keyof NotificationPreferences, value: boolean) => {
    if (!user || !preferences) return
    
    // Optimistically update UI
    setPreferences(prev => prev ? { ...prev, [key]: value } : null)
    
    // Save to backend
    setIsSaving(true)
    setSaveSuccess(false)
    setError(null)
    
    try {
      await NotificationService.updateNotificationPreferences(user.id, { [key]: value })
      setSaveSuccess(true)
      
      // Hide success message after a delay
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      setError("Failed to update preferences")
      console.error(err)
      
      // Revert optimistic update on error
      setPreferences(prev => prev ? { ...prev, [key]: !value } : null)
    } finally {
      setIsSaving(false)
    }
  }

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          Please sign in to manage your notification preferences.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Notification Preferences</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {saveSuccess && (
        <Alert className="mb-6 border-green-300 bg-green-50">
          <Bell className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Preferences Saved</AlertTitle>
          <AlertDescription className="text-green-700">
            Your notification preferences have been updated successfully.
          </AlertDescription>
        </Alert>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : preferences ? (
        <Tabs defaultValue="notification-types">
          <TabsList className="mb-6">
            <TabsTrigger value="notification-types">Notification Types</TabsTrigger>
            <TabsTrigger value="delivery-methods">Delivery Methods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notification-types" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Updates</CardTitle>
                <CardDescription>
                  Notifications about new episodes and content from series you follow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="font-medium">New Episodes</div>
                      <div className="text-sm text-muted-foreground">Get notified when new episodes are released for webtoons you follow</div>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.episodeUpdates}
                    onCheckedChange={(checked) => handlePreferenceChange('episodeUpdates', checked)}
                    disabled={isSaving}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Megaphone className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="font-medium">Creator Announcements</div>
                      <div className="text-sm text-muted-foreground">Get notified about announcements from creators you follow</div>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.creatorAnnouncements}
                    onCheckedChange={(checked) => handlePreferenceChange('creatorAnnouncements', checked)}
                    disabled={isSaving}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Social Interactions</CardTitle>
                <CardDescription>
                  Notifications about comments and interactions with other users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="font-medium">Comment Replies</div>
                      <div className="text-sm text-muted-foreground">Get notified when someone replies to your comments</div>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.commentReplies}
                    onCheckedChange={(checked) => handlePreferenceChange('commentReplies', checked)}
                    disabled={isSaving}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="font-medium">Comment Likes</div>
                      <div className="text-sm text-muted-foreground">Get notified when someone likes your comments</div>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.commentLikes}
                    onCheckedChange={(checked) => handlePreferenceChange('commentLikes', checked)}
                    disabled={isSaving}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommendations & Marketing</CardTitle>
                <CardDescription>
                  Notifications about recommendations and special offers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <div>
                      <div className="font-medium">Personalized Recommendations</div>
                      <div className="text-sm text-muted-foreground">Get notified about webtoons you might enjoy based on your reading history</div>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.recommendations}
                    onCheckedChange={(checked) => handlePreferenceChange('recommendations', checked)}
                    disabled={isSaving}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="font-medium">Marketing Emails</div>
                      <div className="text-sm text-muted-foreground">Receive emails about special offers, events, and new features</div>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
                    disabled={isSaving}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="delivery-methods" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Delivery</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                    disabled={isSaving}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive push notifications in your browser or app</div>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
                    disabled={isSaving}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : null}
    </div>
  )
} 