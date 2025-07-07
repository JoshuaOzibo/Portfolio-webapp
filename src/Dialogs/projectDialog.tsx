import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface ProjectDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    editingProject: any | null;
    handleClose: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    project_image: File | null;
    setProjectImage: React.Dispatch<React.SetStateAction<File | null>>;
    previousImage: string | null;
    setPreviousImage: React.Dispatch<React.SetStateAction<string | null>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    technologies: string[];
    setTechnologies: React.Dispatch<React.SetStateAction<string[]>>;
    liveUrl: string;
    setLiveUrl: React.Dispatch<React.SetStateAction<string>>;
    githubUrl: string;
    setGithubUrl: React.Dispatch<React.SetStateAction<string>>;
    featured: boolean;
    setFeatured: React.Dispatch<React.SetStateAction<boolean>>;
    isPosting: boolean;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({
    open,
    setOpen,
    editingProject,
    handleClose,
    handleSubmit,
    project_image,
    setProjectImage,
    previousImage,
    setPreviousImage,
    title,
    setTitle,
    status,
    setStatus,
    description,
    setDescription,
    technologies,
    setTechnologies,
    liveUrl,
    setLiveUrl,
    githubUrl,
    setGithubUrl,
    featured,
    setFeatured,
    isPosting,
}) => {
    return (
        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) handleClose(); }}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{editingProject ? 'Update Project' : 'Add New Project'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    {/* Project Image Upload */}
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
                                    {(!project_image && previousImage) && (
                                        <img
                                            src={previousImage}
                                            alt="Current project"
                                            className="mx-auto mt-2 rounded-lg max-h-32"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="title">Project Title</Label>
                                    <Input
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        id="title"
                                        placeholder="Enter project title"
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={status}
                                        onValueChange={(value) =>
                                            setStatus(value)
                                        }
                                    >
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Live">Live</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                            <SelectItem value="Draft">Draft</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    name="description"
                                    value={description}
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
                                    value={technologies.join(", ")}
                                    onChange={(e) =>
                                        setTechnologies(
                                            e.target.value
                                                .split(",")
                                                .map((tech) => tech.trim())
                                                .filter((tech) => tech.length > 0)
                                        )
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
                                        value={liveUrl}
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
                                        value={githubUrl}
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
                                    checked={featured}
                                    onChange={(e) => setFeatured(e.target.checked)}
                                />
                                <Label htmlFor="featured">
                                    Feature this project on homepage
                                </Label>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>

                                {isPosting ? (
                                    <Button type="submit" disabled>
                                        {editingProject ? 'Updating Project...' : 'Creating Project...'}
                                    </Button>
                                ) : (
                                    <Button type="submit">
                                        {editingProject ? 'Update Project' : 'Create Project'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectDialog;