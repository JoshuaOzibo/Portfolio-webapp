import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FolderOpen,
  Code2,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Eye,
  Plus,
  ExternalLink,
  BarChart3,
} from "lucide-react"

export default function DashboardOverview() {
  const stats = [
    {
      name: "Projects",
      value: "8",
      change: "+2 this month",
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Skills",
      value: "24",
      change: "+3 recently",
      icon: Code2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Experience",
      value: "5+ years",
      change: "Updated",
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      name: "Messages",
      value: "12",
      change: "3 unread",
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const recentProjects = [
    {
      name: "E-commerce Platform",
      status: "Live",
      image: "/placeholder.svg?height=60&width=60",
      tech: ["React", "Node.js"],
      views: "1.2k",
    },
    {
      name: "Task Manager",
      status: "In Progress",
      image: "/placeholder.svg?height=60&width=60",
      tech: ["Vue.js", "Firebase"],
      views: "856",
    },
    {
      name: "Weather App",
      status: "Live",
      image: "/placeholder.svg?height=60&width=60",
      tech: ["React", "API"],
      views: "2.1k",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, John! 👋</h1>
          <p className="text-slate-600 mt-2">Here's what's happening with your portfolio today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
            <ExternalLink className="h-4 w-4" />
            View Portfolio
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
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
                  <img
                    src={project.image || "/placeholder.svg"}
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

        {/* Quick Actions & Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Plus className="h-4 w-4 text-blue-600" />
                </div>
                Add New Project
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Code2 className="h-4 w-4 text-green-600" />
                </div>
                Update Skills
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                </div>
                Check Messages
              </Button>
            </CardContent>
          </Card>

          {/* Portfolio Performance */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Views</span>
                <span className="font-semibold text-slate-900">4.2k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">This Month</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-600">+23%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Contact Forms</span>
                <span className="font-semibold text-slate-900">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Resume Downloads</span>
                <span className="font-semibold text-slate-900">47</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
