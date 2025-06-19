'use client'

import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Edit, Trash2, Building, Calendar, MapPin, Clock } from "lucide-react"

interface Experience {
    id: number
    company: string
    position: string
    startDate: string
    endDate: string
    location: string
    type: string
    description: string
    achievements: string[]
    technologies: string[]
    current: boolean
}


export default function ExperienceStat({ experiences }: { experiences: Experience[] }) {

    // Format date
    const formatDate = (dateString: string) => {
        if (dateString === "Present") return "Present"
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
    }

    // Calculate duration
    const calculateDuration = (startDate: string, endDate: string) => {
        const start = new Date(startDate)
        const end = endDate === "Present" ? new Date() : new Date(endDate)
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
        const years = Math.floor(months / 12)
        const remainingMonths = months % 12

        if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
        if (remainingMonths === 0) return `${years} year${years !== 1 ? "s" : ""}`
        return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
    }


    return (
        <div className="space-y-6">
            {experiences.map((exp, index) => (
                <Card key={exp.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 md:block hidden bg-blue-50 rounded-lg">
                                        <Building className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="md:text-xl text-sm font-semibold text-slate-900">{exp.position}</h3>
                                        <p className="text-blue-600 font-medium">{exp.company}</p>
                                    </div>
                                    {exp.current && (
                                        <Badge className="bg-green-100 text-green-700 border-green-200">Current Position</Badge>
                                    )}
                                </div>

                                <div className="flex items-center gap-6 text-sm text-slate-600 mb-4 md:flex-row flex-col">
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
                            <div className="flex lg:block hidden gap-2">
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

                            <div className="flex gap-2 lg:hidden block">
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
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}