"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import type { EpisodeContent, ViewerSettings, WebtoonImage } from "@/lib/types"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Apply theme settings
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.style.filter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%)`
  }, [settings.brightness, settings.contrast])

  // Handle auto-scrolling
  useEffect(() => {
    if (!settings.autoScroll || !containerRef.current) return

    const container = containerRef.current
    let animationId: number
    let lastTimestamp = 0

    const scroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const elapsed = timestamp - lastTimestamp

      if (elapsed > 1000 / 30) { // Limit to ~30fps for performance
        const scrollAmount = (settings.autoScrollSpeed / 5) * elapsed / 16.67 // Normalize by 60fps frame time
        container.scrollTop += scrollAmount
        lastTimestamp = timestamp
      }

      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [settings.autoScroll, settings.autoScrollSpeed])

  // Track scroll position and calculate current image
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPos = container.scrollTop
      const containerHeight = container.clientHeight
      const totalHeight = container.scrollHeight
      const scrollPercentage = (scrollPos / (totalHeight - containerHeight)) * 100

      setScrollPosition(scrollPercentage > 100 ? 100 : scrollPercentage < 0 ? 0 : scrollPercentage)

      // Find current image based on scroll position
      const imageElements = Array.from(container.querySelectorAll('[data-image-index]'))
      for (let i = 0; i < imageElements.length; i++) {
        const element = imageElements[i] as HTMLElement
        const rect = element.getBoundingClientRect()
        if (rect.top <= containerHeight / 2 && rect.bottom >= containerHeight / 2) {
          const index = parseInt(element.dataset.imageIndex || '0', 10)
          if (index !== currentImageIndex) {
            setCurrentImageIndex(index)
            onProgressUpdate?.({ imageIndex: index, scrollPosition: scrollPercentage })
          }
          break
        }
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [currentImageIndex, onProgressUpdate])

  // Track image loading
  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [imageId]: true,
    }))

    // Check if all images are loaded
    const allLoaded = content.images.every(img => loadedImages[img.id])
    if (allLoaded) {
      setIsLoading(false)
    }
  }

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
      await containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Render images based on the format
  const renderImages = () => {
    if (content.format === 'vertical') {
      return (
        <div className="flex flex-col items-center">
          {content.images.map((image, index) => (
            <div 
              key={image.id} 
              className="w-full" 
              data-image-index={index}
            >
              <div className="relative mx-auto" style={{
                width: '100%',
                maxWidth: '800px',
                height: 'auto',
                aspectRatio: `${image.width} / ${image.height}`,
              }}>
                <img
                  src={image.url}
                  alt={`Page ${index + 1}`} 
                  className="w-full h-auto object-contain" 
                  onLoad={() => handleImageLoad(image.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )
    }
    
    // Add horizontal format support later
    return (
      <div className="flex flex-col items-center">
        <div className="text-center p-8">This format is not supported yet</div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className={`h-full w-full overflow-y-auto overflow-x-hidden ${settings.theme === 'dark' ? 'bg-black text-white' : settings.theme === 'sepia' ? 'bg-amber-50 text-gray-800' : 'bg-white text-black'}`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        {renderImages()}
      </div>

      {settings.showProgressBar && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-100"
            style={{ width: `${scrollPosition}%` }}
          />
        </div>
      )}

      {settings.showPageNumber && (
        <div className="absolute bottom-2 right-2 bg-background/70 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-sm">
          {currentImageIndex + 1} / {content.images.length}
        </div>
      )}

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
    </div>
  )
} 