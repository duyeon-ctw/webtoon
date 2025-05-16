"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search as SearchIcon, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { WebtoonCard } from "@/components/ui/webtoon-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Webtoon } from "@/lib/types"

// Mock data for search results
const mockWebtoons: Webtoon[] = [
  {
    id: "1",
    title: "The Cosmic Journey",
    author: {
      id: "author1",
      name: "Alex Chen",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Sci-Fi", "Adventure"],
    rating: 4.8,
    views: 1200000,
    likes: 450000,
    description: "Follow the adventures of Captain Nova as she explores the unknown regions of space.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-20",
    episodes: 52,
    isAdult: false,
  },
  {
    id: "2",
    title: "Mystic Academy",
    author: {
      id: "author2",
      name: "Sophia Kim",
      avatar: "/placeholder-user.jpg",
    },
    cover: "/placeholder.jpg",
    genre: ["Fantasy", "Drama"],
    rating: 4.7,
    views: 980000,
    likes: 410000,
    description: "A young wizard discovers her hidden powers at the prestigious Mystic Academy.",
    status: "ongoing",
    language: "en",
    lastUpdated: "2024-03-19",
    episodes: 45,
    isAdult: false,
  },
]

const allGenres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", 
  "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Thriller", "Historical"
]

const allLanguages = [
  { code: "en", name: "English" },
  { code: "ko", name: "Korean" },
  { code: "jp", name: "Japanese" },
  { code: "cn", name: "Chinese" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
]

interface SearchFilters {
  query: string
  searchIn: "all" | "title" | "creator" | "description"
  genres: string[]
  status: "all" | "ongoing" | "completed" | "hiatus"
  language: string[]
  minRating: number
  sortBy: "relevance" | "latest" | "popular" | "rating"
  adultContent: boolean
}

const defaultFilters: SearchFilters = {
  query: "",
  searchIn: "all",
  genres: [],
  status: "all",
  language: ["en"],
  minRating: 0,
  sortBy: "relevance",
  adultContent: false,
}

export function AdvancedSearch() {
  const router = useRouter()
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(defaultFilters)
  const [activeFilters, setActiveFilters] = useState<SearchFilters>(defaultFilters)
  const [searchResults, setSearchResults] = useState<Webtoon[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearched, setIsSearched] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)
    setActiveFilters(searchFilters)
    setIsSearched(true)

    try {
      // Replace with actual API call
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchFilters),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch search results')
      }

      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetFilters = () => {
    setSearchFilters(defaultFilters)
  }

  const removeGenreFilter = (genre: string) => {
    setSearchFilters({
      ...searchFilters,
      genres: searchFilters.genres.filter(g => g !== genre)
    })
  }

  const removeLanguageFilter = (lang: string) => {
    setSearchFilters({
      ...searchFilters,
      language: searchFilters.language.filter(l => l !== lang)
    })
  }

  // Count active filters for badge
  const getActiveFilterCount = () => {
    let count = 0
    if (searchFilters.genres.length > 0) count++
    if (searchFilters.status !== "all") count++
    if (searchFilters.language.length > 0 && !searchFilters.language.includes("en")) count++
    if (searchFilters.minRating > 0) count++
    if (searchFilters.adultContent !== defaultFilters.adultContent) count++
    if (searchFilters.sortBy !== "relevance") count++
    return count
  }

  return (
    <div className="w-full container mx-auto">
      <div className="flex flex-col gap-4">
        {/* Search bar with filter button */}
        <div className="flex w-full max-w-full items-center space-x-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for webtoons, creators, or keywords..."
              value={searchFilters.query}
              onChange={(e) => setSearchFilters({ ...searchFilters, query: e.target.value })}
              className="pl-10 w-full"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Search Filters</SheetTitle>
                <SheetDescription>
                  Refine your search with advanced filters
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label>Search In</Label>
                  <Select 
                    value={searchFilters.searchIn} 
                    onValueChange={(value) => setSearchFilters({ 
                      ...searchFilters, 
                      searchIn: value as "all" | "title" | "creator" | "description" 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select where to search" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fields</SelectItem>
                      <SelectItem value="title">Title Only</SelectItem>
                      <SelectItem value="creator">Creator Only</SelectItem>
                      <SelectItem value="description">Description Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Genres</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {allGenres.map((genre) => (
                      <div key={genre} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`genre-${genre}`} 
                          checked={searchFilters.genres.includes(genre)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSearchFilters({
                                ...searchFilters,
                                genres: [...searchFilters.genres, genre]
                              })
                            } else {
                              removeGenreFilter(genre)
                            }
                          }}
                        />
                        <Label 
                          htmlFor={`genre-${genre}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {genre}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={searchFilters.status} 
                    onValueChange={(value) => setSearchFilters({ 
                      ...searchFilters, 
                      status: value as "all" | "ongoing" | "completed" | "hiatus" 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="hiatus">Hiatus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Languages</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {allLanguages.map((lang) => (
                      <div key={lang.code} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`lang-${lang.code}`} 
                          checked={searchFilters.language.includes(lang.code)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSearchFilters({
                                ...searchFilters,
                                language: [...searchFilters.language, lang.code]
                              })
                            } else {
                              removeLanguageFilter(lang.code)
                            }
                          }}
                        />
                        <Label 
                          htmlFor={`lang-${lang.code}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {lang.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select 
                    value={searchFilters.sortBy} 
                    onValueChange={(value) => setSearchFilters({ 
                      ...searchFilters, 
                      sortBy: value as "relevance" | "latest" | "popular" | "rating"
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sort order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="latest">Latest Updated</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="adult-content" 
                    checked={searchFilters.adultContent}
                    onCheckedChange={(checked) => setSearchFilters({
                      ...searchFilters,
                      adultContent: !!checked
                    })}
                  />
                  <Label 
                    htmlFor="adult-content"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Show adult content (18+)
                  </Label>
                </div>
              </div>
              <SheetFooter>
                <div className="flex w-full gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleResetFilters}
                  >
                    Reset
                  </Button>
                  <SheetClose asChild>
                    <Button className="flex-1" onClick={handleSearch}>
                      Apply Filters
                    </Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* Active filters display */}
        {getActiveFilterCount() > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchFilters.genres.map(genre => (
              <Badge 
                key={genre} 
                variant="secondary"
                className="flex items-center gap-1"
              >
                {genre}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeGenreFilter(genre)}
                />
              </Badge>
            ))}
            {searchFilters.status !== "all" && (
              <Badge 
                variant="secondary"
                className="flex items-center gap-1"
              >
                Status: {searchFilters.status}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSearchFilters({ ...searchFilters, status: "all" })}
                />
              </Badge>
            )}
            {searchFilters.language.map(lang => {
              const langName = allLanguages.find(l => l.code === lang)?.name || lang
              return (
                <Badge 
                  key={lang} 
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {langName}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeLanguageFilter(lang)}
                  />
                </Badge>
              )
            })}
            {searchFilters.sortBy !== "relevance" && (
              <Badge 
                variant="secondary"
                className="flex items-center gap-1"
              >
                Sort: {searchFilters.sortBy}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSearchFilters({ ...searchFilters, sortBy: "relevance" })}
                />
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={handleResetFilters}
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Search results */}
        {isSearched && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              {isLoading 
                ? "Searching..." 
                : searchResults.length > 0 
                  ? `Found ${searchResults.length} results` 
                  : "No results found"}
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[2/3] w-full rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[80%]" />
                      <Skeleton className="h-3 w-[60%]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {searchResults.map(webtoon => (
                  <WebtoonCard key={webtoon.id} webtoon={webtoon} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results match your search criteria.</p>
                <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 