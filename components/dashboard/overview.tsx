import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "1월",
    total: 1234,
  },
  {
    name: "2월",
    total: 2345,
  },
  {
    name: "3월",
    total: 3456,
  },
  {
    name: "4월",
    total: 4567,
  },
  {
    name: "5월",
    total: 5678,
  },
  {
    name: "6월",
    total: 6789,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}명`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 