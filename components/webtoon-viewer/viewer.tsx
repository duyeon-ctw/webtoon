import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import type { EpisodeContent, ViewerSettings } from "@/lib/types"

interface WebtoonViewerProps {
  content: EpisodeContent
  settings: ViewerSettings
  onProgressUpdate?: (progress: { imageIndex: number; scrollPosition: number }) => void
  onSettingsChange?: (settings: Partial<ViewerSettings>) => void
}

export function WebtoonViewer({
  content,
  settings,
  onProgressUpdate,
  onSettingsChange,
}: WebtoonViewerProps) {
  const { theme } = useTheme()
  const viewerRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (content.format === "horizontal") {
        if (e.key === "ArrowLeft") {
          navigateImage(-1)
        } else if (e.key === "ArrowRight") {
          navigateImage(1)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [content.format, currentImageIndex])

  // Handle scroll progress for vertical format
  useEffect(() => {
    if (content.format !== "vertical" || !viewerRef.current) return

    const handleScroll = () => {
      const viewer = viewerRef.current
      if (!viewer) return

      const scrollPosition = viewer.scrollTop
      const viewerHeight = viewer.clientHeight
      const totalHeight = viewer.scrollHeight
      const imageElements = viewer.querySelectorAll("[data-image-index]")
      
      let currentIndex = 0
      imageElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= viewerHeight / 2) {
          currentIndex = Number(el.getAttribute("data-image-index"))
        }
      })

      setCurrentImageIndex(currentIndex)
      onProgressUpdate?.({
        imageIndex: currentIndex,
        scrollPosition: scrollPosition / totalHeight,
      })
    }

    const viewer = viewerRef.current
    viewer.addEventListener("scroll", handleScroll)
    return () => viewer.removeEventListener("scroll", handleScroll)
  }, [content.format, onProgressUpdate])

  const navigateImage = (delta: number) => {
    const newIndex = Math.max(0, Math.min(currentImageIndex + delta, content.images.length - 1))
    setCurrentImageIndex(newIndex)
    onProgressUpdate?.({
      imageIndex: newIndex,
      scrollPosition: newIndex / (content.images.length - 1),
    })
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await viewerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const renderVerticalViewer = () => (
    <div
      ref={viewerRef}
      className={cn(
        "w-full h-full overflow-y-auto overflow-x-hidden",
        "scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      )}
      style={{
        filter: `brightness(${settings.brightness}%) contrast(${settings.contrast}%)`,
      }}
    >
      {content.images.map((image, index) => (
        <div
          key={image.id}
          data-image-index={index}
          className="relative w-full"
          style={{ maxWidth: image.width * scale }}
        >
          <Image
            src={image.url}
            alt={`Page ${index + 1}`}
            width={image.width}
            height={image.height}
            className="w-full h-auto"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            placeholder={image.blurHash ? "blur" : "empty"}
            blurDataURL={image.blurHash}
          />
        </div>
      ))}
    </div>
  )

  const renderHorizontalViewer = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 z-10"
        onClick={() => navigateImage(-1)}
        disabled={currentImageIndex === 0}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          filter: `brightness(${settings.brightness}%) contrast(${settings.contrast}%)`,
        }}
      >
        {content.images[currentImageIndex] && (
          <Image
            src={content.images[currentImageIndex].url}
            alt={`Page ${currentImageIndex + 1}`}
            width={content.images[currentImageIndex].width}
            height={content.images[currentImageIndex].height}
            className="max-w-full max-h-full object-contain"
            priority
          />
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 z-10"
        onClick={() => navigateImage(1)}
        disabled={currentImageIndex === content.images.length - 1}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  )

  return (
    <div className="relative w-full h-full bg-background">
      {/* Viewer Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setScale(Math.max(0.5, scale - 0.1))}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setScale(Math.min(2, scale + 0.1))}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      {settings.showProgressBar && (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <Slider
            value={[currentImageIndex]}
            min={0}
            max={content.images.length - 1}
            step={1}
            onValueChange={([value]) => {
              setCurrentImageIndex(value)
              onProgressUpdate?.({
                imageIndex: value,
                scrollPosition: value / (content.images.length - 1),
              })
            }}
          />
        </div>
      )}

      {/* Main Viewer */}
      <div className="w-full h-full">
        {content.format === "vertical" ? renderVerticalViewer() : renderHorizontalViewer()}
      </div>
    </div>
  )
} 