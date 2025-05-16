import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-12 w-[80%] sm:h-16" />
                <Skeleton className="h-4 w-[60%] sm:h-6" />
                <Skeleton className="h-4 w-[40%] sm:h-6" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Skeleton className="w-full max-w-[500px] aspect-square rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Categories Skeleton */}
      <section className="w-full py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-4">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-12 w-12 rounded-full mb-3" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Webtoons Skeleton */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-1">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="hidden md:block h-6 w-24" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[2/3] w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-[80%]" />
                  <Skeleton className="h-4 w-[60%]" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
