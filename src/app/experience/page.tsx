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
import { useGet, usePost } from "@/hooks/use-fetch";
import { Experience } from "@/types/types";
import EmptyState from "@/components/re-usable_ui/empty_component"


export default function ExperiencePage() {
  const { data: experienceResponse, isLoading: isLoadingExperiences } = useGet<{ experiences: Experience[] }>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/experiences`);
  const experiences = experienceResponse?.experiences || [];
  const [isAddingExperience, setIsAddingExperience] = useState(false)

  console.log(`experiences:`, experiences);


  if(experiences.length === 0) {
    return (
      <EmptyState title="No Experience found" description="You've processed all your projects" />
    )
  }


  const totalExperience = experiences.reduce((total: number, exp: Experience) => {
    const start = new Date(exp.startDate)
    const end = exp.endDate === "Present" ? new Date() : new Date(exp.endDate)
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    return total + months
  }, 0) || 0

  const totalYears = Math.floor(totalExperience / 12)
  const totalMonths = totalExperience % 12

  // Check if current position
  const isCurrentPosition = (endDate: string) => {
    return endDate === "Present" || new Date(endDate) > new Date()
  }

  return (
    <>
      {
        !isLoadingExperiences ? (
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
                <DialogContent>
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
                        <Label htmlFor="liveLink">Company Website</Label>
                        <Input id="liveLink" placeholder="https://company.com" className="mt-2" />
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
                      <Label htmlFor="technologies">Technologies Used</Label>
                      <Input id="technologies" placeholder="React, Node.js, AWS, etc. (comma-separated)" className="mt-2" />
                    </div>

                    <div>
                      <Label htmlFor="image">Company Logo URL</Label>
                      <Input id="image" placeholder="https://example.com/logo.png" className="mt-2" />
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
                        {new Set(experiences.map((exp) => exp.companyName)).size}
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
                      <p className="md:text-2xl text-xl font-bold text-slate-900">
                        {experiences.filter((exp) => isCurrentPosition(exp.endDate)).length}
                      </p>
                    </div>
                    <div className="p-3 hidden lg:block md:hidden sm:block bg-orange-50 rounded-xl">
                      <Calendar className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Experience Timeline */}
            {experiences && experiences.length > 0 ? (
              <ExperienceStat experiences={experiences} />
            ) : (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <p className="text-slate-600">No work experience added yet. Add your first experience to get started!</p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <ExperienceSkeleton />
        )
      }
    </>
  )
}
