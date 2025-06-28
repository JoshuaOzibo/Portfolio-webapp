"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Building, Calendar, MapPin, Clock } from "lucide-react"
import ExperienceStat from "@/components/experienceStat"
import ExperienceSkeleton from "@/components/pages_skeleton/experience.skeleton"

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: "Tech Solutions Inc.",
      position: "Senior Full Stack Developer",
      startDate: "2022-01",
      endDate: "Present",
      type: "Full-time",
      achievements: [
        "Led a team of 5 developers on a major e-commerce platform",
        "Increased application performance by 40% through optimization",
        "Implemented automated testing reducing bugs by 60%",
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
      current: true,
    },
    {
      id: 2,
      company: "Digital Agency Co.",
      position: "Frontend Developer",
      startDate: "2020-06",
      endDate: "2021-12",
      type: "Full-time",
      achievements: [
        "Delivered 15+ client projects on time and within budget",
        "Improved website loading speed by 35% on average",
        "Mentored 2 junior developers",
      ],
      technologies: ["Vue.js", "JavaScript", "SCSS", "Webpack", "Figma"],
      current: false,
    },
    {
      id: 3,
      company: "StartupXYZ",
      position: "Junior Web Developer",
      startDate: "2019-03",
      endDate: "2020-05",
      type: "Full-time",
      achievements: [
        "Developed company's main website from scratch",
        "Created internal dashboard for team productivity tracking",
        "Reduced manual processes by 25% through automation",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      current: false,
    },
  ])

  const [isAddingExperience, setIsAddingExperience] = useState(false)


  const totalExperience = experiences.reduce((total, exp) => {
    const start = new Date(exp.startDate)
    const end = exp.endDate === "Present" ? new Date() : new Date(exp.endDate)
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    return total + months
  }, 0)

  const totalYears = Math.floor(totalExperience / 12)
  const totalMonths = totalExperience % 12

  return (
    <>
      {
        true ? (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="md:text-3xl text-xl font-bold text-slate-900">Work Experience</h1>
                <p className="text-slate-600 mt-2">Manage your professional work history and achievements</p>
              </div>
              <Dialog open={isAddingExperience} onOpenChange={setIsAddingExperience}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-4 w-4" />
                    Add Experience
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-yellow-500">
                  <DialogHeader>
                    <DialogTitle>Add Work Experience</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Company name" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" placeholder="Job title" className="mt-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="month" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input id="endDate" type="month" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, State" className="mt-2" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your role, responsibilities, and key accomplishments"
                        rows={4}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="achievements">Key Achievements (one per line)</Label>
                      <Textarea
                        id="achievements"
                        placeholder="• Led a team of 5 developers&#10;• Increased performance by 40%&#10;• Implemented new features"
                        rows={3}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="technologies">Technologies Used</Label>
                      <Input id="technologies" placeholder="React, Node.js, AWS, etc. (comma-separated)" className="mt-2" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="current" className="rounded" />
                      <Label htmlFor="current">I currently work here</Label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" onClick={() => setIsAddingExperience(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddingExperience(false)}>Add Experience</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Experience Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Total Experience</p>
                      <p className="md:text-2xl text-xl font-bold text-slate-900">{totalYears}+ years</p>
                    </div>
                    <div className="p-3 hidden lg:block md:hidden sm:block bg-blue-50 rounded-xl">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Positions</p>
                      <p className="md:text-2xl text-xl font-bold text-slate-900">{experiences.length}</p>
                    </div>
                    <div className="p-3 hidden lg:block md:hidden sm:block bg-green-50 rounded-xl">
                      <Building className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Companies</p>
                      <p className="md:text-2xl text-xl font-bold text-slate-900">
                        {new Set(experiences.map((exp) => exp.company)).size}
                      </p>
                    </div>
                    <div className="p-3 hidden lg:block md:hidden sm:block bg-purple-50 rounded-xl">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Current Role</p>
                      <p className="md:text-2xl text-xl font-bold text-slate-900">{experiences.filter((exp) => exp.current).length}</p>
                    </div>
                    <div className="p-3 hidden lg:block md:hidden sm:block bg-orange-50 rounded-xl">
                      <Calendar className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Experience Timeline */}
            <ExperienceStat experiences={experiences} />
          </div>
        ) : (
          <ExperienceSkeleton />
        )
      }
    </>
  )
}
