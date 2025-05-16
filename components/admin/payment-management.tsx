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
import { Search } from "lucide-react"

interface Payment {
  id: string;
  userId: string;
  username: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed" | "refunded";
  date: Date;
  description: string;
}

const payments: Payment[] = [
  {
    id: "1",
    userId: "user123",
    username: "john_doe",
    amount: 10000,
    method: "신용카드",
    status: "completed",
    date: new Date("2024-03-20"),
    description: "코인 충전 (100코인)",
  },
  {
    id: "2",
    userId: "user456",
    username: "jane_smith",
    amount: 20000,
    method: "페이팔",
    status: "completed",
    date: new Date("2024-03-19"),
    description: "코인 충전 (200코인)",
  },
  {
    id: "3",
    userId: "user789",
    username: "alex_kim",
    amount: 5000,
    method: "휴대폰 결제",
    status: "failed",
    date: new Date("2024-03-18"),
    description: "코인 충전 (50코인)",
  },
  {
    id: "4",
    userId: "creator123",
    username: "creator_studio",
    amount: 450000,
    method: "계좌 이체",
    status: "pending",
    date: new Date("2024-03-18"),
    description: "크리에이터 정산",
  },
  {
    id: "5",
    userId: "user234",
    username: "mike_lee",
    amount: 15000,
    method: "신용카드",
    status: "refunded",
    date: new Date("2024-03-17"),
    description: "코인 충전 (150코인) - 환불",
  },
];

export function PaymentManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPayments = payments.filter(
    (payment) =>
      payment.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="결제 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button>결제 내역 다운로드</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>결제 ID</TableHead>
            <TableHead>사용자</TableHead>
            <TableHead className="text-right">금액</TableHead>
            <TableHead>결제 방법</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>설명</TableHead>
            <TableHead>작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>{payment.username}</TableCell>
              <TableCell className="text-right">₩{payment.amount.toLocaleString()}</TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    payment.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : payment.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : payment.status === "failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {payment.status}
                </span>
              </TableCell>
              <TableCell>{payment.date.toLocaleDateString()}</TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">상세</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 