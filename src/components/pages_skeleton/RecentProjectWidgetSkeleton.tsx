import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { Badge } from '../ui/badge'

const RecentProjectWidgetSkeleton = () => {
  return (
    <div className="lg:col-span-2">
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            <Skeleton className="h-6 w-[140px]" /> {/* Recent Projects */}
          </CardTitle>
          <Skeleton className="h-9 w-[110px]" /> {/* Add Project button */}
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
            >
              {/* Project Image */}
              <Skeleton className="w-12 h-12 rounded-lg" />
              
              <div className="flex-1 min-w-0">
                {/* Project Name */}
                <Skeleton className="h-5 w-[180px] mb-2" />
                
                <div className="flex items-center gap-2">
                  {/* Status Badge */}
                  <div className="w-[60px]">
                    <Skeleton className="h-5" />
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="flex gap-1">
                    <div className="w-[60px]">
                      <Skeleton className="h-5" />
                    </div>
                    <div className="w-[60px]">
                      <Skeleton className="h-5" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Views Count */}
              <div className="text-right flex items-center gap-1">
                <Skeleton className="h-4 w-4" /> {/* Eye icon */}
                <Skeleton className="h-4 w-[40px]" /> {/* View count */}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default RecentProjectWidgetSkeleton 