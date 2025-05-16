"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "./auth-provider"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import {
  BarChart,
  BookOpen,
  Brush,
  Globe,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Upload,
  Users,
} from "lucide-react"

export default function DashboardNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Common navigation items for all users
  const commonNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Library",
      href: "/dashboard/library",
      icon: BookOpen,
    },
    {
      title: "Favorites",
      href: "/dashboard/favorites",
      icon: Heart,
    },
    {
      title: "Community",
      href: "/dashboard/community",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  // Creator-specific navigation items
  const creatorNavItems = [
    {
      title: "My Comics",
      href: "/dashboard/my-comics",
      icon: Brush,
    },
    {
      title: "Upload",
      href: "/dashboard/upload",
      icon: Upload,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart,
    },
  ]

  // Translator-specific navigation items
  const translatorNavItems = [
    {
      title: "Translations",
      href: "/dashboard/translations",
      icon: Globe,
    },
  ]

  // Admin-specific navigation items
  const adminNavItems = [
    {
      title: "User Management",
      href: "/dashboard/users",
      icon: Users,
    },
  ]

  // Determine which navigation items to show based on user role
  let navItems = [...commonNavItems]

  if (user) {
    if (user.role === "creator") {
      navItems = [...commonNavItems, ...creatorNavItems]
    } else if (user.role === "translator") {
      navItems = [...commonNavItems, ...translatorNavItems]
    } else if (user.role === "admin") {
      navItems = [...commonNavItems, ...adminNavItems]
    }
  }

  return (
    <nav className="grid items-start gap-2 py-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn("w-full justify-start", pathname === item.href ? "bg-muted hover:bg-muted" : "")}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
