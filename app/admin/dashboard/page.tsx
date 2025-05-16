import { Metadata } from "next"
import { AdminOverview } from "@/components/admin/overview"
import { UserManagement } from "@/components/admin/user-management"
import { ContentModeration } from "@/components/admin/content-moderation"
import { PaymentManagement } from "@/components/admin/payment-management"
import { AnalyticsSection } from "@/components/admin/analytics-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "관리자 대시보드",
  description: "웹툰 플랫폼 관리자 대시보드",
}

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">관리자 대시보드</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="users">사용자 관리</TabsTrigger>
          <TabsTrigger value="content">콘텐츠 관리</TabsTrigger>
          <TabsTrigger value="payments">결제 관리</TabsTrigger>
          <TabsTrigger value="analytics">분석</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <AdminOverview />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>
        <TabsContent value="content" className="space-y-4">
          <ContentModeration />
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <PaymentManagement />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsSection />
        </TabsContent>
      </Tabs>
    </div>
  )
} 