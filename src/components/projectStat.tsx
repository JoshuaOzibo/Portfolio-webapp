'use client'
import {
    Edit,
    Trash2,
    ExternalLink,
    Github,
    Star,
    Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Project = {
    id: number;
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
};

type projectTypes = {
    projects: Project[],
    getStatusColor: (status: string) => string,
}

// Helper function to check if a string is base64 encoded
const isBase64 = (str: string): boolean => {
    try {
        if (!str || typeof str !== 'string') return false;
        return str.startsWith('data:image/') || str.startsWith('data:application/');
    } catch {
        return false;
    }
};

const projectStat = ({ projects, getStatusColor }: projectTypes) => {
    console.log(projects);
    
    // Debug: Log image handling for each project
    projects.forEach((project, index) => {
        console.log(`ProjectStat ${index + 1}:`, {
            title: project.title,
            imageType: typeof project.image,
            isBase64: isBase64(project.image),
            imageLength: project.image?.length
        });
    });
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <Card
                    key={project.id}
                    className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                    <div className="relative">
                        {isBase64(project.image) ? (
                            // Use regular img tag for base64 images
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover rounded-t-lg bg-slate-100"
                                onError={(e) => {
                                    console.error('Error loading base64 image for:', project.title);
                                    e.currentTarget.src = '/out-of-stock.webp';
                                }}
                            />
                        ) : (
                            // Use Next.js Image component for regular URLs
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={400}
                                height={192}
                                className="w-full h-48 object-cover rounded-t-lg bg-slate-100"
                                onError={(e) => {
                                    console.error('Error loading image for:', project.title);
                                }}
                            />
                        )}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <Badge
                                className={`${getStatusColor(project.status)} border`}
                            >
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
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="h-8 w-8 p-0"
                                >
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

                    <CardContent className="p-3">
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
    )
};

export default projectStat;