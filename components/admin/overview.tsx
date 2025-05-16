import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, DollarSign, AlertTriangle } from "lucide-react"

export function AdminOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 사용자</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">123,456</div>
          <p className="text-xs text-muted-foreground">
            +2,345 지난 달 대비
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 웹툰</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3,456</div>
          <p className="text-xs text-muted-foreground">
            +123 지난 달 대비
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 매출</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₩234,567,890</div>
          <p className="text-xs text-muted-foreground">
            +12.3% 지난 달 대비
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">신고된 콘텐츠</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">123</div>
          <p className="text-xs text-muted-foreground">
            -12% 지난 달 대비
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 