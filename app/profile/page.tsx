"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "../../components/auth-provider"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Textarea } from "../../components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { BookOpen, Camera, Edit, Mail, User, Trash2 } from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog"
import { Switch } from "../../components/ui/switch"

export default function ProfilePage() {
  const { user, updateProfile, signOut, deleteUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "No bio yet.",
    language: "en",
    theme: "system",
    notificationPreferences: {
      newEpisodes: true,
      comments: true,
      announcements: true,
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/signin")
      return
    }

    setProfileData({
      name: user.name,
      email: user.email,
      bio: "No bio yet.", // This would come from the user object in a real app
      language: "en", // Default language
      theme: "system", // Default theme
      notificationPreferences: {
        newEpisodes: true,
        comments: true,
        announcements: true,
      }
    })
  }, [user, router])

  const handleSaveProfile = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      await updateProfile({
        name: profileData.name,
        // In a real app, you'd update more fields
      })

      setIsEditing(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!user) return

    setIsDeleting(true)
    try {
      await deleteUser(user.id)
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      })
      await signOut()
      router.push("/")
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Profile</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full">
                      <Image
                        src={user.avatar || "/placeholder.svg?height=128&width=128"}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                      disabled={!isEditing}
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change avatar</span>
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="mt-2 flex items-center">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
                      {user.role}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete Account"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={true} // Email changes might require verification
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell us about yourself"
                  />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="preferences" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="preferences" className="flex-1">
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="security" className="flex-1">
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex-1">
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select 
                        disabled={!isEditing}
                        value={profileData.language}
                        onValueChange={(value) => setProfileData({ ...profileData, language: value })}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ko">Korean</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="id">Indonesian</SelectItem>
                          <SelectItem value="th">Thai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme Preference</Label>
                      <Select 
                        disabled={!isEditing}
                        value={profileData.theme}
                        onValueChange={(value) => setProfileData({ ...profileData, theme: value })}
                      >
                        <SelectTrigger id="theme">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">System Default</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" disabled={!isEditing} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={!isEditing}>
                      Update Password
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-y-0">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify-episodes">New Episodes</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when new episodes are published for series you follow
                        </p>
                      </div>
                      <Switch 
                        id="notify-episodes" 
                        disabled={!isEditing}
                        checked={profileData.notificationPreferences.newEpisodes}
                        onCheckedChange={(checked) => setProfileData({
                          ...profileData,
                          notificationPreferences: {
                            ...profileData.notificationPreferences,
                            newEpisodes: checked
                          }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between space-y-0">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify-comments">Comments</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for replies to your comments
                        </p>
                      </div>
                      <Switch 
                        id="notify-comments" 
                        disabled={!isEditing}
                        checked={profileData.notificationPreferences.comments}
                        onCheckedChange={(checked) => setProfileData({
                          ...profileData,
                          notificationPreferences: {
                            ...profileData.notificationPreferences,
                            comments: checked
                          }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between space-y-0">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify-announcements">Announcements</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for platform announcements and updates
                        </p>
                          </div>
                      <Switch 
                        id="notify-announcements" 
                        disabled={!isEditing}
                        checked={profileData.notificationPreferences.announcements}
                        onCheckedChange={(checked) => setProfileData({
                          ...profileData,
                          notificationPreferences: {
                            ...profileData.notificationPreferences,
                            announcements: checked
                          }
                        })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
