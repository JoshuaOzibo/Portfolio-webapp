import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SkillDialogProps {
  isAddingLink: boolean;
  setIsAddingLink: (value: boolean) => void;
}

const SkillDialog = ({ 
    isAddingLink, 
    setIsAddingLink,
    handleSubmit 
}: SkillDialogProps) => {

  return(
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
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Input
                id="platform"
                placeholder="e.g., GitHub, LinkedIn"
                className="mt-2"
                name="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
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
                onClick={() => setIsAddingLink(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Link
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
};

export default SkillDialog;