"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import type { UserRole } from "../lib/auth-utils"

interface RouteGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export default function RouteGuard({ children, allowedRoles = [], redirectTo = "/signin" }: RouteGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Wait until auth is initialized
    if (loading) return

    // If no user is logged in, redirect to sign in
    if (!user) {
      router.push(redirectTo)
      return
    }

    // If roles are specified, check if user has permission
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      router.push("/dashboard")
    }
  }, [user, loading, router, allowedRoles, redirectTo])

  // Show nothing while loading or redirecting
  if (loading || !user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
    return null
  }

  return <>{children}</>
}
