"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Reply, Flag, Trash2, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CommentSectionProps {
  contentId: string
  contentType: "episode" | "webtoon" | "post"
}

interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  likes: number
  createdAt: Date
  replies?: Comment[]
  isLiked?: boolean
}

// Mock data for comments
const mockComments: Comment[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Elise Kim",
    userAvatar: "/placeholder-user.jpg",
    content: "이번 에피소드는 정말 재밌었어요! 다음 화가 기대됩니다.",
    likes: 24,
    createdAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    isLiked: true,
    replies: [
      {
        id: "1-1",
        userId: "user2",
        userName: "Ryan Chen",
        userAvatar: "/placeholder-user.jpg",
        content: "저도 동의해요! 주인공의 캐릭터 성장이 인상적이었어요.",
        likes: 7,
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      },
    ],
  },
  {
    id: "2",
    userId: "user3",
    userName: "Alex Johnson",
    userAvatar: "/placeholder-user.jpg",
    content: "그림체가 전보다 더 좋아진 것 같아요. 작가님 노력이 보입니다!",
    likes: 18,
    createdAt: new Date(Date.now() - 3600000 * 5), // 5 hours ago
  },
  {
    id: "3",
    userId: "user4",
    userName: "Mina Park",
    userAvatar: "/placeholder-user.jpg",
    content: "중간 부분에서 반전이 있을 줄 몰랐어요... 너무 놀라웠어요!",
    likes: 31,
    createdAt: new Date(Date.now() - 3600000 * 8), // 8 hours ago
  },
]

export function CommentSection({ contentId, contentType }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState<string>("") 
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState<string>("") 
  
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}분 전`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간 전`
    } else {
      return `${Math.floor(diffInHours / 24)}일 전`
    }
  }
  
  const handleLike = (commentId: string) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked,
                }
              }
              return reply
            }),
          }
        }
        
        return comment
      })
    })
  }
  
  const handlePostComment = () => {
    if (!newComment.trim()) return
    
    const newCommentObj: Comment = {
      id: `${Date.now()}`,
      userId: "currentUser", // Normally would be the actual user ID
      userName: "You", // Would normally get from auth context
      content: newComment,
      likes: 0,
      createdAt: new Date(),
      isLiked: false,
    }
    
    setComments(prev => [newCommentObj, ...prev])
    setNewComment("") 
  }
  
  const handlePostReply = (parentId: string) => {
    if (!replyContent.trim()) return
    
    const newReply: Comment = {
      id: `${parentId}-${Date.now()}`,
      userId: "currentUser", // Normally would be the actual user ID
      userName: "You", // Would normally get from auth context
      content: replyContent,
      likes: 0,
      createdAt: new Date(),
      isLiked: false,
    }
    
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          }
        }
        return comment
      })
    })
    
    setReplyingTo(null)
    setReplyContent("") 
  }
  
  const handleDelete = (commentId: string) => {
    // First check if it's a top-level comment
    if (comments.some(c => c.id === commentId)) {
      setComments(prev => prev.filter(c => c.id !== commentId))
      return
    }
    
    // If not found at top level, check replies
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.replies?.some(r => r.id === commentId)) {
          return {
            ...comment,
            replies: comment.replies.filter(r => r.id !== commentId)
          }
        }
        return comment
      })
    })
  }
  
  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`flex gap-3 ${isReply ? 'ml-12 mt-3' : 'mt-6'}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.userAvatar} alt={comment.userName} />
        <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium text-sm">{comment.userName}</div>
            <div className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</div>
          </div>
          
          {comment.userId === "currentUser" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDelete(comment.id)} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <div className="mt-1 text-sm">{comment.content}</div>
        
        <div className="mt-2 flex gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 px-2 ${comment.isLiked ? 'text-primary' : ''}`}
            onClick={() => handleLike(comment.id)}
          >
            <Heart className="mr-1 h-4 w-4" />
            {comment.likes > 0 && comment.likes}
          </Button>
          
          {!isReply && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            >
              <Reply className="mr-1 h-4 w-4" />
              Reply
            </Button>
          )}
          
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Flag className="mr-1 h-4 w-4" />
            Report
          </Button>
        </div>
        
        {replyingTo === comment.id && (
          <div className="mt-3">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setReplyingTo(null)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={() => handlePostReply(comment.id)}
              >
                Reply
              </Button>
            </div>
          </div>
        )}
        
        {comment.replies?.map(reply => renderComment(reply, true))}
      </div>
    </div>
  )
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Comments ({comments.reduce((acc, comment) => 
          acc + 1 + (comment.replies?.length || 0), 0)
        })</h2>
      </div>
      
      <div className="space-y-4">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[120px]"
        />
        <div className="flex justify-end">
          <Button onClick={handlePostComment}>
            Post Comment
          </Button>
        </div>
      </div>
      
      <div className="space-y-1">
        {comments.map(comment => renderComment(comment))}
      </div>
      
      {comments.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  )
} 