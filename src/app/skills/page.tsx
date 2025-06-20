"use client";

import { useEffect, useState } from "react";
import { Edit, Github, Linkedin, Globe, Twitter, CloudCog } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import SkillSkeleton from "@/components/pages_skeleton/skill.skeleton";
import { useGet } from "@/hooks/use-fetch";
import { ApiResponse, Social, SocialMapedData, SocialsData } from "@/types/types";

const page = () => {
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [socialLinks, setSocialLinks] = useState<Social[] | null>(null);

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

    if(socialsData) {
      console.log(`socialsData:`, socialsData);

      console.log(`socialMapping:`, socialMapping);


      const fetchedData:SocialsData  = socialsData.data?.socials;

      let data = {
        ...socialMapping,
        ...fetchedData
      }

      console.log(`socialMapping:`, socialMapping);

      console.log(`data:`, data);

    }


  }, [socialsData])



  /**
   * 
   * @param e {
        _id: social._id,
        name: social.name,
        link: social.link,

        __v: social.__v,
      }));
   */



  // const [socialLinks, setSocialLinks] = useState([
  //   {
  //     id: 1,
  //     platform: "GitHub",
  //     url: "https://github.com/johndoe",
  //     icon: Github,
  //     color: "text-gray-700",
  //   },
  //   {
  //     id: 2,
  //     platform: "LinkedIn",
  //     url: "https://linkedin.com/in/johndoe",
  //     icon: Linkedin,
  //     color: "text-blue-600",
  //   },
  //   {
  //     id: 3,
  //     platform: "Twitter",
  //     url: "https://twitter.com/johndoe",
  //     icon: Twitter,
  //     color: "text-blue-400",
  //   },
  //   {
  //     id: 4,
  //     platform: "Website",
  //     url: "https://johndoe.dev",
  //     icon: Globe,
  //     color: "text-green-600",
  //   },
  // ]);

  const submitSkillsData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitSkillsData");

    const formData = new FormData(e.target as HTMLFormElement);
    const platform = formData.get("platform");
    const url = formData.get("url");

    console.log(platform, url);

  }
  return (
    <>
   {
    isLoading ? (<SkillSkeleton />) : (

      <Card className="border-0 w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Social Links</CardTitle>
        <Dialog open={isAddingLink} onOpenChange={setIsAddingLink}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Link
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Social Link</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitSkillsData}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Input
                    id="platform"
                    placeholder="e.g., GitHub, LinkedIn"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" placeholder="https://" className="mt-2" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingLink(false)}
                  >
                    Cancel
                  </Button>
                  <button type="submit">
                    Add Link
                  </button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {socialLinks && socialLinks.length > 0 && socialLinks.map((link) => (
            <main key={link._id} className="p-4 w-full border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
              <div
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    {link.icon && <link.icon className={`h-5 w-5 ${link.color}`} />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {link.name}
                    </p>
                    <p className="text-sm text-slate-500 truncate max-w-[200px]">
                      {link.link}
                    </p>
                  </div>
                </div>
                <div className="flex md:block hidden gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2 md:hidden block">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </main>

          ))}
        </div>
      </CardContent>
    </Card>
      
    )
   }
    </>
  );
};

export default page;
