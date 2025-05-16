import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ContentModerationLoading() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[150px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-[50px] mb-1" />
              <Skeleton className="h-4 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-[300px]" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[130px]" />
            <Skeleton className="h-10 w-[130px]" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
