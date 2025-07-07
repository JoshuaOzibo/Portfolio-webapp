"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Globe, Twitter } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { useGet, usePost, usePut, useDelete } from "@/hooks/use-fetch";
import { ApiResponse, Skill, SocialMapedData } from "@/types/types";
import SkillsSkeleton from "@/components/pages_skeleton/skill.skeleton";
import SkillDialog from '../../Dialogs/skillDialog';
import EmptyState from "@/components/re-usable_ui/empty_component";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";


const page = () => {
    const queryClient = useQueryClient();
    const skillsEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills`;
    
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [platform, setPlatform] = useState("");
    const [url, setUrl] = useState("");
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const refetchSkills = () => {
        queryClient.invalidateQueries({ queryKey: [skillsEndpoint] });
    };

    const {
        mutate: postData,
        isPending: isPosting,
        error: postError,
        data: postResponse,
    } = usePost(() => {
        toast.success("Skill added successfully!");
        setPlatform("");
        setUrl("");
        setIsAddingLink(false);
        refetchSkills();
    });

    const {
        mutate: putData,
        isPending: isUpdating,
        error: putError,
        data: putResponse,
    } = usePut(() => {
        toast.success("Skill updated successfully!");
        setIsEditing(false);
        setEditingSkill(null);
        setPlatform("");
        setUrl("");
        refetchSkills();
    });

    const {
        mutate: deleteData,
        isPending: isDeleting,
        error: deleteError,
        data: deleteResponse,
    } = useDelete(() => {
        toast.success("Skill deleted successfully!");
        refetchSkills();
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postData({
            endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills/create`,
            data: {
                skillName: platform,
                image: url,
            }
        });
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setPlatform(skill.skillName);
        setUrl(skill.image);
        setIsEditing(true);
        setIsAddingLink(false);
    };

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingSkill) return;
        putData({
            endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills/${editingSkill._id}`,
            data: {
                skillName: platform,
                image: url,
            },
        });
    };

    const handleDelete = (id: string) => {
        deleteData(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills/${id}`);
    };

    const handleAddSkill = () => {
        setEditingSkill(null);
        setPlatform("");
        setUrl("");
        setIsAddingLink(true);
        setIsEditing(false);
    };

    const handleCloseDialog = () => {
        setIsAddingLink(false);
        setIsEditing(false);
        setEditingSkill(null);
        setPlatform("");
        setUrl("");
    };

    // Handle error cases
    useEffect(() => {
        if (postError) {
            const errorMessage = (postError.response?.data as any)?.message || "Failed to add skill. Please try again.";
            toast.error(errorMessage);
        }
    }, [postError]);

    useEffect(() => {
        if (putError) {
            const errorMessage = (putError.response?.data as any)?.message || "Failed to update skill. Please try again.";
            toast.error(errorMessage);
        }
    }, [putError]);

    useEffect(() => {
        if (deleteError) {
            const errorMessage = (deleteError.response?.data as any)?.message || "Failed to delete skill. Please try again.";
            toast.error(errorMessage);
        }
    }, [deleteError]);

    
    const {
        data: skillsData,
        isLoading,
        error,
    } = useGet<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills`);
    
    useEffect(() => {
        if (skillsData) {
            const fetchedData = skillsData.skills || [];
            setSkills(fetchedData);
        }
    }, [skillsData]);

    const socialMapedData: SocialMapedData = {
        githubIcon: Github,
        linkedinIcon: Linkedin,
        twitterIcon: Twitter,
        githubColor: "text-gray-700",
        linkedinColor: "text-blue-600",
        twitterColor: "text-blue-400",
        websiteIcon: Globe,
        websiteColor: "text-green-600",
    }

    const socialMapping = {
        Github: { icon: socialMapedData.githubIcon, color: socialMapedData.githubColor },
        Linkedin: { icon: socialMapedData.linkedinIcon, color: socialMapedData.linkedinColor },
        Twitter: { icon: socialMapedData.twitterIcon, color: socialMapedData.twitterColor },
        Website: { icon: socialMapedData.websiteIcon, color: socialMapedData.websiteColor }
    };

    useEffect(() => {
        if (skillsData) {
            const fetchedData = skillsData.skills || [];
            const data = fetchedData.map((skill: Skill) => {
                const mapping = socialMapping[skill.skillName as keyof typeof socialMapping];
                return {
                    ...skill,
                    icon: mapping?.icon,
                    color: mapping?.color,
                };
            });
            setSkills(data);
        }
    }, [skillsData]);

    return (
        <>
            <Card className="border-0 w-full shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Skills</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleAddSkill}>
                        Add Skill
                    </Button>
                </CardHeader>
                {isLoading && (
                    <SkillsSkeleton />
                )}

                {skills && (
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <main key={skill._id} className="md:p-4 p-2 w-full border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="font-medium text-slate-900">{skill.skillName}</p>
                                                <p className="text-sm text-slate-500 truncate max-w-[200px]">{skill.image}</p>
                                            </div>
                                        </div>
                                        <div className="flex md:block hidden gap-2">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(skill)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700" onClick={() => handleDelete(skill._id)} disabled={isDeleting}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 md:hidden block">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(skill)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700" onClick={() => handleDelete(skill._id)} disabled={isDeleting}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </main>
                            ))}
                        </div>
                    </CardContent>
                )}

                {skills.length === 0 && !isLoading && (
                    <EmptyState title="No skills found" description="Add a new skill to get started" />
                )}
            </Card>

            {/* Skill Dialog - handles both add and edit */}
            <SkillDialog
                isAddingLink={isAddingLink || isEditing}
                setIsAddingLink={(open) => {
                    if (!open) {
                        handleCloseDialog();
                    } else {
                        setIsAddingLink(open);
                    }
                }}
                handleSubmit={isEditing ? handleUpdate : handleSubmit}
                url={url}
                setUrl={setUrl}
                platform={platform}
                setPlatform={setPlatform}
                isEditing={isEditing}
                onClose={handleCloseDialog}
            />
        </>
    );
};

export default page;
