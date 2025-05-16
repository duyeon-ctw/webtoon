"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Search, Share, ThumbsUp } from "lucide-react"
import Link from "next/link"

// Mock data for community posts
const communityPosts = [
  {
    id: "1",
    user: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Creator",
    },
    content: "Just released a new chapter of The Cosmic Journey! Check it out and let me know what you think!",
    comic: {
      title: "The Cosmic Journey",
      id: "cosmic-journey",
    },
    timestamp: "2 hours ago",
    likes: 42,
    comments: 8,
    shares: 3,
    liked: true,
  },
  {
    id: "2",
    user: {
      name: "Sophia Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Reader",
    },
    content: "I can't believe the plot twist in the latest chapter of Mystic Academy! Did anyone else see that coming?",
    comic: {
      title: "Mystic Academy",
      id: "mystic-academy",
    },
    timestamp: "5 hours ago",
    likes: 28,
    comments: 15,
    shares: 1,
    liked: false,
  },
  {
    id: "3",
    user: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Creator",
    },
    content: "Working on a new horror series. Here's a sneak peek at some concept art. What do you think?",
    images: ["/placeholder.svg?height=300&width=500"],
    timestamp: "1 day ago",
    likes: 76,
    comments: 24,
    shares: 12,
    liked: false,
  },
  {
    id: "4",
    user: {
      name: "Emma Roberts",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Translator",
    },
    content:
      "Just finished translating the latest chapter of Dreamwalker into Spanish! It was challenging but so rewarding.",
    comic: {
      title: "Dreamwalker",
      id: "dreamwalker",
    },
    timestamp: "2 days ago",
    likes: 35,
    comments: 7,
    shares: 5,
    liked: true,
  },
]

// Mock data for community discussions
const communityDiscussions = [
  {
    id: "1",
    title: "Theories about The Cosmic Journey's ending",
    author: "Alex Chen",
    replies: 42,
    views: 156,
    lastActivity: "2 hours ago",
    tags: ["Theory", "Sci-Fi", "The Cosmic Journey"],
  },
  {
    id: "2",
    title: "Character development in Mystic Academy",
    author: "Sophia Kim",
    replies: 28,
    views: 103,
    lastActivity: "1 day ago",
    tags: ["Discussion", "Fantasy", "Mystic Academy"],
  },
  {
    id: "3",
    title: "Looking for horror comic recommendations",
    author: "Marcus Johnson",
    replies: 15,
    views: 87,
    lastActivity: "3 days ago",
    tags: ["Recommendation", "Horror"],
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState(communityPosts)
  const [newPostContent, setNewPostContent] = useState("")

  // Filter items based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.comic?.title.toLowerCase().includes(searchQuery.toLowerCase()) ?? false),
  )

  const filteredDiscussions = communityDiscussions.filter(
    (discussion) =>
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Toggle like on a post
  const toggleLike = (id: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  // Submit a new post
  const submitPost = () => {
    if (!newPostContent.trim()) return

    const newPost = {
      id: `new-${Date.now()}`,
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Reader",
      },
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Community</h2>
        <div className="relative md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search community..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg">Create Post</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Textarea
                placeholder="What's on your mind?"
                className="min-h-[100px] resize-none"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button variant="outline" size="sm">
                Add Image
              </Button>
              <Button onClick={submitPost} disabled={!newPostContent.trim()}>
                Post
              </Button>
            </CardFooter>
          </Card>

          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="flex flex-row items-start gap-4 p-4 pb-2">
                    <Avatar>
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{post.user.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {post.user.role}
                        </Badge>
                      </div>
                      <CardDescription>{post.timestamp}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="mb-3">{post.content}</p>
                    {post.images && post.images.length > 0 && (
                      <div className="mt-2 overflow-hidden rounded-lg">
                        <img
                          src={post.images[0] || "/placeholder.svg"}
                          alt="Post attachment"
                          className="w-full object-cover"
                        />
                      </div>
                    )}
                    {post.comic && (
                      <Link
                        href={`/comic/${post.comic.id}`}
                        className="mt-2 inline-block rounded-md bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                      >
                        {post.comic.title}
                      </Link>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(post.id)}
                      className={post.liked ? "text-primary" : ""}
                    >
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="mr-1 h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="mr-1 h-4 w-4" />
                      {post.shares}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <MessageCircle className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No posts found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchQuery ? "Try a different search term" : "Be the first to post in the community"}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Popular Discussions</h3>
            <Button>Start New Discussion</Button>
          </div>

          {filteredDiscussions.length > 0 ? (
            <div className="space-y-2">
              {filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="overflow-hidden">
                  <Link href={`/community/discussion/${discussion.id}`} className="block p-4 hover:bg-muted/50">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="font-medium">{discussion.title}</h4>
                        <p className="text-sm text-muted-foreground">Started by {discussion.author}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Heart className="h-3.5 w-3.5" />
                          <span>{discussion.views} views</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Last activity: {discussion.lastActivity}</div>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <MessageCircle className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No discussions found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchQuery ? "Try a different search term" : "Start a new discussion to get the conversation going"}
              </p>
              <Button className="mt-4">Start New Discussion</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 p-4 pb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${i}`} />
                    <AvatarFallback>C{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Creator {i}</CardTitle>
                    <CardDescription>{Math.floor(Math.random() * 50) + 1} comics</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-2 text-sm">
                    Creator of popular series like Fantasy World {i}, Adventure Time {i}, and more.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    Follow
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
