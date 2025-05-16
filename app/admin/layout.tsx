import type React from "react"
import type { Metadata } from "next"
import AdminNav from "@/components/admin-nav"
import RouteGuard from "@/components/route-guard"

export const metadata: Metadata = {
  title: "Admin Dashboard - COZWO WEBTOON",
  description: "Admin dashboard for COZWO WEBTOON platform",
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <RouteGuard allowedRoles={["admin"]} redirectTo="/dashboard">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <AdminNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </RouteGuard>
  )
}
