"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sun, Laptop } from "lucide-react"

export default function TestThemePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">Theme Test Page</h1>
      <p className="mb-6">
        This page allows you to test the theme switching functionality. The current theme is: <strong>{theme}</strong>
      </p>

      <div className="flex flex-wrap gap-4 mb-10">
        <Button
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => setTheme("light")}
          className="flex items-center gap-2"
        >
          <Sun className="h-4 w-4" />
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2"
        >
          <Moon className="h-4 w-4" />
          Dark
        </Button>
        <Button
          variant={theme === "system" ? "default" : "outline"}
          onClick={() => setTheme("system")}
          className="flex items-center gap-2"
        >
          <Laptop className="h-4 w-4" />
          System
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="apple-card">
          <CardHeader>
            <CardTitle>Light/Dark Mode Test</CardTitle>
            <CardDescription>This card will change appearance based on the selected theme</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The current theme is: <strong>{theme}</strong>
            </p>
            <p className="mt-2">
              This text should be dark in light mode and light in dark mode. Background colors, card styles, and other
              elements should also adapt to the current theme.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="apple" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              Toggle Theme
            </Button>
          </CardFooter>
        </Card>

        <Card className="apple-card">
          <CardHeader>
            <CardTitle>Apple-Inspired Design</CardTitle>
            <CardDescription>Testing the Apple-like design elements</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This card uses Apple-inspired design elements like rounded corners, subtle shadows, and glass-like
              effects.
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <Button variant="apple">Apple Button</Button>
              <Button variant="gradient">Gradient Button</Button>
              <div className="apple-glass p-4 rounded-2xl">
                <p>Glass effect container</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Apple-inspired design elements work in both light and dark modes
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10">
        <p className="text-muted-foreground">
          Note: The theme switcher in the header should also work across the entire application.
        </p>
      </div>
    </div>
  )
}
