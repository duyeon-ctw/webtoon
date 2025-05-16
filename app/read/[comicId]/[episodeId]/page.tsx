"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Home,
  LayoutGrid,
  List,
  MessageSquare,
  Moon,
  MoreVertical,
  Settings,
  Share2,
  Sun,
  ThumbsUp,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function ReadPage({
  params,
}: {
  params: { comicId: string; episodeId: string }
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [readingMode, setReadingMode] = useState<"vertical" | "paged">("vertical")
  const [zoom, setZoom] = useState(100)
  const [showControls, setShowControls] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data for the comic episode
  const episode = {
    id: params.episodeId,
    comicId: params.comicId,
    title: "The Beginning",
    number: 1,
    pages: Array.from({ length: 10 }).map((_, i) => ({
      id: `${i + 1}`,
      image: `/placeholder.svg?height=1200&width=800&text=Page ${i + 1}`,
    })),
    nextEpisode: {
      id: "2",
      title: "The Journey Continues",
    },
    prevEpisode: null,
    comments: 156,
    likes: 4523,
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 150))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50))
  }

  const handleNextPage = () => {
    if (readingMode === "paged" && currentPage < episode.pages.length) {
      setCurrentPage((prev) => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevPage = () => {
    if (readingMode === "paged" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  const toggleControls = () => {
    setShowControls((prev) => !prev)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background" onClick={toggleControls}>
      {/* Top Navigation */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur transition-transform duration-300 ${
          showControls ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/comic/${params.comicId}`}>
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back to comic</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-sm font-medium sm:text-base">
                Episode {episode.number}: {episode.title}
              </h1>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Link href={`/comic/${params.comicId}`} className="hover:underline">
                  The Cosmic Journey
                </Link>
                <span>•</span>
                <span>
                  Page {readingMode === "paged" ? currentPage : "All"} of {episode.pages.length}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      setTheme(theme === "dark" ? "light" : "dark")
                    }}
                  >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      setReadingMode(readingMode === "vertical" ? "paged" : "vertical")
                    }}
                  >
                    {readingMode === "vertical" ? <LayoutGrid className="h-5 w-5" /> : <List className="h-5 w-5" />}
                    <span className="sr-only">Toggle reading mode</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to {readingMode === "vertical" ? "paged" : "vertical"} mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleZoomIn()
                    }}
                  >
                    <ZoomIn className="h-5 w-5" />
                    <span className="sr-only">Zoom in</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom in</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleZoomOut()
                    }}
                  >
                    <ZoomOut className="h-5 w-5" />
                    <span className="sr-only">Zoom out</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download Episode
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Reader Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Comic Content */}
      <div className={`container mx-auto pt-20 pb-20 ${readingMode === "vertical" ? "space-y-4" : ""}`}>
        {readingMode === "vertical" ? (
          // Vertical scrolling mode
          episode.pages.map((page) => (
            <div key={page.id} className="mx-auto" style={{ maxWidth: `${zoom}%` }}>
              <Image
                src={page.image || "/placeholder.svg"}
                alt={`Page ${page.id}`}
                width={800}
                height={1200}
                className="mx-auto w-full"
                priority={Number.parseInt(page.id) <= 3}
              />
            </div>
          ))
        ) : (
          // Paged mode
          <div className="mx-auto" style={{ maxWidth: `${zoom}%` }}>
            <Image
              src={episode.pages[currentPage - 1].image || "/placeholder.svg"}
              alt={`Page ${currentPage}`}
              width={800}
              height={1200}
              className="mx-auto w-full"
              priority
            />
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur transition-transform duration-300 ${
          showControls ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                handlePrevPage()
              }}
              disabled={readingMode === "vertical" || currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous page</span>
            </Button>
            {readingMode === "paged" && (
              <span className="text-sm">
                {currentPage} / {episode.pages.length}
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                handleNextPage()
              }}
              disabled={readingMode === "vertical" || currentPage === episode.pages.length}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild disabled={!episode.prevEpisode}>
              <Link href={episode.prevEpisode ? `/read/${params.comicId}/${episode.prevEpisode.id}` : "#"}>
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Previous episode</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/comic/${params.comicId}`}>
                <Home className="h-5 w-5" />
                <span className="sr-only">Comic home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild disabled={!episode.nextEpisode}>
              <Link href={episode.nextEpisode ? `/read/${params.comicId}/${episode.nextEpisode.id}` : "#"}>
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Next episode</span>
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="flex items-center">
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span>{episode.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center">
              <Heart className="mr-1 h-4 w-4" />
              <span>Favorite</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center">
              <MessageSquare className="mr-1 h-4 w-4" />
              <span>{episode.comments}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
