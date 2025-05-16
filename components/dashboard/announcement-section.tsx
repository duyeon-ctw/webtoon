import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreatorAnnouncement } from "@/lib/types"
import { MessageSquare, ThumbsUp } from "lucide-react"

const announcements: CreatorAnnouncement[] = [
  {
    id: "1",
    title: "새로운 에피소드 업데이트 안내",
    content: "안녕하세요! 이번 주 에피소드는 특별히 더 긴 분량으로 준비했습니다. 많은 관심 부탁드립니다!",
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20"),
    isPinned: true,
    likes: 1234,
    comments: 567,
  },
  {
    id: "2",
    title: "휴재 안내",
    content: "다음 주는 작품의 퀄리티 향상을 위해 휴재합니다. 양해 부탁드립니다.",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
    isPinned: false,
    likes: 890,
    comments: 234,
  },
]

export function AnnouncementSection() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">공지사항</h2>
        <Button>새 공지사항 작성</Button>
      </div>
      <div className="grid gap-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{announcement.title}</CardTitle>
                  <CardDescription>
                    {announcement.createdAt.toLocaleDateString()}
                  </CardDescription>
                </div>
                {announcement.isPinned && (
                  <span className="text-sm text-primary">고정됨</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{announcement.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  {announcement.likes.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  {announcement.comments.toLocaleString()}
                </div>
              </div>
              <Button variant="ghost">수정</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 