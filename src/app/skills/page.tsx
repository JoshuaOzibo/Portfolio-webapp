"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Globe, Twitter } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { useGet, usePost } from "@/hooks/use-fetch";
import { ApiResponse, Skill, SocialMapedData } from "@/types/types";
import SkillsSkeleton from "@/components/pages_skeleton/skill.skeleton";
import SkillDialog from '../../Dialogs/skillDialog';
import EmptyState from "@/components/re-usable_ui/empty_component";


const page = () => {
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [platform, setPlatform] = useState("");
    const [url, setUrl] = useState("");

    const {
        mutate: postData,
        isPending: isPosting,
        error: postError,
        data: postResponse,
    } = usePost();


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

    // Reset form and close dialog after successful submission
    useEffect(() => {
        if (postResponse && !isPosting) {
            setPlatform("");
            setUrl("");
            setIsAddingLink(false);
        }
    }, [postResponse, isPosting]);

    
    const {
        data: skillsData,
        isLoading,
        error,
    } = useGet<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/skills`);
    
    useEffect(() => {
        if (skillsData) {
            const fetchedData = skillsData.data?.skills || [];
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
            const fetchedData = skillsData.data?.skills || [];
            const data = fetchedData.map((social) => {
                const mapping = socialMapping[social.name as keyof typeof socialMapping];
                return {
                    ...social,
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
                    <CardTitle className="text-lg font-semibold">Social Links</CardTitle>
                    {/* skills dialog  */}
                    <SkillDialog
                        isAddingLink={isAddingLink}
                        setIsAddingLink={setIsAddingLink}
                        handleSubmit={handleSubmit}
                        url={url}
                        setUrl={setUrl}
                        platform={platform}
                        setPlatform={setPlatform}
                    />
                </CardHeader>
                {isLoading && (
                    <SkillsSkeleton />
                )}

                {skills.length > 0 && (
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {skills.map((link) => (
                                <main key={link._id} className="md:p-4 p-2 w-full border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {/* <div className="p-2 bg-slate-50 rounded-lg">
                        {link.icon && <link.icon className={`h-5 w-5 ${link.color}`} />}
                      </div> */}
                                            <div>
                                                <p className="font-medium text-slate-900">{link.skillName}</p>
                                                <p className="text-sm text-slate-500 truncate max-w-[200px]">{link.image}</p>
                                            </div>
                                        </div>
                                        <div className="flex md:block hidden gap-2">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 md:hidden block">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </main>
                            ))}


                        </div>
                    </CardContent>
                )}

                {skills.length === 0 && (
                    <EmptyState title="No skills found" description="Add a new skill to get started" />
                )}
            </Card>


        </>
    );
};

export default page;
