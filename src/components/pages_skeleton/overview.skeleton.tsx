import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import RecentProjectWidgetSkeleton from '@/components/pages_skeleton/RecentProjectWidgetSkeleton'
import QuickActionWidgetSkeleton from '@/components/pages_skeleton/QuickActionWidgetSkeleton'

const OverviewSkeleton = () => {
  return (
    <div className="w-full">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-8 w-[80px]" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-xl" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RecentProjectWidgetSkeleton />
          <QuickActionWidgetSkeleton />
        </div>
      </div>
    </div>
  )
}

export default OverviewSkeleton 