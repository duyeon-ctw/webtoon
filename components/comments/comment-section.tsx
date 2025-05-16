"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Heart, MoreVertical, Reply, Flag, Trash2, Edit, Clock } from "lucide-react"
import type { Comment } from "@/lib/types"

interface CommentSectionProps {
  contentId: string
  contentType: 'webtoon' | 'episode'
  initialComments?: Comment[]
}

export function CommentSection({ contentId, contentType, initialComments = [] }: CommentSectionProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [sortBy, setSortBy] = useState<"latest" | "most-liked">("latest")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // In a real app, this would fetch comments from an API
  useEffect(() => {
    // Mock data for demonstration
    if (comments.length === 0) {
      const mockComments: Comment[] = [
        {
          id: "comment1",
          userId: "user1",
          userName: "Sarah Johnson",
          userAvatar: "/placeholder-user.jpg",
          content: "I love this webtoon! The art style is amazing and the story is so engaging.",
          createdAt: "2023-09-15T10:30:00Z",
          likes: 24,
          replies: [
            {
              id: "reply1",
              userId: "user2",
              userName: "Michael Smith",
              userAvatar: "/placeholder-user.jpg",
              content: "I agree! The latest chapter was such a plot twist!",
              createdAt: "2023-09-15T11:45:00Z",
              likes: 8,
            },
          ],
        },
        {
          id: "comment2",
          userId: "user3",
          userName: "Jessica Lee",
          userAvatar: "/placeholder-user.jpg",
          content: "Can't wait for the next episode! The cliffhanger is killing me.",
          createdAt: "2023-09-14T18:20:00Z",
          likes: 15,
        },
      ]
      setComments(mockComments)
    }
  }, [comments.length])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const handleSubmitComment = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to leave a comment",
        variant: "destructive",
      })
      return
    }

    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar || "/placeholder-user.jpg",
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
      }

      if (replyTo) {
        // Add reply to existing comment
        const updatedComments = comments.map(comment => {
          if (comment.id === replyTo) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newCommentObj],
            }
          }
          return comment
        })
        setComments(updatedComments)
        setReplyTo(null)
      } else {
        // Add new top-level comment
        setComments([newCommentObj, ...comments])
      }

      setNewComment("")
      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditComment = (commentId: string, parentId?: string) => {
    let targetComment: Comment | undefined

    if (parentId) {
      // It's a reply
      const parentComment = comments.find(c => c.id === parentId)
      targetComment = parentComment?.replies?.find(r => r.id === commentId)
    } else {
      // It's a top-level comment
      targetComment = comments.find(c => c.id === commentId)
    }

    if (targetComment) {
      setEditingComment(commentId)
      setEditText(targetComment.content)
    }
  }

  const handleSaveEdit = (commentId: string, parentId?: string) => {
    const updatedComments = comments.map(comment => {
      if (parentId) {
        // It's a reply
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies?.map(reply => 
              reply.id === commentId 
                ? { ...reply, content: editText, updatedAt: new Date().toISOString() } 
                : reply
            ),
          }
        }
      } else if (comment.id === commentId) {
        // It's a top-level comment
        return { 
          ...comment, 
          content: editText,
          updatedAt: new Date().toISOString(),
        }
      }
      return comment
    })

    setComments(updatedComments)
    setEditingComment(null)
    setEditText("")
    
    toast({
      title: "Comment updated",
      description: "Your comment has been updated successfully",
    })
  }

  const handleDeleteComment = (commentId: string, parentId?: string) => {
    if (parentId) {
      // Delete a reply
      const updatedComments = comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies?.filter(reply => reply.id !== commentId),
          }
        }
        return comment
      })
      setComments(updatedComments)
    } else {
      // Delete a top-level comment
      setComments(comments.filter(comment => comment.id !== commentId))
    }

    toast({
      title: "Comment deleted",
      description: "Your comment has been deleted successfully",
    })
  }

  const handleLikeComment = (commentId: string, parentId?: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like comments",
        variant: "destructive",
      })
      return
    }

    const updatedComments = comments.map(comment => {
      if (parentId) {
        // Like a reply
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies?.map(reply => 
              reply.id === commentId 
                ? { ...reply, likes: reply.likes + 1 } 
                : reply
            ),
          }
        }
      } else if (comment.id === commentId) {
        // Like a top-level comment
        return { ...comment, likes: comment.likes + 1 }
      }
      return comment
    })

    setComments(updatedComments)
  }

  const handleReportComment = (commentId: string) => {
    toast({
      title: "Comment reported",
      description: "Thank you for reporting this comment. Our moderators will review it.",
    })
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      return b.likes - a.likes
    }
  })

  const renderComment = (comment: Comment, isReply = false, parentId?: string) => {
    const isCurrentUserComment = user && user.id === comment.userId
    const isEditing = editingComment === comment.id

    return (
      <div key={comment.id} className={`py-4 ${isReply ? 'ml-12 border-l-2 pl-4 border-border/50' : 'border-t border-border/10'}`}>
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.userAvatar} alt={comment.userName} />
            <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <div>
                <span className="font-semibold">{comment.userName}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {formatDate(comment.createdAt)}
                  {comment.updatedAt && (
                    <span className="ml-1 flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      edited
                    </span>
                  )}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isCurrentUserComment ? (
                    <>
                      <DropdownMenuItem onClick={() => handleEditComment(comment.id, parentId)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete comment</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this comment? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteComment(comment.id, parentId)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={() => handleReportComment(comment.id)}>
                      <Flag className="mr-2 h-4 w-4" />
                      Report
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <Textarea 
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)} 
                  rows={3}
                  className="w-full"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setEditingComment(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleSaveEdit(comment.id, parentId)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{comment.content}</p>
            )}

            <div className="flex items-center gap-4 pt-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
                onClick={() => handleLikeComment(comment.id, parentId)}
              >
                <Heart className="mr-1 h-4 w-4" />
                {comment.likes || 0}
              </Button>

              {!isReply && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setReplyTo(comment.id)}
                >
                  <Reply className="mr-1 h-4 w-4" />
                  Reply
                </Button>
              )}
            </div>

            {replyTo === comment.id && (
              <div className="mt-4 space-y-2">
                <Textarea 
                  placeholder="Write a reply..." 
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={2}
                  className="w-full"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setReplyTo(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSubmitComment}
                    disabled={isSubmitting || !newComment.trim()}
                  >
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </Button>
                </div>
              </div>
            )}

            {/* Render replies */}
            {!isReply && comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 space-y-4">
                {comment.replies.map(reply => 
                  renderComment(reply, true, comment.id)
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select 
            className="rounded-md border border-input bg-transparent px-2 py-1 text-sm focus:outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "latest" | "most-liked")}
          >
            <option value="latest">Latest</option>
            <option value="most-liked">Most Liked</option>
          </select>
        </div>
      </div>

      {/* New comment form */}
      {!replyTo && (
        <div className="space-y-2">
          <Textarea 
            placeholder={user ? "Write a comment..." : "Sign in to comment"}
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!user || isSubmitting}
            rows={3}
            className="w-full"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmitComment}
              disabled={!user || isSubmitting || !newComment.trim()}
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-0 divide-y divide-border/10">
        {sortedComments.length > 0 ? (
          sortedComments.map(comment => renderComment(comment))
        ) : (
          <p className="py-6 text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
} 