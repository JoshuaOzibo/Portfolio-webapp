import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const RecentProjectWidgetSkeleton = () => {
  return (
    <div className="lg:col-span-2">
      <Card className="border-0 px-2 shadow-sm">
        <CardHeader className="flex  flex-row items-center justify-between">
          <CardTitle className="text-lg shadow-sm border border-gray-200 rounded-md font-semibold">
            <Skeleton className="h-6  w-[140px]" />
          </CardTitle>
          <Skeleton className="h-9 w-[110px] shadow-sm border border-gray-200 rounded-md" /> 
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 shadow-sm border border-gray-200 rounded-lg hover:border-slate-200 transition-colors"
            >
              {/* Project Image */}
              <Skeleton className="w-12 shadow-sm border border-gray-200 rounded-lg h-12" />
              
              <div className="flex-1 shadow-sm py-2 px-2 border border-gray-200 rounded-md min-w-0">
                {/* Project Name */}
                <Skeleton className="h-5 w-[180px] mb-2 shadow-sm border border-gray-200 rounded-md" />
                
                <div className="flex items-center gap-2">
                  {/* Status Badge */}
                  <div className="w-[60px]">
                        <Skeleton className="h-5 shadow-sm border border-gray-200 rounded-md" />
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="flex gap-1">
                    <div className="w-[60px]">
                      <Skeleton className="h-5 shadow-sm border border-gray-200 rounded-md" />
                    </div>
                    <div className="w-[60px]">
                      <Skeleton className="h-5 shadow-sm border border-gray-200 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Views Count */}
              <div className="text-right flex items-center gap-1">
                <Skeleton className="h-4 w-4 shadow-sm border border-gray-200 rounded-md" /> 
                <Skeleton className="h-4 w-[40px] shadow-sm border border-gray-200 rounded-md" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default RecentProjectWidgetSkeleton 