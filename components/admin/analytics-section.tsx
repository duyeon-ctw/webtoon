import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const userActivityData = [
  {
    name: "1월",
    "활성 사용자": 14000,
    "신규 가입": 2400,
  },
  {
    name: "2월",
    "활성 사용자": 15000,
    "신규 가입": 2200,
  },
  {
    name: "3월",
    "활성 사용자": 18000,
    "신규 가입": 3200,
  },
  {
    name: "4월",
    "활성 사용자": 19500,
    "신규 가입": 2800,
  },
  {
    name: "5월",
    "활성 사용자": 22000,
    "신규 가입": 3800,
  },
  {
    name: "6월",
    "활성 사용자": 24000,
    "신규 가입": 4100,
  },
]

const revenueData = [
  {
    name: "1월",
    "구독": 250000000,
    "코인 충전": 180000000,
  },
  {
    name: "2월",
    "구독": 270000000,
    "코인 충전": 190000000,
  },
  {
    name: "3월",
    "구독": 300000000,
    "코인 충전": 220000000,
  },
  {
    name: "4월",
    "구독": 310000000,
    "코인 충전": 240000000,
  },
  {
    name: "5월",
    "구독": 350000000,
    "코인 충전": 270000000,
  },
  {
    name: "6월",
    "구독": 380000000,
    "코인 충전": 290000000,
  },
]

const contentMetricsData = [
  {
    name: "로맨스",
    "조회수": 5400000,
    "구독자": 340000,
  },
  {
    name: "액션",
    "조회수": 4200000,
    "구독자": 270000,
  },
  {
    name: "판타지",
    "조회수": 4800000,
    "구독자": 310000,
  },
  {
    name: "코미디",
    "조회수": 3600000,
    "구독자": 230000,
  },
  {
    name: "드라마",
    "조회수": 3200000,
    "구독자": 200000,
  },
  {
    name: "SF",
    "조회수": 2800000,
    "구독자": 180000,
  },
]

export function AnalyticsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>사용자 활동</CardTitle>
          <CardDescription>월별 활성 사용자 및 신규 가입자 수</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userActivityData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="활성 사용자"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="신규 가입"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>수익 분석</CardTitle>
          <CardDescription>월별 수익 현황</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => `₩${parseInt(value).toLocaleString()}`}
              />
              <Bar dataKey="구독" fill="#8884d8" />
              <Bar dataKey="코인 충전" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-7">
        <CardHeader>
          <CardTitle>장르별 콘텐츠 성과</CardTitle>
          <CardDescription>장르별 조회수 및 구독자 수</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contentMetricsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => parseInt(value).toLocaleString()}
              />
              <Bar dataKey="조회수" fill="#8884d8" />
              <Bar dataKey="구독자" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
} 