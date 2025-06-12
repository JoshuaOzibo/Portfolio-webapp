import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Code2, ExternalLink } from "lucide-react";

export default function ProjectsPageSkeleton() {
  // Create an array of 6 items for the project grid
  const skeletonProjects = Array(6).fill(null);

  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <Skeleton className="h-9 w-48 mb-2" /> {/* Title */}
          <Skeleton className="h-5 w-96" /> {/* Description */}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-16" /> {/* Grid button */}
            <Skeleton className="h-9 w-16" /> {/* List button */}
          </div>
          <Skeleton className="h-9 w-[120px]" /> {/* Add Project button */}
        </div>
      </div>

      {/* Projects Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-24 mb-2" /> {/* Total Projects label */}
                <Skeleton className="h-8 w-16" /> {/* Projects count */}
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Code2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-24 mb-2" /> {/* Live Projects label */}
                <Skeleton className="h-8 w-16" /> {/* Live count */}
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <ExternalLink className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skeletonProjects.map((_, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <Skeleton className="w-full h-48 rounded-t-lg" /> {/* Project image */}
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-6 w-3/4 mb-2" /> {/* Project title */}
                  <Skeleton className="h-4 w-full mb-1" /> {/* Description line 1 */}
                  <Skeleton className="h-4 w-5/6" /> {/* Description line 2 */}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16" /> {/* Tech badge 1 */}
                  <Skeleton className="h-6 w-16" /> {/* Tech badge 2 */}
                  <Skeleton className="h-6 w-16" /> {/* Tech badge 3 */}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <Skeleton className="h-5 w-24" /> {/* Date */}
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" /> {/* Live link button */}
                    <Skeleton className="h-8 w-8" /> {/* GitHub button */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 