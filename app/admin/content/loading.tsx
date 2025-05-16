import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ContentManagementLoading() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[120px]" />
        </div>
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
          <CardHeader className="p-4">
            <Skeleton className="h-6 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4">
            <Skeleton className="h-5 w-[200px]" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-9 w-[80px]" />
              <Skeleton className="h-9 w-[80px]" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
