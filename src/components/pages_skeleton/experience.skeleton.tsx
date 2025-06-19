'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ExperienceSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 md:h-9" />
          <Skeleton className="h-5 w-80" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Experience Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-16 md:h-8" />
                </div>
                <div className="p-3 hidden lg:block md:hidden sm:block bg-slate-100 rounded-xl">
                  <Skeleton className="h-6 w-6 rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Experience Cards Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3].map((cardIndex) => (
          <Card key={cardIndex} className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 md:block hidden bg-slate-100 rounded-lg">
                      <Skeleton className="h-5 w-5 rounded" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48 md:h-7" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>

                  <div className="flex items-center gap-6 text-sm text-slate-600 mb-4 md:flex-row flex-col">
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </div>
                <div className="flex lg:block hidden gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>

              <div className="space-y-6">
                {/* Description Section */}
                <div>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>

                {/* Key Achievements Section */}
                <div>
                  <Skeleton className="h-5 w-32 mb-3" />
                  <ul className="space-y-2">
                    {[1, 2, 3].map((achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start gap-2">
                        <Skeleton className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" />
                        <Skeleton className="h-4 w-full" />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Section */}
                <div>
                  <Skeleton className="h-5 w-36 mb-3" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((techIndex) => (
                      <Skeleton key={techIndex} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </div>

                {/* Mobile Buttons */}
                <div className="flex gap-2 lg:hidden block">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
