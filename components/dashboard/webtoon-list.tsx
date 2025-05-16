import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { WebtoonStats } from "@/lib/types"

const webtoons: WebtoonStats[] = [
  {
    webtoonId: "1",
    title: "우주 모험",
    views: 1234567,
    comments: 23456,
    likes: 345678,
    revenue: 12345678,
    subscribers: 98765,
    lastUpdated: new Date("2024-03-20"),
    episodeCount: 52,
  },
  {
    webtoonId: "2",
    title: "마법 학교",
    views: 987654,
    comments: 12345,
    likes: 234567,
    revenue: 9876543,
    subscribers: 87654,
    lastUpdated: new Date("2024-03-19"),
    episodeCount: 45,
  },
  // Add more mock data as needed
]

export function WebtoonList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">웹툰 목록</h2>
        <Button>새 웹툰 등록</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead className="text-right">조회수</TableHead>
            <TableHead className="text-right">댓글</TableHead>
            <TableHead className="text-right">좋아요</TableHead>
            <TableHead className="text-right">구독자</TableHead>
            <TableHead className="text-right">수익</TableHead>
            <TableHead className="text-right">에피소드</TableHead>
            <TableHead>최근 업데이트</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {webtoons.map((webtoon) => (
            <TableRow key={webtoon.webtoonId}>
              <TableCell className="font-medium">{webtoon.title}</TableCell>
              <TableCell className="text-right">{webtoon.views.toLocaleString()}</TableCell>
              <TableCell className="text-right">{webtoon.comments.toLocaleString()}</TableCell>
              <TableCell className="text-right">{webtoon.likes.toLocaleString()}</TableCell>
              <TableCell className="text-right">{webtoon.subscribers.toLocaleString()}</TableCell>
              <TableCell className="text-right">₩{webtoon.revenue.toLocaleString()}</TableCell>
              <TableCell className="text-right">{webtoon.episodeCount}</TableCell>
              <TableCell>{webtoon.lastUpdated.toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="ghost">관리</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 