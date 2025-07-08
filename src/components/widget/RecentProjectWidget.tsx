import { Eye, Plus } from "lucide-react";
import { Card } from "../ui/card";
import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";
import { Project } from "@/types/types";
import EmptyState from "../re-usable_ui/empty_component";

const RecentProjectWidget = ({
  recentProjects,
}: {
  recentProjects: Project[];
}) => {
  return (
    <div className="lg:col-span-2">
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex gap-2 flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Recent Projects
          </CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentProjects.length > 0 ? recentProjects.map((project, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <Image
                width={100}
                height={100}
                src={project.image}
                alt={project.title}
                className="w-12 h-12 rounded-lg object-cover bg-slate-100"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 truncate">
                  {project.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                  <Badge
                    variant={project.liveLink ? "default" : "secondary"}
                    className="text-xs w-fit"
                  >
                    {project.liveLink ? "Live" : "Draft"}
                  </Badge>
                  <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
                    {project.skills.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.skills.length > 2 && (
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded whitespace-nowrap">
                        +{project.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right md:flex hidden">
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Eye className="h-4 w-4" />
                  10k
                </div>
              </div>
            </div>
            )) : <EmptyState title="No projects found" description="You've processed all your projects" />}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentProjectWidget;
