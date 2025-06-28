"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Calendar, MapPin, Clock } from "lucide-react"
import ExperienceStat from "@/components/experienceStat"
import ExperienceSkeleton from "@/components/pages_skeleton/experience.skeleton"
import { useGet, usePost } from "@/hooks/use-fetch";
import { Experience } from "@/types/types";
import EmptyState from "@/components/re-usable_ui/empty_component"
import ExperienceDialog from '../../Dialogs/experienceDialog';


export default function ExperiencePage() {
  const [companyName, setCompanyName] = useState('')
  const [position, setPosition] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [responsibility, setResponsibility] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [image, setImage] = useState('')
  const [liveLink, setLiveLink] = useState('')
  const [isCurrent, setIsCurrent] = useState(false)




  const { data: experienceResponse, isLoading: isLoadingExperiences } = useGet<{ experiences: Experience[] }>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/experiences`);
  const {
    mutate: postData,
    isPending: isPosting,
    error: postError,
    data: postResponse,
  } = usePost();


  const experiences = experienceResponse?.experiences || [];
  const [isAddingExperience, setIsAddingExperience] = useState(false)

  console.log(`experiences:`, experiences);

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

  const handleSubmit = async () => {
    postData({
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/experiences/`,
      data: {
        companyName,
        position,
        startDate,
        endDate,
        responsibility,
        technologies,
        image,
        liveLink,
        isCurrent,
      }
    })
  }

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="md:text-3xl text-xl font-bold text-slate-900">Work Experience</h1>
            <p className="text-slate-600 mt-2">Manage your professional work history and achievements</p>
          </div>
          {/* experience dialog */}
          <ExperienceDialog
            isAddingExperience={isAddingExperience}
            setIsAddingExperience={setIsAddingExperience}
            handleSubmit={handleSubmit}
            isCurrent={isCurrent}
            setIsCurrent={setIsCurrent}
            image={image}
            setImage={setImage}
            technologies={technologies}
            setTechnologies={setTechnologies}
            responsibility={responsibility}
            setResponsibility={setResponsibility}
            liveLink={liveLink}
            setLiveLink={setLiveLink}
            endDate={endDate}
            setEndDate={setEndDate}
            startDate={startDate}
            setStartDate={setStartDate}
            position={position}
            setPosition={setPosition}
            companyName={companyName}
            setCompanyName={setCompanyName}
          />
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

        {isLoadingExperiences && (
          <ExperienceSkeleton />
        )}

        {experiences.length > 0 && (
          <ExperienceStat experiences={experiences} />
        )}

        {experiences.length === 0 && (
          <EmptyState title="No Experience found" description="You've processed all your projects" />
        )}
      </div>

    </>
  )
}
