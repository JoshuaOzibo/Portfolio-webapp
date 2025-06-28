'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Dispatch, SetStateAction } from "react"


type ExperienceDialogProps = {
    isAddingExperience: boolean,
    setIsAddingExperience: Dispatch<SetStateAction<boolean>>,
    handleSubmit: () => void,
    isCurrent: boolean,
    setIsCurrent: Dispatch<SetStateAction<boolean>>,
    image: string,
    setImage: Dispatch<SetStateAction<string>>,
    technologies: string,
    setTechnologies: Dispatch<SetStateAction<string>>,
    responsibility: string,
    setResponsibility: Dispatch<SetStateAction<string>>,
    liveLink: string,
    setLiveLink: Dispatch<SetStateAction<string>>,
    endDate: string,
    setEndDate: Dispatch<SetStateAction<string>>,
    startDate: string,
    setStartDate: Dispatch<SetStateAction<string>>,
    position: string,
    setPosition: Dispatch<SetStateAction<string>>,
    companyName: string,
    setCompanyName: Dispatch<SetStateAction<string>>,
}


const ExperienceDialog: React.FC<ExperienceDialogProps> = ({
    isAddingExperience,
    setIsAddingExperience,
    handleSubmit,
    isCurrent,
    setIsCurrent,
    image,
    setImage,
    technologies,
    setTechnologies,
    responsibility,
    setResponsibility,
    liveLink,
    setLiveLink,
    endDate,
    setEndDate,
    startDate,
    setStartDate,
    position,
    setPosition,
    companyName,
    setCompanyName
}) => {


    return (
        <Dialog open={isAddingExperience} onOpenChange={setIsAddingExperience}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-4 w-4" />
                    Add Experience
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Work Experience</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="company">Company</Label>
                            <Input id="company" placeholder="Company name" className="mt-2" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="position">Position</Label>
                            <Input id="position" placeholder="Job title" className="mt-2" value={position} onChange={(e) => setPosition(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input id="startDate" type="month" className="mt-2" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input id="endDate" type="month" className="mt-2" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="liveLink">Company Website</Label>
                            <Input id="liveLink" placeholder="https://company.com" className="mt-2" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your role, responsibilities, and key accomplishments"
                            rows={4}
                            className="mt-2"
                            value={responsibility}
                            onChange={(e) => setResponsibility(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="technologies">Technologies Used</Label>
                        <Input id="technologies" value={technologies} onChange={(e) => setTechnologies(e.target.value)} placeholder="React, Node.js, AWS, etc. (comma-separated)" className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="image">Company Logo URL</Label>
                        <Input id="image" placeholder="https://example.com/logo.png" className="mt-2" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="current" className="rounded" checked={isCurrent} onChange={() => setIsCurrent(!isCurrent)} />
                        <Label htmlFor="current">I currently work here</Label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={() => setIsAddingExperience(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>Add Experience</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
};


export default ExperienceDialog;