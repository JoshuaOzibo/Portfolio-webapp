"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Eye,
  Upload,
  Star,
  Calendar,
  Code2,
} from "lucide-react";
import DialogModal from "@/components/re-usable_ui/dialog_modal";
import { usePost } from "@/hooks/use-fetch";
import { toast } from "@/components/ui/use-toast";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  status: "Live" | "In Progress" | "Draft";
  featured: boolean;
  views: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Stripe",
        "Tailwind CSS",
      ],
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/johndoe/ecommerce",
      status: "Live",
      featured: true,
      views: "2.1k",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS", "Socket.io"],
      liveUrl: "https://taskapp-demo.com",
      githubUrl: "https://github.com/johndoe/taskapp",
      status: "In Progress",
      featured: false,
      views: "1.5k",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "OpenWeather API", "Chart.js", "Mapbox"],
      liveUrl: "https://weather-demo.com",
      githubUrl: "https://github.com/johndoe/weather",
      status: "Live",
      featured: true,
      views: "3.2k",
      createdAt: "2024-01-05",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website built with Next.js and featuring smooth animations and optimized performance.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
      liveUrl: "https://johndoe.dev",
      githubUrl: "https://github.com/johndoe/portfolio",
      status: "Live",
      featured: false,
      views: "4.8k",
      createdAt: "2023-12-20",
    },
  ]);

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

      if (postResponse) {
        toast({
          title: "Project created successfully",
          description: "Project created successfully",
        });
      } else {
        toast({
          title: "Failed to create project",
          description: "Failed to create project",
        });
      }

      setIsAddingProject(false);
      setTitle("");
      setDescription("");
      setTechnologies([]);
      setLiveUrl("");
      setGithubUrl("");
      setStatus("In Progress");
      setProjectImage(null);
      setFeatured(false);
    } catch (error) {
      console.error("Error converting image:", error);
    }
  };

  return (
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

          <DialogModal
            isAddingProject={isAddingProject}
            setIsAddingProject={setIsAddingProject}
            contentHeader_Title="Add New Project"
            Title_button="Add Project"
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Project Image Upload */}
                <div>
                  <Label>Project Image</Label>
                  <div
                    className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.type.startsWith("image/")) {
                        setProjectImage(file);
                      }
                    }}
                  >
                    <input
                      type="file"
                      id="project-image"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setProjectImage(file);
                      }}
                    />
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-sm text-slate-600 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      type="button"
                      onClick={() =>
                        document.getElementById("project-image")?.click()
                      }
                    >
                      Choose File
                    </Button>
                    {project_image && (
                      <p className="mt-2 text-sm text-green-600">
                        Selected: {project_image.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                      id="title"
                      placeholder="Enter project title"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      onValueChange={(value) =>
                        setStatus(value as "Live" | "In Progress" | "Draft")
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="progress">In Progress</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    placeholder="Describe your project, its features, and what makes it special"
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="technologies">Technologies Used</Label>
                  <Input
                    name="technologies"
                    onChange={(e) =>
                      setTechnologies([...technologies, e.target.value])
                    }
                    id="technologies"
                    placeholder="React, Node.js, PostgreSQL, etc. (comma-separated)"
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="liveUrl">Live Demo URL</Label>
                    <Input
                      name="liveUrl"
                      onChange={(e) => setLiveUrl(e.target.value)}
                      id="liveUrl"
                      placeholder="https://your-project.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub Repository</Label>
                    <Input
                      name="githubUrl"
                      onChange={(e) => setGithubUrl(e.target.value)}
                      id="githubUrl"
                      placeholder="https://github.com/username/repo"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    className="rounded"
                    onChange={(e) => setFeatured(e.target.checked ? true : false)}
                  />
                  <Label htmlFor="featured">
                    Feature this project on homepage
                  </Label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" type="button" onClick={() => setIsAddingProject(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Project
                  </Button>
                </div>
              </div>
            </form>
          </DialogModal>
        </div>
      </div>

      {/* Projects Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Projects</p>
                <p className="text-2xl font-bold text-slate-900">
                  {projects.length}
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
                  {projects.filter((p) => p.status === "Live").length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <ExternalLink className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Featured</p>
                <p className="text-2xl font-bold text-slate-900">
                  {projects.filter((p) => p.featured).length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Views</p>
                <p className="text-2xl font-bold text-slate-900">12.6k</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="relative">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg bg-slate-100"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={`${getStatusColor(project.status)} border`}>
                  {project.status}
                </Badge>
                {project.featured && (
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {project.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        asChild
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        asChild
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
