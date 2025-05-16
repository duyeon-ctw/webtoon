import Link from "next/link"
import Image from "next/image"
import { Heart, Eye, Star, BookOpen } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "./card"
import { Badge } from "./badge"
import { Button } from "./button"
import type { Webtoon } from "@/lib/types"

interface WebtoonCardProps {
  webtoon: Webtoon
  variant?: "default" | "horizontal"
}

export function WebtoonCard({ webtoon, variant = "default" }: WebtoonCardProps) {
  const {
    id,
    title,
    author,
    cover,
    genre,
    rating,
    views,
    likes,
    description,
    status,
    episodes,
  } = webtoon

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  if (variant === "horizontal") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="relative w-[120px] h-[180px]">
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
          <div className="flex flex-col flex-1 p-4">
            <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">by {author.name}</p>
            <div className="flex gap-2 mt-2">
              {genre.slice(0, 2).map((g) => (
                <Badge key={g} variant="secondary">
                  {g}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {description}
            </p>
            <div className="flex items-center gap-4 mt-auto text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {formatNumber(views)}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {episodes} eps
              </span>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative aspect-[2/3]">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-5 h-5" />
        </Button>
      </div>
      <CardHeader className="p-4">
        <div className="space-y-1">
          <h3 className="font-bold line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground">by {author.name}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <div className="flex gap-2">
          {genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="secondary">
              {g}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {rating.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {formatNumber(views)}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
} 