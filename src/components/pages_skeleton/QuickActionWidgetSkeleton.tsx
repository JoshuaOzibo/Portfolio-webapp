import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const QuickActionWidgetSkeleton = () => {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <Skeleton className="h-6 w-[150px]" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 flex-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default QuickActionWidgetSkeleton 