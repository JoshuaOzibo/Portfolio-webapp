import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const QuickActionWidgetSkeleton = () => {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg shadow-sm border border-gray-200 rounded-md font-semibold">
            <Skeleton className="h-6 w-[130px]" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Add New Project Button */}
          <div className="flex items-center px-2 shadow-sm border border-gray-200 rounded-md gap-3 h-12">
            <div className="p-2 bg-blue-50 shadow-sm border border-gray-200 rounded-lg">
              <Skeleton className="h-4 w-4" /> {/* Plus icon */}
            </div>
            <Skeleton className="h-4 flex-1" /> {/* Add New Project text */}
          </div>

          {/* Update Skills Button */}
          <div className="flex items-center px-2 shadow-sm border border-gray-200 rounded-md gap-3 h-12">
            <div className="p-2 bg-green-50 shadow-sm border border-gray-200 rounded-lg">
              <Skeleton className="h-4 w-4" /> {/* Code2 icon */}
            </div>
            <Skeleton className="h-4 flex-1" /> {/* Update Skills text */}
          </div>

          {/* Update Experience Button */}
          <div className="flex items-center px-2 shadow-sm border border-gray-200 rounded-md gap-3 h-12">
            <div className="p-2 bg-purple-50 shadow-sm border border-gray-200 rounded-lg">
              <Skeleton className="h-4 w-4" /> {/* Briefcase icon */}
            </div>
            <Skeleton className="h-4 flex-1" /> {/* Update Experience text */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuickActionWidgetSkeleton 