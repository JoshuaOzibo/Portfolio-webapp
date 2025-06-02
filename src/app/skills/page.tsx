"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, Trash2, Code2, Database, Wrench, Star } from "lucide-react"

export default function SkillsPage() {
  const [skills, setSkills] = useState({
    frontend: [
      { id: 1, name: "React", level: "Expert", progress: 95, years: 4 },
      { id: 2, name: "TypeScript", level: "Advanced", progress: 85, years: 3 },
      { id: 3, name: "Next.js", level: "Advanced", progress: 80, years: 2 },
      { id: 4, name: "Vue.js", level: "Intermediate", progress: 70, years: 2 },
      { id: 5, name: "Tailwind CSS", level: "Expert", progress: 90, years: 3 },
    ],
    backend: [
      { id: 6, name: "Node.js", level: "Advanced", progress: 85, years: 4 },
      { id: 7, name: "Python", level: "Intermediate", progress: 75, years: 2 },
      { id: 8, name: "PostgreSQL", level: "Advanced", progress: 80, years: 3 },
      { id: 9, name: "MongoDB", level: "Intermediate", progress: 70, years: 2 },
      { id: 10, name: "Express.js", level: "Advanced", progress: 85, years: 3 },
    ],
    tools: [
      { id: 11, name: "Git", level: "Expert", progress: 95, years: 5 },
      { id: 12, name: "Docker", level: "Intermediate", progress: 65, years: 1 },
      { id: 13, name: "AWS", level: "Intermediate", progress: 70, years: 2 },
      { id: 14, name: "Figma", level: "Advanced", progress: 80, years: 3 },
      { id: 15, name: "VS Code", level: "Expert", progress: 95, years: 5 },
    ],
  })

  const [isAddingSkill, setIsAddingSkill] = useState(false)

  const skillCategories = [
    {
      key: "frontend",
      label: "Frontend Development",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      key: "backend",
      label: "Backend Development",
      icon: Database,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      key: "tools",
      label: "Tools & Technologies",
      icon: Wrench,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
  ]

  const getLevelColor = (level) => {
    switch (level) {
      case "Expert":
        return "bg-green-100 text-green-800 border-green-200"
      case "Advanced":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Beginner":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 90) return "bg-green-500"
    if (progress >= 75) return "bg-blue-500"
    if (progress >= 60) return "bg-yellow-500"
    return "bg-gray-400"
  }

  const totalSkills = Object.values(skills).flat().length
  const expertSkills = Object.values(skills)
    .flat()
    .filter((skill) => skill.level === "Expert").length
  const avgProgress = Math.round(
    Object.values(skills)
      .flat()
      .reduce((acc, skill) => acc + skill.progress, 0) / totalSkills,
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Skills & Expertise</h1>
          <p className="text-slate-600 mt-2">Manage your technical skills and proficiency levels</p>
        </div>
        <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="skillName">Skill Name</Label>
                <Input id="skillName" placeholder="e.g., React, Python, Docker" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend Development</SelectItem>
                    <SelectItem value="backend">Backend Development</SelectItem>
                    <SelectItem value="tools">Tools & Technologies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Proficiency Level</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="years">Years of Experience</Label>
                <Input id="years" type="number" placeholder="2" className="mt-2" />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingSkill(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddingSkill(false)}>Add Skill</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Skills</p>
                <p className="text-2xl font-bold text-slate-900">{totalSkills}</p>
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
                <p className="text-sm text-slate-600">Expert Level</p>
                <p className="text-2xl font-bold text-slate-900">{expertSkills}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Star className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Proficiency</p>
                <p className="text-2xl font-bold text-slate-900">{avgProgress}%</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Database className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Categories</p>
                <p className="text-2xl font-bold text-slate-900">{skillCategories.length}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <Wrench className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {skillCategories.map((category) => (
          <Card key={category.key} className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${category.bgColor}`}>
                  <category.icon className={`h-6 w-6 ${category.textColor}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{category.label}</h3>
                  <p className="text-sm text-slate-500">{skills[category.key].length} skills</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills[category.key].map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-slate-900">{skill.name}</h4>
                      <p className="text-xs text-slate-500">{skill.years} years experience</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs border ${getLevelColor(skill.level)}`}>{skill.level}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Proficiency</span>
                      <span className="font-medium text-slate-900">{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(skill.progress)}`}
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
