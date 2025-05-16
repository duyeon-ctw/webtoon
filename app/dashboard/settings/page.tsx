"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import { Separator } from "@/components/ui/separator"
import { Bell, CreditCard, Lock, Moon, Shield, User } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Comic enthusiast and aspiring artist. I love sci-fi and fantasy genres!",
    username: user?.username || "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newEpisodes: true,
    comments: true,
    messages: true,
    updates: false,
    marketing: false,
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    fontSize: "medium",
    reduceAnimations: false,
    highContrast: false,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account">
            <Lock className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Moon className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information and how others see you on the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user?.name || "User"} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">
                    This will be displayed on your profile and in comments
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Upload New
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={profileForm.name} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" value={profileForm.username} onChange={handleProfileChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={profileForm.email} onChange={handleProfileChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={profileForm.bio} onChange={handleProfileChange} rows={4} />
                <p className="text-xs text-muted-foreground">
                  Brief description for your profile. Maximum 200 characters.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>Manage how your profile appears to others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Show Reading Activity</h3>
                  <p className="text-sm text-muted-foreground">Allow others to see what comics you're reading</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Show Favorites</h3>
                  <p className="text-sm text-muted-foreground">Allow others to see your favorite comics</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Show Comments</h3>
                  <p className="text-sm text-muted-foreground">Allow others to see your comments on comics</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security and authentication methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Enable Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage accounts connected to your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.258 1H2.742C1.781 1 1 1.781 1 2.742v18.516C1 22.219 1.781 23 2.742 23h18.516c.961 0 1.742-.781 1.742-1.742V2.742C24 1.781 23.219 1 22.258 1zM8.71 19.75H5.9V9.237h2.81V19.75zM7.305 8.324c-.9 0-1.63-.737-1.63-1.644 0-.908.73-1.645 1.63-1.645.902 0 1.632.737 1.632 1.645 0 .907-.73 1.644-1.632 1.644zm12.447 11.426h-2.807v-5.198c0-1.16-.423-1.95-1.483-1.95-.81 0-1.293.543-1.506 1.067-.077.187-.097.448-.097.71v5.371H11.05V9.237h2.808v1.21c.428-.57 1.097-1.383 2.67-1.383 1.95 0 3.415 1.273 3.415 4.005v6.68z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">Not Connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <p className="text-sm text-muted-foreground">Connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions that affect your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-destructive/20 p-4">
                <h3 className="font-medium text-destructive">Delete Account</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button variant="destructive" size="sm" className="mt-4">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">New Episodes</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new episodes of comics you follow are released
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.newEpisodes}
                  onCheckedChange={() => toggleNotification("newEpisodes")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Comments</h3>
                  <p className="text-sm text-muted-foreground">Get notified when someone replies to your comments</p>
                </div>
                <Switch
                  checked={notificationSettings.comments}
                  onCheckedChange={() => toggleNotification("comments")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Messages</h3>
                  <p className="text-sm text-muted-foreground">Get notified when you receive a new message</p>
                </div>
                <Switch
                  checked={notificationSettings.messages}
                  onCheckedChange={() => toggleNotification("messages")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Platform Updates</h3>
                  <p className="text-sm text-muted-foreground">Get notified about new features and platform updates</p>
                </div>
                <Switch checked={notificationSettings.updates} onCheckedChange={() => toggleNotification("updates")} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Marketing</h3>
                  <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                </div>
                <Switch
                  checked={notificationSettings.marketing}
                  onCheckedChange={() => toggleNotification("marketing")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Delivery</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="push-notifications" defaultChecked />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="in-app-notifications" defaultChecked />
                  <Label htmlFor="in-app-notifications">In-App</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    className={`flex h-16 flex-col items-center justify-center gap-1 ${
                      appearanceSettings.theme === "light" ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => setAppearanceSettings((prev) => ({ ...prev, theme: "light" }))}
                  >
                    <div className="h-6 w-6 rounded-full bg-background border"></div>
                    <span className="text-xs">Light</span>
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex h-16 flex-col items-center justify-center gap-1 ${
                      appearanceSettings.theme === "dark" ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => setAppearanceSettings((prev) => ({ ...prev, theme: "dark" }))}
                  >
                    <div className="h-6 w-6 rounded-full bg-black"></div>
                    <span className="text-xs">Dark</span>
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex h-16 flex-col items-center justify-center gap-1 ${
                      appearanceSettings.theme === "system" ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => setAppearanceSettings((prev) => ({ ...prev, theme: "system" }))}
                  >
                    <div className="flex h-6 w-6">
                      <div className="h-6 w-3 rounded-l-full bg-background border-y border-l"></div>
                      <div className="h-6 w-3 rounded-r-full bg-black border-y border-r"></div>
                    </div>
                    <span className="text-xs">System</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select
                  value={appearanceSettings.fontSize}
                  onValueChange={(value) => setAppearanceSettings((prev) => ({ ...prev, fontSize: value }))}
                >
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Reduce Animations</h3>
                  <p className="text-sm text-muted-foreground">Minimize motion effects throughout the interface</p>
                </div>
                <Switch
                  checked={appearanceSettings.reduceAnimations}
                  onCheckedChange={(checked) =>
                    setAppearanceSettings((prev) => ({ ...prev, reduceAnimations: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">High Contrast</h3>
                  <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
                </div>
                <Switch
                  checked={appearanceSettings.highContrast}
                  onCheckedChange={(checked) => setAppearanceSettings((prev) => ({ ...prev, highContrast: checked }))}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reading Experience</CardTitle>
              <CardDescription>Customize how comics are displayed when reading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reading-mode">Reading Mode</Label>
                <Select defaultValue="vertical">
                  <SelectTrigger id="reading-mode">
                    <SelectValue placeholder="Select reading mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vertical">Vertical Scroll</SelectItem>
                    <SelectItem value="horizontal">Horizontal Swipe</SelectItem>
                    <SelectItem value="page">Page by Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Auto-advance</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically advance to the next episode when finished
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Free Plan</h3>
                    <p className="text-sm text-muted-foreground">Basic access to comics with ads</p>
                  </div>
                  <Badge>Current Plan</Badge>
                </div>
              </div>

              <div className="rounded-lg border border-dashed p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Premium Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Ad-free experience with early access to new episodes
                    </p>
                    <p className="mt-1 font-medium">$9.99/month</p>
                  </div>
                  <Button>Upgrade</Button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Ad-free reading experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Early access to new episodes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Offline reading</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>High-quality downloads</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-16 items-center justify-center rounded bg-muted">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">No payment methods</h3>
                    <p className="text-sm text-muted-foreground">Add a payment method to upgrade to Premium</p>
                  </div>
                </div>
                <Button variant="outline">Add Method</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <CreditCard className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No billing history</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your billing history will appear here once you make a purchase
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
