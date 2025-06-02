"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Plus, Trash2, Building, Calendar, MapPin, Clock } from "lucide-react"

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: "Tech Solutions Inc.",
      position: "Senior Full Stack Developer",
      startDate: "2022-01",
      endDate: "Present",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "Led development of multiple web applications using React, Node.js, and AWS. Mentored junior developers and improved team productivity by 30%. Implemented CI/CD pipelines and reduced deployment time by 50%.",
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
      location: "Remote",
      type: "Full-time",
      description:
        "Developed responsive web applications for various clients using modern frontend technologies. Collaborated with design teams to implement pixel-perfect UI components and improved user experience across multiple projects.",
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
      location: "New York, NY",
      type: "Full-time",
      description:
        "Built and maintained company website and internal tools. Gained experience in full-stack development and agile methodologies. Worked closely with senior developers to learn best practices.",
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

  const formatDate = (dateString) => {
    if (dateString === "Present") return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = endDate === "Present" ? new Date() : new Date(endDate)
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
    if (remainingMonths === 0) return `${years} year${years !== 1 ? "s" : ""}`
    return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
  }

  const totalExperience = experiences.reduce((total, exp) => {
    const start = new Date(exp.startDate)
    const end = exp.endDate === "Present" ? new Date() : new Date(exp.endDate)
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    return total + months
  }, 0)

  const totalYears = Math.floor(totalExperience / 12)
  const totalMonths = totalExperience % 12

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Work Experience</h1>
          <p className="text-slate-600 mt-2">Manage your professional work history and achievements</p>
        </div>
        <Dialog open={isAddingExperience} onOpenChange={setIsAddingExperience}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                <p className="text-2xl font-bold text-slate-900">{totalYears}+ years</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
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
                <p className="text-2xl font-bold text-slate-900">{experiences.length}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
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
                <p className="text-2xl font-bold text-slate-900">
                  {new Set(experiences.map((exp) => exp.company)).size}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
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
                <p className="text-2xl font-bold text-slate-900">{experiences.filter((exp) => exp.current).length}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={exp.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Building className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    {exp.current && (
                      <Badge className="bg-green-100 text-green-700 border-green-200">Current Position</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{calculateDuration(exp.startDate, exp.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {exp.type}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Description</h4>
                  <p className="text-slate-700 leading-relaxed">{exp.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
