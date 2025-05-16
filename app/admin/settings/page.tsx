"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Globe, Mail, Palette, Save, Settings } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AdminSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Platform Settings</h2>
        <Button size="sm">
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general platform settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="COZWO WEBTOON" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="platform-description">Platform Description</Label>
                <Textarea
                  id="platform-description"
                  defaultValue="A platform for reading and publishing webtoons and comics."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="contact@cozwowebtoon.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input id="support-email" type="email" defaultValue="support@cozwowebtoon.com" />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="maintenance-mode" className="flex flex-col space-y-1">
                  <span>Maintenance Mode</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Put the platform in maintenance mode
                  </span>
                </Label>
                <Switch id="maintenance-mode" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="user-registration" className="flex flex-col space-y-1">
                  <span>User Registration</span>
                  <span className="font-normal text-sm text-muted-foreground">Allow new users to register</span>
                </Label>
                <Switch id="user-registration" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="creator-applications" className="flex flex-col space-y-1">
                  <span>Creator Applications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow users to apply for creator status
                  </span>
                </Label>
                <Switch id="creator-applications" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save General Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>Configure regional and localization settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="default-language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="default-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                    <SelectItem value="ko">Korean</SelectItem>
                    <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                    <SelectItem value="cst">Central Time (CT)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                    <SelectItem value="cet">Central European Time (CET)</SelectItem>
                    <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-translate" className="flex flex-col space-y-1">
                  <span>Auto-Translation</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Automatically translate content based on user preferences
                  </span>
                </Label>
                <Switch id="auto-translate" defaultChecked />
              </div>
              <Alert>
                <Globe className="h-4 w-4" />
                <AlertTitle>Language Support</AlertTitle>
                <AlertDescription>
                  The platform currently supports 7 languages. Additional languages can be added in the localization
                  settings.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button>Save Regional Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="theme-mode">Default Theme Mode</Label>
                <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="light" id="light" className="sr-only peer" />
                    <Label
                      htmlFor="light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Palette className="mb-3 h-6 w-6" />
                      Light
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark" id="dark" className="sr-only peer" />
                    <Label
                      htmlFor="dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Palette className="mb-3 h-6 w-6" />
                      Dark
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="system" id="system" className="sr-only peer" />
                    <Label
                      htmlFor="system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Settings className="mb-3 h-6 w-6" />
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="primary-color">
                    <SelectValue placeholder="Select primary color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="allow-user-themes" className="flex flex-col space-y-1">
                  <span>User Theme Selection</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow users to select their preferred theme
                  </span>
                </Label>
                <Switch id="allow-user-themes" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="animations" className="flex flex-col space-y-1">
                  <span>UI Animations</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Enable animations throughout the platform
                  </span>
                </Label>
                <Switch id="animations" defaultChecked />
              </div>
              <Alert>
                <Palette className="h-4 w-4" />
                <AlertTitle>Custom Theming</AlertTitle>
                <AlertDescription>
                  Advanced theme customization is available in the theme editor. You can customize colors, typography,
                  and more.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button>Save Appearance Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure platform notification settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertTitle>Email Configuration</AlertTitle>
                <AlertDescription>
                  Email notifications are currently configured using SMTP. Make sure your email provider settings are up
                  to date.
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <p>Webtoons Management Page - Content Coming Soon!</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced platform settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Danger Zone</AlertTitle>
                <AlertDescription>
                  Be careful when modifying these settings. Incorrect settings can cause the platform to malfunction.
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <p>Advanced settings content coming soon!</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Advanced Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
