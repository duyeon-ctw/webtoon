import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentActivity {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  type: 'comment' | 'like' | 'subscription';
  webtoonTitle: string;
  episode?: number;
  timestamp: Date;
}

const recentActivities: RecentActivity[] = [
  {
    id: "1",
    user: {
      name: "Alex Chen",
      email: "alex@example.com",
      avatar: "",
    },
    type: "comment",
    webtoonTitle: "우주 모험",
    episode: 52,
    timestamp: new Date("2024-03-20T14:30:00"),
  },
  {
    id: "2",
    user: {
      name: "Sarah Kim",
      email: "sarah@example.com",
      avatar: "",
    },
    type: "like",
    webtoonTitle: "마법 학교",
    episode: 45,
    timestamp: new Date("2024-03-20T12:45:00"),
  },
  {
    id: "3",
    user: {
      name: "John Lee",
      email: "john@example.com",
      avatar: "",
    },
    type: "subscription",
    webtoonTitle: "우주 모험",
    timestamp: new Date("2024-03-20T10:15:00"),
  },
  {
    id: "4",
    user: {
      name: "Emily Park",
      email: "emily@example.com",
      avatar: "",
    },
    type: "comment",
    webtoonTitle: "마법 학교",
    episode: 44,
    timestamp: new Date("2024-03-19T23:30:00"),
  },
  {
    id: "5",
    user: {
      name: "David Wong",
      email: "david@example.com",
      avatar: "",
    },
    type: "like",
    webtoonTitle: "우주 모험",
    episode: 51,
    timestamp: new Date("2024-03-19T22:10:00"),
  },
];

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar || "/placeholder-avatar.png"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.type === "comment" && `댓글을 달았습니다: ${activity.webtoonTitle} ${activity.episode}화`}
              {activity.type === "like" && `좋아요를 눌렀습니다: ${activity.webtoonTitle} ${activity.episode}화`}
              {activity.type === "subscription" && `구독했습니다: ${activity.webtoonTitle}`}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ))}
    </div>
  )
} 