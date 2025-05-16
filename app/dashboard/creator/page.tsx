import { Metadata } from "next"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { WebtoonList } from "@/components/dashboard/webtoon-list"
import { AnnouncementSection } from "@/components/dashboard/announcement-section"

export const metadata: Metadata = {
  title: "크리에이터 대시보드",
  description: "웹툰 통계, 수익 관리, 팬 소통을 위한 크리에이터 대시보드",
}

export default function CreatorDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="webtoons">웹툰 관리</TabsTrigger>
          <TabsTrigger value="analytics">통계</TabsTrigger>
          <TabsTrigger value="revenue">수익</TabsTrigger>
          <TabsTrigger value="announcements">공지사항</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <StatsCards />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>개요</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>최근 활동</CardTitle>
                <CardDescription>
                  최근 업데이트된 에피소드와 댓글
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="webtoons" className="space-y-4">
          <WebtoonList />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          {/* Analytics content */}
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          {/* Revenue content */}
        </TabsContent>
        <TabsContent value="announcements" className="space-y-4">
          <AnnouncementSection />
        </TabsContent>
      </Tabs>
    </div>
  )
} 