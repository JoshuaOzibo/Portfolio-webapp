'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Dispatch, SetStateAction } from "react"


type ExperienceDialogProps = {
  isEditing?: boolean;
  onClose?: () => void;
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
    isPosting: boolean,
    isUpdating: boolean,
}


const ExperienceDialog: React.FC<ExperienceDialogProps> = ({
    isAddingExperience,
    isPosting,
    isUpdating,
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
                        <Label htmlFor="image">Work Image</Label>
                        <Input 
                            id="image" 
                            type="file" 
                            accept="image/*"
                            className="mt-2" 
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    // Convert file to base64 or handle upload
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        setImage(event.target?.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }} 
                        />
                        {image && (
                            <div className="mt-2">
                                <img src={image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="current" className="rounded" checked={isCurrent} onChange={() => setIsCurrent(!isCurrent)} />
                        <Label htmlFor="current">I currently work here</Label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={() => setIsAddingExperience(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>{`${isPosting ? "Adding Experience..." : "Add Experience" } ${isUpdating ? "updating experience" : ""} `}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
};


export default ExperienceDialog;