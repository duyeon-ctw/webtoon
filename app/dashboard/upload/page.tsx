"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, ImageIcon, Loader2, Trash2, Upload, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import Image from "next/image"

export default function UploadPage() {
  const [date, setDate] = useState<Date>()
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadTab, setUploadTab] = useState("new-episode")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Mock function to handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setIsUploading(true)

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setUploadProgress(progress)

        if (progress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadProgress(0)

          // Add the new images
          const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
          setUploadedImages((prev) => [...prev, ...newImages])
        }
      }, 200)
    }
  }

  // Mock function to remove uploaded image
  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Mock function to submit the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsUploading(false)
      alert("Upload successful!")
      setUploadedImages([])
    }, 2000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Upload Content</h2>
      </div>

      <Tabs value={uploadTab} onValueChange={setUploadTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="new-episode">New Episode</TabsTrigger>
          <TabsTrigger value="new-series">New Series</TabsTrigger>
          <TabsTrigger value="bulk-upload">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="new-episode" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Episode</CardTitle>
              <CardDescription>Add a new episode to your existing series</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="series">Series</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select series" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cosmic-journey">The Cosmic Journey</SelectItem>
                      <SelectItem value="mystic-academy">Mystic Academy</SelectItem>
                      <SelectItem value="urban-legends">Urban Legends</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="episode-number">Episode Number</Label>
                  <Input id="episode-number" type="number" placeholder="Episode number" min="1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="episode-title">Episode Title</Label>
                <Input id="episode-title" placeholder="Enter episode title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="episode-description">Episode Description</Label>
                <Textarea id="episode-description" placeholder="Enter episode description" rows={3} />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Publication Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="e.g. action, romance, comedy" />
                  <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Episode Images</Label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="group relative aspect-[3/4] overflow-hidden rounded-md border">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Uploaded image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-1 top-1 rounded-full bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </button>
                    </div>
                  ))}
                  <div className="flex aspect-[3/4] items-center justify-center rounded-md border border-dashed">
                    <label
                      htmlFor="image-upload"
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4 text-center"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                          <p className="mt-2 text-sm font-medium">Uploading... {uploadProgress}%</p>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm font-medium">Upload Images</p>
                          <p className="text-xs text-muted-foreground">Drag and drop or click to browse</p>
                        </>
                      )}
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload images in the order they should appear in the episode. Supported formats: JPG, PNG, WebP.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mature-content">Mature Content</Label>
                    <p className="text-xs text-muted-foreground">Mark this episode as containing mature content</p>
                  </div>
                  <Switch id="mature-content" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comments-enabled">Enable Comments</Label>
                    <p className="text-xs text-muted-foreground">Allow readers to comment on this episode</p>
                  </div>
                  <Switch id="comments-enabled" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button disabled={isUploading || uploadedImages.length === 0} onClick={handleSubmit}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Publish Episode
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="new-series" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Series</CardTitle>
              <CardDescription>Start a new comic series on the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="series-title">Series Title</Label>
                <Input id="series-title" placeholder="Enter series title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="series-description">Series Description</Label>
                <Textarea id="series-description" placeholder="Enter series description" rows={4} />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="genre">Primary Genre</Label>
                  <Select>
                    <SelectTrigger id="genre">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="action">Action</SelectItem>
                      <SelectItem value="comedy">Comedy</SelectItem>
                      <SelectItem value="drama">Drama</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                      <SelectItem value="slice-of-life">Slice of Life</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Series Status</Label>
                  <Select defaultValue="ongoing">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="hiatus">On Hiatus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="series-tags">Tags</Label>
                <Input id="series-tags" placeholder="e.g. action, romance, comedy" />
                <p className="text-xs text-muted-foreground">Separate tags with commas</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="flex items-center gap-4">
                  <div className="relative aspect-[3/4] h-40 overflow-hidden rounded-md border">
                    {uploadedImages.length > 0 ? (
                      <Image
                        src={uploadedImages[0] || "/placeholder.svg"}
                        alt="Series cover"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Upload Cover Image</p>
                    <p className="text-xs text-muted-foreground">Recommended size: 800x1200px. Max file size: 5MB.</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor="cover-upload" className="cursor-pointer">
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Browse
                          <Input
                            id="cover-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </Button>
                      {uploadedImages.length > 0 && (
                        <Button variant="outline" size="sm" onClick={() => setUploadedImages([])}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mature-series">Mature Content</Label>
                    <p className="text-xs text-muted-foreground">Mark this series as containing mature content</p>
                  </div>
                  <Switch id="mature-series" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="series-comments">Enable Comments</Label>
                    <p className="text-xs text-muted-foreground">Allow readers to comment on this series</p>
                  </div>
                  <Switch id="series-comments" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button>Create Series</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bulk-upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Upload</CardTitle>
              <CardDescription>Upload multiple episodes at once</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulk-series">Series</Label>
                <Select>
                  <SelectTrigger id="bulk-series">
                    <SelectValue placeholder="Select series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cosmic-journey">The Cosmic Journey</SelectItem>
                    <SelectItem value="mystic-academy">Mystic Academy</SelectItem>
                    <SelectItem value="urban-legends">Urban Legends</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Upload Files</Label>
                <div className="rounded-md border border-dashed p-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Drag and drop files</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Upload ZIP files containing episode images</p>
                    <p className="text-xs text-muted-foreground">
                      Each ZIP file should contain one episode with images in the correct order
                    </p>
                    <Button variant="outline" className="mt-4" asChild>
                      <label htmlFor="bulk-upload" className="cursor-pointer">
                        Browse Files
                        <Input id="bulk-upload" type="file" accept=".zip" multiple className="hidden" />
                      </label>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Uploaded Files</Label>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                    Clear All
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="p-4 text-center text-sm text-muted-foreground">No files uploaded yet</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Publication Schedule</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="schedule-episodes" />
                  <Label htmlFor="schedule-episodes">Schedule episodes for automatic release</Label>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="release-frequency">Release Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger id="release-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Upload Episodes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
