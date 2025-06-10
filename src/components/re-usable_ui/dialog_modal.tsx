import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload } from "lucide-react";

import React from "react";

interface DialogModalProps {
  isAddingProject: boolean;
  setIsAddingProject: (value: boolean) => void;
  contentHeader_Title: string;
  children: React.ReactNode;
  Title_button: string;
  create_repo: string;
}

const DialogModal: React.FC<DialogModalProps> = ({
  isAddingProject,
  setIsAddingProject,
  contentHeader_Title,
  children,
  Title_button,
  create_repo
}) => {
  return (
    <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="h-4 w-4" />
          {/* button to be triggered */}
          {Title_button}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{contentHeader_Title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Project Image Upload */}
          {children}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddingProject(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {create_repo}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
