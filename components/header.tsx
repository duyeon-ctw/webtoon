"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, BookOpen, Globe, Menu, Moon, Search, Shield, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"

export default function Header() {
  const { user, signOut } = useAuth()
  const { t, currentLanguage, languages, changeLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState(3) // Mock notification count

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const mainNav = [
    { name: "home", href: "/" },
    { name: "discover", href: "/discover" },
    { name: "genres", href: "/genres" },
    { name: "popular", href: "/popular" },
    { name: "new", href: "/new" },
  ]

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="apple-glass">
            <nav className="grid gap-6 text-lg font-medium">
              {mainNav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-foreground/80">
                  {t(item.name)}
                </Link>
              ))}
              {user && (
                <Link href="/dashboard" className="hover:text-foreground/80">
                  {t("dashboard")}
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">COZWO WEBTOON</span>
        </Link>

        <nav className="hidden md:flex md:gap-5 lg:gap-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {t(item.name)}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center">
              <Input type="search" placeholder={t("search")} className="apple-input w-[200px] lg:w-[300px]" />
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">{t("search")}</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">{t("search")}</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t("language")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="apple-glass">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code)
                    // Use a small timeout to ensure the language change is processed
                    // before closing the dropdown
                    setTimeout(() => {
                      // Use a more reliable way to close the dropdown
                      const closeEvent = new MouseEvent("mousedown", {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                      })
                      document.dispatchEvent(closeEvent)
                    }, 50)
                  }}
                  className={`cursor-pointer ${currentLanguage === lang.code ? "bg-accent font-medium" : ""}`}
                >
                  <span>{lang.nativeName}</span>
                  <span className="ml-2 text-muted-foreground">({lang.name})</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{t("toggleTheme")}</span>
            </Button>
          )}

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {notifications}
                      </span>
                    )}
                    <span className="sr-only">{t("notifications")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="apple-glass">
                  <DropdownMenuItem onClick={() => setNotifications(0)}>{t("newEpisodeReleased")}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNotifications(0)}>{t("newComment")}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNotifications(0)}>{t("newFollower")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="apple-glass w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      {t("profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <BookOpen className="mr-2 h-4 w-4" />
                      {t("dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>{t("signOut")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="apple" asChild>
              <Link href="/signin">{t("signIn")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
