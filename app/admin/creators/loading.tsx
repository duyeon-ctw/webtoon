import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-[100px] mb-2" />
              <Skeleton className="h-4 w-[140px] mb-2" />
              <Skeleton className="h-2 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-[150px]" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-2 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  )
}
