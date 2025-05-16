"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for analytics
const viewsData = [
  { name: "Jan", views: 4000 },
  { name: "Feb", views: 3000 },
  { name: "Mar", views: 2000 },
  { name: "Apr", views: 2780 },
  { name: "May", views: 1890 },
  { name: "Jun", views: 2390 },
  { name: "Jul", views: 3490 },
  { name: "Aug", views: 4000 },
  { name: "Sep", views: 5000 },
  { name: "Oct", views: 6000 },
  { name: "Nov", views: 7000 },
  { name: "Dec", views: 8000 },
]

const engagementData = [
  { name: "Jan", likes: 2400, comments: 1200, shares: 800 },
  { name: "Feb", likes: 1398, comments: 980, shares: 600 },
  { name: "Mar", likes: 9800, comments: 3908, shares: 1500 },
  { name: "Apr", likes: 3908, comments: 1908, shares: 980 },
  { name: "May", likes: 4800, comments: 2800, shares: 1200 },
  { name: "Jun", likes: 3800, comments: 2400, shares: 1000 },
  { name: "Jul", likes: 4300, comments: 2100, shares: 900 },
]

const demographicsData = [
  { name: "18-24", value: 35 },
  { name: "25-34", value: 30 },
  { name: "35-44", value: 20 },
  { name: "45-54", value: 10 },
  { name: "55+", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const episodePerformanceData = [
  { name: "Ep 1", views: 9000, likes: 4500, comments: 2000 },
  { name: "Ep 2", views: 8500, likes: 4200, comments: 1800 },
  { name: "Ep 3", views: 9500, likes: 4800, comments: 2200 },
  { name: "Ep 4", views: 10000, likes: 5000, comments: 2500 },
  { name: "Ep 5", views: 11000, likes: 5500, comments: 2800 },
  { name: "Ep 6", views: 10500, likes: 5200, comments: 2600 },
  { name: "Ep 7", views: 12000, likes: 6000, comments: 3000 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedSeries, setSelectedSeries] = useState("all")

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center gap-2">
          <Select value={selectedSeries} onValueChange={setSelectedSeries}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select series" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Series</SelectItem>
              <SelectItem value="cosmic-journey">The Cosmic Journey</SelectItem>
              <SelectItem value="mystic-academy">Mystic Academy</SelectItem>
              <SelectItem value="urban-legends">Urban Legends</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">452.8K</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,325.96</div>
            <p className="text-xs text-muted-foreground">+18.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="episodes" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Episodes
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Audience
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
              <CardDescription>Total views across all episodes</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={viewsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Likes, comments, and shares over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={engagementData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="likes" stroke="#8884d8" />
                  <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="shares" stroke="#ffc658" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="episodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Episode Performance</CardTitle>
              <CardDescription>Views, likes, and comments by episode</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={episodePerformanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#8884d8" />
                  <Bar dataKey="likes" fill="#82ca9d" />
                  <Bar dataKey="comments" fill="#ffc658" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Episodes</CardTitle>
                <CardDescription>Episodes with the highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {episodePerformanceData.slice(0, 5).map((episode, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{episode.name}</p>
                        <p className="text-sm text-muted-foreground">{episode.views.toLocaleString()} views</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="font-medium">{episode.likes.toLocaleString()}</span>
                          <span className="ml-1 text-muted-foreground">likes</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{episode.comments.toLocaleString()}</span>
                          <span className="ml-1 text-muted-foreground">comments</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Episode Completion Rate</CardTitle>
                <CardDescription>Percentage of readers who finish each episode</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {episodePerformanceData.slice(0, 5).map((episode, index) => {
                    const completionRate = Math.floor(Math.random() * 30) + 70 // Random between 70-100%
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{episode.name}</p>
                          <p className="text-sm font-medium">{completionRate}%</p>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-primary" style={{ width: `${completionRate}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
                <CardDescription>Age distribution of your readers</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={demographicsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {demographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Where your readers are located</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: "United States", percentage: 35 },
                    { country: "Japan", percentage: 20 },
                    { country: "South Korea", percentage: 15 },
                    { country: "United Kingdom", percentage: 10 },
                    { country: "Canada", percentage: 8 },
                    { country: "Other", percentage: 12 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{item.country}</p>
                        <p className="text-sm font-medium">{item.percentage}%</p>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reader Retention</CardTitle>
              <CardDescription>How many readers return to your comics</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={[
                    { name: "Week 1", retention: 100 },
                    { name: "Week 2", retention: 85 },
                    { name: "Week 3", retention: 75 },
                    { name: "Week 4", retention: 70 },
                    { name: "Week 5", retention: 65 },
                    { name: "Week 6", retention: 62 },
                    { name: "Week 7", retention: 60 },
                    { name: "Week 8", retention: 58 },
                  ]}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="retention" stroke="#8884d8" activeDot={{ r: 8 }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
