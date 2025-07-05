"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Calendar, MapPin, Clock } from "lucide-react"
import ExperienceStat from "@/components/experienceStat"
import ExperienceSkeleton from "@/components/pages_skeleton/experience.skeleton"
import { useGet, usePost, usePut, useDelete } from "@/hooks/use-fetch";
import { Experience } from "@/types/types";
import EmptyState from "@/components/re-usable_ui/empty_component"
import ExperienceDialog from '../../Dialogs/experienceDialog';
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";


export default function ExperiencePage() {
  const queryClient = useQueryClient();
  const experiencesEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/experiences`;

  const [companyName, setCompanyName] = useState('')
  const [position, setPosition] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [responsibility, setResponsibility] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [image, setImage] = useState('')
  const [liveLink, setLiveLink] = useState('')
  const [isCurrent, setIsCurrent] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const refetchExperiences = () => {
    queryClient.invalidateQueries({ queryKey: [experiencesEndpoint] });
  };

  const { data: experienceResponse, isLoading: isLoadingExperiences } = useGet<{
    data: { experiences: Experience[] },
    message: string,
    status: string
  }>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/experiences`);

  // Update local state when API data changes
  useEffect(() => {
    if (experienceResponse?.data?.experiences) {
      setExperiences(experienceResponse.data.experiences);
      // console.log('experience Data', experienceResponse);
    }
  }, [experienceResponse]);


  const {
    mutate: postData,
    isPending: isPosting,
    error: postError,
    data: postResponse,
  } = usePost(() => {
    toast.success("Experience added successfully!");
    resetForm();
    setIsAddingExperience(false);
    refetchExperiences();
  });

  const {
    mutate: putData,
    isPending: isUpdating,
    error: putError,
    data: putResponse,
  } = usePut(() => {
    toast.success("Experience updated successfully!");
    setIsEditing(false);
    setEditingExperience(null);
    resetForm();
    refetchExperiences();
  });

  const {
    mutate: deleteData,
    isPending: isDeleting,
    error: deleteError,
    data: deleteResponse,
  } = useDelete(() => {
    toast.success("Experience deleted successfully!");
    refetchExperiences();
  });

  const [isAddingExperience, setIsAddingExperience] = useState(false)

  const resetForm = () => {
    setCompanyName('');
    setPosition('');
    setStartDate('');
    setEndDate('');
    setResponsibility('');
    setTechnologies('');
    setImage('');
    setLiveLink('');
    setIsCurrent(false);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setCompanyName(experience.companyName);
    setPosition(experience.position);
    setStartDate(experience.startDate);
    setEndDate(experience.endDate);
    setResponsibility(experience.responsibility);
    setTechnologies(experience.technologies.join(', '));
    setImage(experience.image);
    setLiveLink(experience.liveLink);
    setIsCurrent(experience.endDate === "Present");
    setIsEditing(true);
    setIsAddingExperience(false);
  };

  const handleUpdate = async () => {
    if (!editingExperience) return;
    putData({
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/experiences/${editingExperience._id}`,
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
    });
  };

  const handleDelete = (id: string) => {
    deleteData(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/experiences/${id}`);
  };

  const handleAddExperience = () => {
    setEditingExperience(null);
    resetForm();
    setIsAddingExperience(true);
    setIsEditing(false);
  };

  const handleCloseDialog = () => {
    setIsAddingExperience(false);
    setIsEditing(false);
    setEditingExperience(null);
    resetForm();
  };

  // Handle error cases
  useEffect(() => {
    if (postError) {
      const errorMessage = (postError.response?.data as any)?.message || "Failed to add experience. Please try again.";
      toast.error(errorMessage);
    }
  }, [postError]);

  useEffect(() => {
    if (putError) {
      const errorMessage = (putError.response?.data as any)?.message || "Failed to update experience. Please try again.";
      toast.error(errorMessage);
    }
  }, [putError]);

  useEffect(() => {
    if (deleteError) {
      const errorMessage = (deleteError.response?.data as any)?.message || "Failed to delete experience. Please try again.";
      toast.error(errorMessage);
    }
  }, [deleteError]);

  const totalExperience = experiences.reduce((total: number, exp: Experience) => {
    const start = new Date(exp.startDate)
    const end = exp.endDate === "Present" ? new Date() : new Date(exp.endDate)
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    return total + months
  }, 0) || 0;


  // Check if current position
  const isCurrentPosition = (endDate: string) => {
    return endDate === "Present" || new Date(endDate) > new Date()
  }

  const handleSubmit = async () => {
    postData({
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/experiences/create`,
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
          <button
            onClick={handleAddExperience}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Experience
          </button>
        </div>

        {/* Experience Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <ExperienceStat
            experiences={experiences}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}

        {experiences.length === 0 && (
          <EmptyState title="No Experience found" description="You've processed all your projects" />
        )}
      </div>

      {/* Experience Dialog - handles both add and edit */}
      <ExperienceDialog
        isAddingExperience={isAddingExperience || isEditing}
        setIsAddingExperience={(open) => {
          if (!open) {
            handleCloseDialog();
          } else {
            setIsAddingExperience(open);
          }
        }}
        handleSubmit={isEditing ? handleUpdate : handleSubmit}
        isPosting={isPosting}
        isUpdating={isUpdating}
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
        isEditing={isEditing}
        onClose={handleCloseDialog}
      />
    </>
  )
}
