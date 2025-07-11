import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SkillDialogProps {
  isAddingLink: boolean;
  setIsAddingLink: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  url: string;
  setUrl: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
  isEditing?: boolean;
  onClose?: () => void;
}

const SkillDialog = ({ 
    isAddingLink, 
    setIsAddingLink,
    handleSubmit,
    url,
    setUrl,
    platform,
    setPlatform,
    isEditing = false,
    onClose
}: SkillDialogProps) => {

  const handleOpenChange = (open: boolean) => {
    setIsAddingLink(open);
    if (!open && onClose) {
      onClose();
    }
  };

  return(
    <Dialog open={isAddingLink} onOpenChange={handleOpenChange}>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Skill" : "Add Skill"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="platform">Skill Name</Label>
              <Input
                id="platform"
                placeholder="e.g., React, Node.js"
                className="mt-2"
                name="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="url">Image URL</Label>
              <Input 
                id="url" 
                placeholder="https://" 
                className="mt-2" 
                name="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)} 
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingLink(false);
                  if (onClose) onClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Skill" : "Add Skill"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
};

export default SkillDialog;