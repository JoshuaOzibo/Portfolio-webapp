import React from 'react'
import { CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Card } from '../../components/ui/card';
import { FolderOpen } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {  Plus, Code2, Briefcase, MessageSquare, TrendingUp, Eye } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import RecentProjectWidget from '@/components/widget/RecentProjectWidget';

const overview = () => {
    const stats = [
        {
          name: "Projects",
          value: "51",
          change: "+2 this month",
          icon: FolderOpen,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          name: "Skills",
          value: "8",
          change: "+3 recently",
          icon: Code2,
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          name: "Experience",
          value: "3+ years",
          change: "Updated",
          icon: Briefcase,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        }
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
      ];

  return (
    <div className=''>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <RecentProjectWidget recentProjects={recentProjects} /> 

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
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default overview
