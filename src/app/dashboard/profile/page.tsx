"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Trash2, Upload, Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, Camera } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    title: "Full Stack Developer",
    bio: "Passionate developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies. Always eager to learn new technologies and solve complex problems.",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=150&width=150",
    website: "https://johndoe.dev",
    resume: "john-doe-resume.pdf",
  })

  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "GitHub", url: "https://github.com/johndoe", icon: Github, color: "text-gray-700" },
    { id: 2, platform: "LinkedIn", url: "https://linkedin.com/in/johndoe", icon: Linkedin, color: "text-blue-600" },
    { id: 3, platform: "Twitter", url: "https://twitter.com/johndoe", icon: Twitter, color: "text-blue-400" },
    { id: 4, platform: "Website", url: "https://johndoe.dev", icon: Globe, color: "text-green-600" },
  ])

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isAddingLink, setIsAddingLink] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
          <p className="text-slate-600 mt-2">Manage your personal information and public profile</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
          <Upload className="h-4 w-4" />
          Export Profile Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src={profile.image || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-2xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-white border-2 border-white shadow-lg hover:bg-slate-50"
                  >
                    <Camera className="h-4 w-4 text-slate-600" />
                  </Button>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{profile.name}</h2>
                  <p className="text-blue-600 font-medium">{profile.title}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed">{profile.bio}</p>
                </div>

                <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Profile Information</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={profile.name} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="title">Professional Title</Label>
                        <Input id="title" value={profile.title} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" value={profile.bio} rows={4} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" value={profile.location} className="mt-2" />
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsEditingProfile(false)}>Save Changes</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="font-medium text-slate-900">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Phone</p>
                    <p className="font-medium text-slate-900">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Website</p>
                    <p className="font-medium text-slate-900">{profile.website}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Upload className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Resume</p>
                    <p className="font-medium text-slate-900">{profile.resume}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="border-0 shadow-sm">
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
                      <Input id="platform" placeholder="e.g., GitHub, LinkedIn" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="url">URL</Label>
                      <Input id="url" placeholder="https://" className="mt-2" />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsAddingLink(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddingLink(false)}>Add Link</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <p className="font-medium text-slate-900">{link.platform}</p>
                        <p className="text-sm text-slate-500 truncate max-w-[200px]">{link.url}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Visibility */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Profile Visibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-green-900">Profile is Public</h3>
                  <p className="text-sm text-green-700">Your profile is visible to everyone</p>
                </div>
                <Badge className="bg-green-100 text-green-700">Live</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-900">2.4k</p>
                  <p className="text-sm text-slate-600">Profile Views</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-900">156</p>
                  <p className="text-sm text-slate-600">Contact Clicks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
