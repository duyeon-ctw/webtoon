"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WebtoonViewer } from "@/components/webtoon-viewer/viewer"
import { ViewerSettingsPanel } from "@/components/webtoon-viewer/settings"
import { CommentSection } from "@/components/comments/comment-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { EpisodeContent, ViewerSettings } from "@/lib/types"

// Mock data for testing
const mockEpisode: EpisodeContent = {
  id: "ep1",
  episodeId: "ep1",
  images: Array.from({ length: 20 }, (_, i) => ({
    id: `img${i}`,
    url: `/placeholder.jpg`,
    width: 800,
    height: 1200,
    order: i,
  })),
  format: "vertical",
  language: "en",
}

const defaultSettings: ViewerSettings = {
  theme: "light",
  fontSize: 16,
  brightness: 100,
  contrast: 100,
  autoScroll: false,
  autoScrollSpeed: 5,
  showPageNumber: true,
  showProgressBar: true,
  doublePagesForHorizontal: false,
}

export default function WebtoonReaderPage() {
  const params = useParams()
  const [settings, setSettings] = useState<ViewerSettings>(defaultSettings)
  const [progress, setProgress] = useState<{ imageIndex: number; scrollPosition: number }>({
    imageIndex: 0,
    scrollPosition: 0,
  })
  const [activeTab, setActiveTab] = useState<"viewer" | "comments">("viewer")

  // Load saved settings and progress from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("viewer-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    const savedProgress = localStorage.getItem(`progress-${params.webtoonId}-${params.episodeId}`)
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [params.webtoonId, params.episodeId])

  // Save settings and progress to localStorage
  useEffect(() => {
    localStorage.setItem("viewer-settings", JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    localStorage.setItem(
      `progress-${params.webtoonId}-${params.episodeId}`,
      JSON.stringify(progress)
    )
  }, [progress, params.webtoonId, params.episodeId])

  const handleSettingsChange = (newSettings: Partial<ViewerSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const handleProgressUpdate = (newProgress: { imageIndex: number; scrollPosition: number }) => {
    setProgress(newProgress)
  }

  return (
    <div className="container mx-auto py-6">
      <Tabs 
        defaultValue="viewer" 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "viewer" | "comments")}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="viewer">Webtoon</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          
          {activeTab === "viewer" && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings2 className="h-4 w-4 mr-2" />
                  Reader Settings
                </Button>
              </SheetTrigger>
              <SheetContent>
                <ViewerSettingsPanel settings={settings} onChange={handleSettingsChange} />
              </SheetContent>
            </Sheet>
          )}
        </div>

        <TabsContent value="viewer" className="mt-0">
          <div className="relative w-full h-[calc(100vh-10rem)] bg-background">
            <WebtoonViewer
              content={mockEpisode}
              settings={settings}
              onProgressUpdate={handleProgressUpdate}
              onSettingsChange={handleSettingsChange}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="comments" className="mt-0">
          <div className="bg-background p-4 rounded-lg">
            <CommentSection 
              contentId={params.episodeId as string}
              contentType="episode"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 