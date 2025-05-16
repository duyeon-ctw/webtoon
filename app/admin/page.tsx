"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { BarChart, BookOpen, Flag, TrendingUp, Upload, Users } from "lucide-react"
import { AnalyticsSection } from "../../components/admin/analytics-section"
import { AnalyticsDashboard } from "../../components/admin/analytics-dashboard"
import { AdminOverview } from "../../components/admin/overview"

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard")
    }
  }, [user, router])

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export Data
          </Button>
          <Button size="sm">System Status</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+573 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Comics</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,456</div>
            <p className="text-xs text-muted-foreground">+128 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Reports</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">12 require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24.5%</div>
            <p className="text-xs text-muted-foreground">Compared to last quarter</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
                <CardDescription>User engagement over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Activity chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        {i % 3 === 0 ? (
                          <Users className="h-4 w-4 text-primary" />
                        ) : i % 3 === 1 ? (
                          <Upload className="h-4 w-4 text-primary" />
                        ) : (
                          <Flag className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i % 3 === 0
                            ? "New user registered"
                            : i % 3 === 1
                              ? "New comic uploaded"
                              : "Content reported"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i % 3 === 0
                            ? "User123 joined the platform"
                            : i % 3 === 1
                              ? "Creator456 uploaded 'Comic Title'"
                              : "Report #789 submitted for review"}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">{i * 10}m ago</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>User roles across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">User distribution chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Growth</CardTitle>
                <CardDescription>New content over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Content growth chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Platform performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2">
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">System health metrics will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>Comprehensive platform analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center gap-2">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Detailed analytics will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Reports</CardTitle>
              <CardDescription>Reported content requiring moderation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center gap-2">
                  <Flag className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Content reports will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Platform activity and error logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 text-muted-foreground">📋</div>
                  <p className="text-sm text-muted-foreground">System logs will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
