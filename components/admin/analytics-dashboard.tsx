"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart, DonutChart } from "@tremor/react"
import { Calendar, TrendingUp, Users, BookOpen, DollarSign, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for charts
const viewsData = [
  { date: "Jan", views: 2890 },
  { date: "Feb", views: 3200 },
  { date: "Mar", views: 4500 },
  { date: "Apr", views: 3800 },
  { date: "May", views: 5100 },
  { date: "Jun", views: 7200 },
  { date: "Jul", views: 8400 },
]

const engagementData = [
  { date: "Jan", likes: 890, comments: 240, shares: 120 },
  { date: "Feb", likes: 1200, comments: 280, shares: 150 },
  { date: "Mar", likes: 1500, comments: 320, shares: 180 },
  { date: "Apr", likes: 1300, comments: 290, shares: 160 },
  { date: "May", likes: 1800, comments: 350, shares: 210 },
  { date: "Jun", likes: 2200, comments: 410, shares: 280 },
  { date: "Jul", likes: 2600, comments: 480, shares: 320 },
]

const demographicsData = [
  { name: "13-17", value: 15 },
  { name: "18-24", value: 30 },
  { name: "25-34", value: 25 },
  { name: "35-44", value: 15 },
  { name: "45-54", value: 10 },
  { name: "55+", value: 5 },
]

const deviceData = [
  { name: "Mobile", value: 65 },
  { name: "Desktop", value: 25 },
  { name: "Tablet", value: 10 },
]

const genrePerformanceData = [
  { genre: "Romance", views: 8500, subscribers: 1200 },
  { genre: "Action", views: 7200, subscribers: 980 },
  { genre: "Comedy", views: 6800, subscribers: 850 },
  { genre: "Fantasy", views: 9200, subscribers: 1400 },
  { genre: "Horror", views: 4500, subscribers: 620 },
  { genre: "Slice of Life", views: 5300, subscribers: 740 },
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <div className="flex items-center gap-4">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <h3 className="text-2xl font-bold">2.4M</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
                </p>
              </div>
              <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subscribers</p>
                <h3 className="text-2xl font-bold">145.2K</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +8.3%
                </p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Read Time</p>
                <h3 className="text-2xl font-bold">18.5M min</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +15.2%
                </p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <h3 className="text-2xl font-bold">$42.5K</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +9.7%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
              <CardDescription>Total views across all webtoons</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={viewsData}
                index="date"
                categories={["views"]}
                colors={["blue"]}
                valueFormatter={(value) => `${value.toLocaleString()}`}
                yAxisWidth={60}
                showLegend={false}
                height="h-80"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Likes, comments, and shares</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={engagementData}
                  index="date"
                  categories={["likes", "comments", "shares"]}
                  colors={["blue", "green", "purple"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  yAxisWidth={60}
                  height="h-80"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Genre Performance</CardTitle>
                <CardDescription>Views and subscribers by genre</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={genrePerformanceData}
                  index="genre"
                  categories={["views", "subscribers"]}
                  colors={["blue", "purple"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  yAxisWidth={60}
                  height="h-80"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
                <CardDescription>Age distribution of readers</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={demographicsData}
                  index="name"
                  category="value"
                  colors={["blue", "cyan", "indigo", "violet", "purple", "fuchsia"]}
                  valueFormatter={(value) => `${value}%`}
                  height="h-80"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>How users access your content</CardDescription>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={deviceData}
                  index="name"
                  category="value"
                  colors={["blue", "cyan", "indigo"]}
                  valueFormatter={(value) => `${value}%`}
                  height="h-80"
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Where your readers are located</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">World map visualization would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          {/* Content performance metrics would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Webtoons</CardTitle>
              <CardDescription>Based on views, engagement, and growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-2 hover:bg-muted rounded-md">
                    <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Webtoon Title {i}</h4>
                      <p className="text-sm text-muted-foreground">Fantasy • 45 episodes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{(150000 - i * 12000).toLocaleString()} views</p>
                      <p className="text-sm text-green-500">+{12 - i}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          {/* Revenue metrics would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Streams</CardTitle>
              <CardDescription>Breakdown of income sources</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={[
                  { source: "Subscriptions", amount: 28500 },
                  { source: "Coin Purchases", amount: 15200 },
                  { source: "Ads", amount: 8700 },
                  { source: "Merchandise", amount: 4200 },
                  { source: "Partnerships", amount: 3800 },
                ]}
                index="source"
                categories={["amount"]}
                colors={["blue"]}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
                yAxisWidth={80}
                height="h-80"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
