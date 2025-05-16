"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle, Lock, ShieldAlert, ShieldCheck, UserX } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function SecurityPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Security Settings</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Security Logs
          </Button>
          <Button size="sm">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Security Audit
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85/100</div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Good security posture</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">3 admin sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">+2 in the last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="api">API Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Security Settings</CardTitle>
              <CardDescription>Configure general security settings for the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="mb-4">
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle>Security Status</AlertTitle>
                <AlertDescription>
                  Your platform security is in good standing. There are 3 alerts that require your attention.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="content-scanning" className="flex flex-col space-y-1">
                    <span>Content Scanning</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Automatically scan uploaded content for malware and inappropriate material
                    </span>
                  </Label>
                  <Switch id="content-scanning" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="activity-logging" className="flex flex-col space-y-1">
                    <span>Enhanced Activity Logging</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Keep detailed logs of all administrative actions for security auditing
                    </span>
                  </Label>
                  <Switch id="activity-logging" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-block" className="flex flex-col space-y-1">
                    <span>Automatic IP Blocking</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Automatically block IPs that show suspicious activity patterns
                    </span>
                  </Label>
                  <Switch id="auto-block" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="security-notifications" className="flex flex-col space-y-1">
                    <span>Security Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive email alerts for important security events
                    </span>
                  </Label>
                  <Switch id="security-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>Review and address current security alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive" className="mb-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Multiple Failed Login Attempts</AlertTitle>
                <AlertDescription>
                  Multiple failed login attempts detected for admin account "admin@example.com" from IP 192.168.1.1.
                </AlertDescription>
                <div className="mt-2 flex justify-end">
                  <Badge className="mr-2">High Priority</Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Alert>

              <Alert variant="destructive" className="mb-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Unusual API Usage Pattern</AlertTitle>
                <AlertDescription>
                  Unusual API usage pattern detected from developer account "dev123". Possible API abuse.
                </AlertDescription>
                <div className="mt-2 flex justify-end">
                  <Badge className="mr-2">Medium Priority</Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Alert>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Outdated Security Dependencies</AlertTitle>
                <AlertDescription>
                  Some security dependencies are outdated and require updates to address known vulnerabilities.
                </AlertDescription>
                <div className="mt-2 flex justify-end">
                  <Badge className="mr-2">Medium Priority</Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Security Alerts
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
              <CardDescription>Configure authentication and access control settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                    <span>Require Two-Factor Authentication</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Require all admin users to set up 2FA for their accounts
                    </span>
                  </Label>
                  <Switch id="two-factor" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="password-policy" className="flex flex-col space-y-1">
                    <span>Strong Password Policy</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Enforce complex passwords with minimum requirements
                    </span>
                  </Label>
                  <Switch id="password-policy" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="session-timeout" className="flex flex-col space-y-1">
                    <span>Session Timeout</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Automatically log out inactive users after a period of time
                    </span>
                  </Label>
                  <Switch id="session-timeout" defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-2">
                  <Label htmlFor="timeout-duration">Session Timeout Duration (minutes)</Label>
                  <Input id="timeout-duration" type="number" defaultValue="30" />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="login-attempts" className="flex flex-col space-y-1">
                    <span>Limit Login Attempts</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Temporarily lock accounts after multiple failed login attempts
                    </span>
                  </Label>
                  <Switch id="login-attempts" defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-2">
                  <Label htmlFor="max-attempts">Maximum Failed Attempts</Label>
                  <Input id="max-attempts" type="number" defaultValue="5" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Authentication Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Configure privacy and data protection settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Privacy Policy Updated</AlertTitle>
                <AlertDescription>
                  Your privacy policy was last updated on May 10, 2023. Regular reviews are recommended.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Security</CardTitle>
              <CardDescription>Configure API security settings and access controls.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>API Security</AlertTitle>
                <AlertDescription>
                  Manage API keys, rate limiting, and access controls for your platform's APIs.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
