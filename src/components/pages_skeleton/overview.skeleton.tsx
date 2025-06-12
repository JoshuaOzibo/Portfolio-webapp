import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import RecentProjectWidgetSkeleton from "./RecentProjectWidgetSkeleton";
import QuickActionWidgetSkeleton from "./QuickActionWidgetSkeleton";

const OverviewSkeleton = () => {
  return (
    <div className="w-full">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[80px] shadow-sm border border-gray-200 rounded-md" />
                  <Skeleton className="h-8 w-[50px] shadow-sm border border-gray-200 rounded-md" />
                  <Skeleton className="h-4 w-[100px] shadow-sm border border-gray-200 rounded-md" />
                </div>
                <div className="p-3 bg-gray-100 shadow-sm border border-gray-200 rounded-xl">
                  <Skeleton className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[60px] shadow-sm border border-gray-200 rounded-md" />
                  <Skeleton className="h-8 w-[30px] shadow-sm border border-gray-200 rounded-md" />
                  <Skeleton className="h-4 w-[100px] shadow-sm border border-gray-200 rounded-md" />
                </div>
                <div className="p-3 bg-gray-100 shadow-sm border border-gray-200 rounded-xl">
                  <Skeleton className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Card */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[100px] shadow-sm border border-gray-200 rounded-md" />
                  <Skeleton className="h-8 w-[80px] shadow-sm border border-gray-200 rounded-md" />
                  <Skeleton className="h-4 w-[70px] shadow-sm border border-gray-200 rounded-md" />
                </div>
                <div className="p-3 bg-gray-100 shadow-sm border border-gray-200 rounded-xl">
                  <Skeleton className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RecentProjectWidgetSkeleton />
          <QuickActionWidgetSkeleton />
        </div>
      </div>
    </div>
  );
};

export default OverviewSkeleton;
