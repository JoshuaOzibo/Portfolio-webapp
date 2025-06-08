"use client";

import { useState } from "react";

import { Edit, Github, Linkedin, Globe, Twitter } from "lucide-react";
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

const page = () => {
  const [isAddingLink, setIsAddingLink] = useState(false);

  const [socialLinks, setSocialLinks] = useState([
    {
      id: 1,
      platform: "GitHub",
      url: "https://github.com/johndoe",
      icon: Github,
      color: "text-gray-700",
    },
    {
      id: 2,
      platform: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
      icon: Linkedin,
      color: "text-blue-600",
    },
    {
      id: 3,
      platform: "Twitter",
      url: "https://twitter.com/johndoe",
      icon: Twitter,
      color: "text-blue-400",
    },
    {
      id: 4,
      platform: "Website",
      url: "https://johndoe.dev",
      icon: Globe,
      color: "text-green-600",
    },
  ]);
  return (
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
                  <Button onClick={() => setIsAddingLink(false)}>
                    Add Link
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {socialLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <link.icon className={`h-5 w-5 ${link.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {link.platform}
                    </p>
                    <p className="text-sm text-slate-500 truncate max-w-[200px]">
                      {link.url}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
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
            ))}
          </div>
        </CardContent>
      </Card>
  );
};

export default page;
