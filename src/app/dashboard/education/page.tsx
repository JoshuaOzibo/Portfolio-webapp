"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Plus, Trash2, GraduationCap, Calendar, Award } from "lucide-react"

export default function EducationPage() {
  const [education, setEducation] = useState([
    {
      id: 1,
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      gpa: "3.8",
      description:
        "Focused on software engineering, algorithms, and data structures. Completed senior capstone project on machine learning applications.",
      achievements: ["Dean's List", "CS Honor Society", "Hackathon Winner"],
    },
    {
      id: 2,
      institution: "Coursera",
      degree: "Professional Certificate",
      field: "Full Stack Web Development",
      startDate: "2019-06",
      endDate: "2019-12",
      gpa: null,
      description:
        "Comprehensive program covering modern web development technologies including React, Node.js, and database design.",
      achievements: ["Certificate of Completion", "Top 10% of Class"],
    },
  ])

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2022-03",
      expiryDate: "2025-03",
      credentialId: "AWS-CSA-123456",
    },
    {
      id: 2,
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      issueDate: "2021-11",
      expiryDate: "2024-11",
      credentialId: "GCP-PD-789012",
    },
  ])

  const [isAddingEducation, setIsAddingEducation] = useState(false)
  const [isAddingCertification, setIsAddingCertification] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Education</h1>
          <p className="text-gray-600 mt-2">Manage your educational background and certifications</p>
        </div>
      </div>

      {/* Education Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            Academic Education
          </CardTitle>
          <Dialog open={isAddingEducation} onOpenChange={setIsAddingEducation}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Education</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="institution">Institution</Label>
                    <Input id="institution" placeholder="University name" />
                  </div>
                  <div>
                    <Label htmlFor="degree">Degree</Label>
                    <Input id="degree" placeholder="Bachelor of Science" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="field">Field of Study</Label>
                    <Input id="field" placeholder="Computer Science" />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="month" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="month" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gpa">GPA (optional)</Label>
                    <Input id="gpa" placeholder="3.8" />
                  </div>
                  <div>
                    <Label htmlFor="achievements">Achievements (comma-separated)</Label>
                    <Input id="achievements" placeholder="Dean's List, Honor Society" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your studies and achievements" rows={3} />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingEducation(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddingEducation(false)}>Add Education</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-blue-200 pl-6 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {edu.degree} in {edu.field}
                      </h3>
                      {edu.gpa && <Badge variant="outline">GPA: {edu.gpa}</Badge>}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-medium text-blue-600">{edu.institution}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700">{edu.description}</p>

                      {edu.achievements.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {edu.achievements.map((achievement, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <Award className="mr-1 h-3 w-3" />
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Certifications
          </CardTitle>
          <Dialog open={isAddingCertification} onOpenChange={setIsAddingCertification}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Certification</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="certName">Certification Name</Label>
                  <Input id="certName" placeholder="AWS Certified Solutions Architect" />
                </div>
                <div>
                  <Label htmlFor="issuer">Issuing Organization</Label>
                  <Input id="issuer" placeholder="Amazon Web Services" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input id="issueDate" type="month" />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" type="month" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="credentialId">Credential ID (optional)</Label>
                  <Input id="credentialId" placeholder="Certificate ID" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingCertification(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddingCertification(false)}>Add Certification</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
                    <p className="text-sm text-blue-600 mb-2">{cert.issuer}</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>Issued: {formatDate(cert.issueDate)}</p>
                      <p>Expires: {formatDate(cert.expiryDate)}</p>
                      {cert.credentialId && <p>ID: {cert.credentialId}</p>}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
