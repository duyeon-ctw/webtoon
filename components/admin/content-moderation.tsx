import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Search } from "lucide-react"

interface ReportedContent {
  id: string;
  contentType: "webtoon" | "episode" | "comment";
  title: string;
  author: string;
  reportReason: string;
  reportCount: number;
  reportDate: Date;
  status: "pending" | "approved" | "rejected";
}

const reportedContent: ReportedContent[] = [
  {
    id: "1",
    contentType: "comment",
    title: "스팸 링크 포함된 댓글",
    author: "user123",
    reportReason: "스팸",
    reportCount: 15,
    reportDate: new Date("2024-03-20"),
    status: "pending",
  },
  {
    id: "2",
    contentType: "episode",
    title: "부적절한 내용 포함된 에피소드",
    author: "creator456",
    reportReason: "부적절한 내용",
    reportCount: 8,
    reportDate: new Date("2024-03-19"),
    status: "pending",
  },
  {
    id: "3",
    contentType: "webtoon",
    title: "저작권 침해 의심 웹툰",
    author: "creator789",
    reportReason: "저작권 침해",
    reportCount: 12,
    reportDate: new Date("2024-03-18"),
    status: "pending",
  },
  // Add more mock data as needed
];

export function ContentModeration() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredContent = reportedContent.filter(
    (content) => {
      const matchesSearch = 
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        filterStatus === "all" || 
        content.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    }
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="콘텐츠 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select 
            value={filterStatus} 
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="상태 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 상태</SelectItem>
              <SelectItem value="pending">대기 중</SelectItem>
              <SelectItem value="approved">승인됨</SelectItem>
              <SelectItem value="rejected">거부됨</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>콘텐츠 유형</TableHead>
            <TableHead>제목</TableHead>
            <TableHead>작성자</TableHead>
            <TableHead>신고 사유</TableHead>
            <TableHead>신고 횟수</TableHead>
            <TableHead>신고 날짜</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContent.map((content) => (
            <TableRow key={content.id}>
              <TableCell>{content.contentType}</TableCell>
              <TableCell className="font-medium">{content.title}</TableCell>
              <TableCell>{content.author}</TableCell>
              <TableCell>{content.reportReason}</TableCell>
              <TableCell>{content.reportCount}</TableCell>
              <TableCell>{content.reportDate.toLocaleDateString()}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    content.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : content.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {content.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">승인</Button>
                  <Button variant="outline" size="sm">거부</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 