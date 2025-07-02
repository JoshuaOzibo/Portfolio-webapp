"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "../../types/types";
import { toast } from "sonner"

interface ProjectsApiResponse {
  status: string;
  results: number;
  data: {
    projects: Project[];
  };
}
import ProjectSkeleton from "@/components/pages_skeleton/projects.skeleton";
import ProjectGrid from "@/components/projectStat";
import {

  ExternalLink,

  Code2,
} from "lucide-react";
import { useGet, usePost } from "@/hooks/use-fetch";
// import { useToast } from "@/hooks/use-toast";
import ProjectDialog from "@/Dialogs/projectDialog";


export default function ProjectsPage() {
  // const { toast } = useToast();

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [status, setStatus] = useState<"Live" | "In Progress" | "Draft">(
    "In Progress"
  );
  const [project_image, setProjectImage] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);

  const {
    data: projectsData,
    isLoading,
    error,
  } = useGet<ProjectsApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`);


  // Transform API data to match ProjectGrid expectations
  const transformedProjects = projectsData?.data?.projects?.map((project) => ({
    id: parseInt(project._id.slice(-6), 16), // Use last 6 chars of _id as numeric id
    title: project.title,
    description: project.description,
    image: project.image,
    technologies: project.skills,
    liveUrl: project.liveLink as string,
    githubUrl: project.githubLink as string,
    status: project.status as string,
    featured: project.featured || false,
    views: project.views?.toString() as string,
    createdAt: project.createdAt,
  })) || [];

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-700 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const {
    mutate: postData,
    isPending: isPosting,
    error: postError,
    data: postResponse,
  } = usePost();

  // Handle success case
  useEffect(() => {
    if (postResponse) {
      console.log("Project created successfully, showing toast...");
      toast.success("Project created successfully!");
      
      // Reset form
      setIsAddingProject(false);
      setTitle("");
      setDescription("");
      setTechnologies([]);
      setLiveUrl("");
      setGithubUrl("");
      setStatus("In Progress");
      setProjectImage(null);
      setFeatured(false);
    }
  }, [postResponse, toast]);

  // Handle error case
  useEffect(() => {
    if (postError) {
      console.log("Project creation failed, showing error toast...");
      const errorMessage = (postError.response?.data as any)?.message || "Failed to create project. Please try again.";
      toast.error(errorMessage);
    }
  }, [postError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageBase64 = null;
      if (project_image) {
        imageBase64 = await convertImageToBase64(project_image);
      }

      postData({
        endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/create`,
        data: {
          title: title,
          description: description,
          image: imageBase64,
          skills: technologies,
          liveLink: liveUrl,
          githubLink: githubUrl,
          status: status,
          featured: featured,
        },
      });
    } catch (error) {
      console.error("Error converting image:", error);
        toast.error("Failed to process image. Please try again.");
    }
  };

  return (
    <>
      {isLoading ? (
        <ProjectSkeleton />
      ) : error ? (
        <div className="space-y-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Projects</h2>
            <p className="text-gray-600 mb-4">
              {error.message || "Failed to load projects. Please try again."}
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
            >
              Retry
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
              <p className="text-slate-600 mt-2">
                Manage your portfolio projects and showcase your work
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List
                </Button>
              </div>

              
              <ProjectDialog
                isAddingProject={isAddingProject}
                setIsAddingProject={setIsAddingProject}
                handleSubmit={handleSubmit}
                project_image={project_image}
                setProjectImage={setProjectImage}
                title={title}
                setTitle={setTitle}
                status={status}
                setStatus={setStatus}
                description={description}
                setDescription={setDescription}
                technologies={technologies}
                setTechnologies={setTechnologies}
                liveUrl={liveUrl}
                setLiveUrl={setLiveUrl}
                githubUrl={githubUrl}
                setGithubUrl={setGithubUrl}
                featured={featured}
                setFeatured={setFeatured}
                isPosting={isPosting}
              />
            </div>
          </div>

          {/* Projects Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Projects</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {transformedProjects.length}
                    </p>
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
                    <p className="text-sm text-slate-600">Live Projects</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {transformedProjects.filter((p) => p.status === "Live").length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl">
                    <ExternalLink className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
                onClick={() => {
                  console.log("Test toast clicked");
                  toast.success("Test toast - this should work!");
                }}
                variant="outline"
                size="sm"
              >
                Test Toast
              </Button>

          {/* Projects Grid */}
          <ProjectGrid projects={transformedProjects} getStatusColor={getStatusColor} />
        </div>
      )}
    </>
  );
}
