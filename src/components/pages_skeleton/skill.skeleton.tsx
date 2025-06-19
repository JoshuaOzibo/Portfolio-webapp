'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkillSkeleton() {
  return (
    <Card className="border-0 w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          <Skeleton className="h-6 w-32 shadow-sm border border-gray-200" />
        </CardTitle>
        <Skeleton className="h-9 w-24 shadow-sm border border-gray-200" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((linkIndex) => (
            <main key={linkIndex} className="p-4 w-full border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <Skeleton className="h-5 w-5 shadow-sm border border-gray-200 rounded" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-20 shadow-sm border border-gray-200" />
                    <Skeleton className="h-4 w-48 shadow-sm border border-gray-200" />
                  </div>
                </div>
                <div className="flex md:block hidden gap-2">
                  <Skeleton className="h-8 w-8 shadow-sm border border-gray-200 rounded" />
                  <Skeleton className="h-8 w-8 shadow-sm border border-gray-200 rounded" />
                </div>
              </div>

              <div className="flex justify-end gap-2 md:hidden block mt-4">
                <Skeleton className="h-8 w-8 shadow-sm border border-gray-200 rounded" />
                <Skeleton className="h-8 w-8 shadow-sm border border-gray-200 rounded" />
              </div>
            </main>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
