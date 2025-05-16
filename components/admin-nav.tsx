"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import {
  BarChart,
  Flag,
  LayoutDashboard,
  Settings,
  ShieldAlert,
  Upload,
  Users,
  BookOpen,
  UserCheck,
} from "lucide-react"

export default function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Creator Management",
      href: "/admin/creators",
      icon: UserCheck,
    },
    {
      title: "Webtoon Management",
      href: "/admin/webtoons",
      icon: BookOpen,
    },
    {
      title: "Content Moderation",
      href: "/admin/moderation",
      icon: Flag,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart,
    },
    {
      title: "Content Management",
      href: "/admin/content",
      icon: Upload,
    },
    {
      title: "Security",
      href: "/admin/security",
      icon: ShieldAlert,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

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
