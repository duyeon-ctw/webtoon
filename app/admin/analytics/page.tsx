"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"

export default function AdminAnalyticsPage() {
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
      <AnalyticsDashboard />
    </div>
  )
}
