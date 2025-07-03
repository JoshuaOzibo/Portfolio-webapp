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
import { ApiResponse, Social, SocialMapedData, SocialsData } from "@/types/types";
import SkillsSkeleton from "@/components/pages_skeleton/skill.skeleton";
import SkillDialog from '../../Dialogs/skillDialog';
import EmptyState from "@/components/re-usable_ui/empty_component";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";


const page = () => {
  const queryClient = useQueryClient();
  const socialsEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/socials`;
  
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [socialLinks, setSocialLinks] = useState<Social[]>([]);
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [editingSocial, setEditingSocial] = useState<Social | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const refetchSocials = () => {
    queryClient.invalidateQueries({ queryKey: [socialsEndpoint] });
  };

  const {
    mutate: postData,
    isPending: isPosting,
    error: postError,
    data: postResponse,
  } = usePost(() => {
    toast.success("Social link added successfully!");
    setPlatform("");
    setUrl("");
    setIsAddingLink(false);
    refetchSocials();
  });

  const {
    mutate: putData,
    isPending: isUpdating,
    error: putError,
    data: putResponse,
  } = usePut(() => {
    toast.success("Social link updated successfully!");
    setIsEditing(false);
    setEditingSocial(null);
    setPlatform("");
    setUrl("");
    refetchSocials();
  });

  const {
    mutate: deleteData,
    isPending: isDeleting,
    error: deleteError,
    data: deleteResponse,
  } = useDelete(() => {
    toast.success("Social link deleted successfully!");
    refetchSocials();
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postData({
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/socials/create`,
      data: {
        name: platform,
        link: url,
      }
    });
  };

  const handleEdit = (social: Social) => {
    setEditingSocial(social);
    setPlatform(social.name);
    setUrl(social.link);
    setIsEditing(true);
    setIsAddingLink(false);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingSocial) return;
    putData({
      endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/socials/${editingSocial._id}`,
      data: {
        name: platform,
        link: url,
      },
    });
  };

  const handleDelete = (id: string) => {
    deleteData(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/socials/${id}`);
  };

  const handleAddSocial = () => {
    setEditingSocial(null);
    setPlatform("");
    setUrl("");
    setIsAddingLink(true);
    setIsEditing(false);
  };

  const handleCloseDialog = () => {
    setIsAddingLink(false);
    setIsEditing(false);
    setEditingSocial(null);
    setPlatform("");
    setUrl("");
  };

  // Handle error cases
  useEffect(() => {
    if (postError) {
      const errorMessage = (postError.response?.data as any)?.message || "Failed to add social link. Please try again.";
      toast.error(errorMessage);
    }
  }, [postError]);

  useEffect(() => {
    if (putError) {
      const errorMessage = (putError.response?.data as any)?.message || "Failed to update social link. Please try again.";
      toast.error(errorMessage);
    }
  }, [putError]);

  useEffect(() => {
    if (deleteError) {
      const errorMessage = (deleteError.response?.data as any)?.message || "Failed to delete social link. Please try again.";
      toast.error(errorMessage);
    }
  }, [deleteError]);

  const {
    data: socialsData,
    isLoading,
    error,
  } = useGet<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/socials`);

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
    if (socialsData) {
      const fetchedData = socialsData.data?.socials || [];
      const data = fetchedData.map((social: Social) => {
        const mapping = socialMapping[social.name as keyof typeof socialMapping];
        return {
          ...social,
          icon: mapping?.icon,
          color: mapping?.color,
        };
      });
      setSocialLinks(data);
    }
  }, [socialsData]);

  return (
    <>
      <Card className="border-0 w-full shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Social Links</CardTitle>
          <Button variant="outline" size="sm" onClick={handleAddSocial}>
            Add Social
          </Button>
        </CardHeader>
        {isLoading && (
          <SkillsSkeleton />
        )}

        {socialLinks.length > 0 && (
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <main key={link._id} className="md:p-4 p-2 w-full border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        {link.icon && <link.icon className={`h-5 w-5 ${link.color}`} />}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{link.name}</p>
                        <p className="text-sm text-slate-500 truncate max-w-[200px]">{link.link}</p>
                      </div>
                    </div>
                    <div className="flex md:block hidden gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(link)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700" onClick={() => handleDelete(link._id)} disabled={isDeleting}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 md:hidden block">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(link)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700" onClick={() => handleDelete(link._id)} disabled={isDeleting}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </main>
              ))}
            </div>
          </CardContent>
        )}

        {socialLinks.length === 0 && (
          <EmptyState title="No socials found" description="Add a new social to get started" />
        )}
      </Card>

      {/* Social Dialog - handles both add and edit */}
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
