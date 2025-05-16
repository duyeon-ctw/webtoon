import type React from "react"
import type { Metadata } from "next"
import DashboardNav from "@/components/dashboard-nav"
import RouteGuard from "@/components/route-guard"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your webcomics and account",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <RouteGuard>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </RouteGuard>
  )
}
