"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "../../types/types";
import { toast } from "sonner"

// UI Project interface that matches ProjectGrid expectations
interface UIProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  status: string;
  featured: boolean;
  views: string;
  createdAt: string;
}

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
import { useGet, usePost,  usePut, useDelete} from "@/hooks/use-fetch";
import { useQueryClient } from "@tanstack/react-query";
import ProjectDialog from "@/Dialogs/projectDialog";
import  EmptyState  from "@/components/re-usable_ui/empty_component";


export default function ProjectsPage() {
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<UIProject | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [status, setStatus] = useState("");
  const [project_image, setProjectImage] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [transformedProjects, setTransformedProjects] = useState<UIProject[]>([]);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  
  const projectsEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`;
  
  const {
    data: projectsData,
    isLoading,
    error,
  } = useGet<ProjectsApiResponse>(projectsEndpoint);

  // Function to refetch projects data
  const refetchProjects = () => {
    queryClient.invalidateQueries({ queryKey: [projectsEndpoint] });
  };

  const {
    mutate: deleteData,
    isPending: isDeleting,
    error: deleteError,
    data: deleteResponse,
  } = useDelete(() => {
    toast.success("Project deleted successfully!");
    refetchProjects();
  });

  const {
    mutate: putData,
    isPending: isUpdating,
    error: putError,
    data: putResponse,
  } = usePut(() => {
    toast.success("Project updated successfully!");
    refetchProjects();
    
    // Reset form
    setIsDialogOpen(false);
    setEditingProject(null);
    setTitle("");
    setDescription("");
    setTechnologies([]);
    setLiveUrl("");
    setGithubUrl("");
    setStatus("In Progress");
    setProjectImage(null);
    setFeatured(false);
  });
  

    // Delete Project
    const handleDelete = (id: string) => {
      deleteData(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`);
    };

    // Open edit dialog and populate form
    const handleEditProject = (id: string, project: UIProject) => {
      setEditingProject(project);
      setIsDialogOpen(true);
      setTitle(project.title);
      setDescription(project.description);
      setTechnologies(project.technologies);
      setLiveUrl(project.liveUrl);
      setGithubUrl(project.githubUrl);
      setStatus(project.status);
      setFeatured(project.featured);
      setProjectImage(null);
      setPreviousImage(project.image);
    };

    // Reset form when dialog is closed
    const handleCloseDialog = () => {
      setIsDialogOpen(false);
      setEditingProject(null);
      setTitle("");
      setDescription("");
      setTechnologies([]);
      setLiveUrl("");
      setGithubUrl("");
      setStatus("In Progress");
      setProjectImage(null);
      setFeatured(false);
      setPreviousImage(null);
    };
  

  useEffect(() => {
     // Transform API data to match ProjectGrid expectations
  const transformedProjects = projectsData?.data?.projects?.map((project) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    image: project.image,
    technologies: project.skills || [],
    liveUrl: project.liveLink || "",
    githubUrl: project.githubLink,
    status: project.status || "In Progress",
    featured: project.featured || false,
    views: project.views?.toString() || "0",
    createdAt: project.createdAt,
  })) || [];
  setTransformedProjects(transformedProjects);
  }, [projectsData]);

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
  } = usePost(() => {
    toast.success("Project created successfully!");
    refetchProjects();
    
    // Reset form
    setIsDialogOpen(false);
    setEditingProject(null);
    setTitle("");
    setDescription("");
    setTechnologies([]);
    setLiveUrl("");
    setGithubUrl("");
    setStatus("In Progress");
    setProjectImage(null);
    setFeatured(false);
  });

  // Handle error cases
  useEffect(() => {
    if (postError) {
      const errorMessage = (postError.response?.data as any)?.message || "Failed to create project. Please try again.";
      toast.error(errorMessage);
    }
  }, [postError]);

  useEffect(() => {
    if (deleteError) {
      const errorMessage = (deleteError.response?.data as any)?.message || "Failed to delete project. Please try again.";
      toast.error(errorMessage);
    }
  }, [deleteError]);

  useEffect(() => {
    if (putError) {
      const errorMessage = (putError.response?.data as any)?.message || "Failed to update project. Please try again.";
      toast.error(errorMessage);
    }
  }, [putError]);

  const handleAddProject = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
    setTitle("");
    setDescription("");
    setTechnologies([]);
    setLiveUrl("");
    setGithubUrl("");
    setStatus("In Progress");
    setProjectImage(null);
    setFeatured(false);
    setPreviousImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageToSend = previousImage;
      if (project_image) {
        imageToSend = await convertImageToBase64(project_image);
      }
      const projectData = {
        title,
        description,
        image: imageToSend,
        skills: technologies,
        liveLink: liveUrl,
        githubLink: githubUrl,
        status,
        featured,
      };
      if (editingProject) {
        putData({
          endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${editingProject.id}`,
          data: projectData,
        });
      } else {
        postData({
          endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/create`,
          data: projectData,
        });
      }
    } catch (error) {
      // console.error("Error converting image:", error);
      toast.error("Failed to process image. Please try again.");
    }
  };

  return (
    <>
      {isLoading && (
        <ProjectSkeleton />
      )}
      {error && (
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
      )}
      {!isLoading && (
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

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddProject}
                >
                  Add Project
                </Button>
              </div>

              
              <ProjectDialog
                open={isDialogOpen}
                setOpen={setIsDialogOpen}
                editingProject={editingProject}
                handleClose={handleCloseDialog}
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
                isPosting={isPosting || isUpdating}
                previousImage={previousImage}
                setPreviousImage={setPreviousImage}
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

          {transformedProjects.length === 0 && (
            <EmptyState title="No projects found" description="Add a project to get started" />
          )}

          {/* Projects Grid */}
          <ProjectGrid 
            projects={transformedProjects} 
            getStatusColor={getStatusColor}
            onDelete={handleDelete}
            onUpdate={handleEditProject}
          />
        </div>
      )}
    </>
  );
}
