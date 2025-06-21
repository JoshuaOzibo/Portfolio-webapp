"use client";
import React, { useEffect, useState } from "react";
import { CardContent } from "../../components/ui/card";
import { Card } from "../../components/ui/card";
import { Code2, Briefcase, FolderOpen } from "lucide-react";
import RecentProjectWidget from "@/components/widget/RecentProjectWidget";
import QuickActionWidget from "@/components/widget/QuickActionWidget";
import { useGet } from "@/hooks/use-fetch";
import OverviewSkeleton from "../../components/pages_skeleton/overview.skeleton";
import { ApiResponse, MappedData } from "@/types/types";

const overview = () => {
  const [mappedData, setMappedData] = useState<MappedData | null>(null);
  
  const {
    data: projectsData,
    isLoading,
    error,
  } = useGet<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`);

  useEffect(() => {
    if (projectsData) {
      console.log(`projectsData:`, projectsData);

      const mapped: MappedData = {
        projects: {
          name: "Projects",
          value: String(projectsData.projects.length),
          change: "+2 this month"
        },
        skills: {
          name: "Skills",
          value: String(projectsData.skills.length),
          change: "+3 recently"
        },
        experience: {
          name: "Experience",
          value: String(projectsData.experiences.length),
          change: "Updated"
        }
      };
      setMappedData(mapped);
    }
  }, [projectsData]);

  if (isLoading || !mappedData) {
    return <OverviewSkeleton />;
  }

  const stats = [
    {
      ...mappedData.projects,
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      ...mappedData.skills,
      icon: Code2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      ...mappedData.experience,
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="w-full">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.name}
              className="border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <RecentProjectWidget recentProjects={projectsData?.projects || []} />

          {/* Quick Actions & Activity */}
          <QuickActionWidget />
        </div>
      </div>
    </div>
  );
};

export default overview;