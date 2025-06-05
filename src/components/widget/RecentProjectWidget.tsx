
import { Eye, Plus } from 'lucide-react'
import { Card } from '../ui/card'
import React from 'react'
import { CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import Image from 'next/image'

interface RecentProject {
  name: string;
  image: string;
  status: string;
  tech: string[];
  views: string;
}

const RecentProjectWidget = ({ recentProjects }: { recentProjects: RecentProject[] }) => {
  return (
    <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Projects</CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={project.image}
                      alt={project.name}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 truncate">{project.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={project.status === "Live" ? "default" : "secondary"} className="text-xs">
                          {project.status}
                        </Badge>
                        <div className="flex gap-1">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Eye className="h-4 w-4" />
                        {project.views}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
  )
}

export default RecentProjectWidget
