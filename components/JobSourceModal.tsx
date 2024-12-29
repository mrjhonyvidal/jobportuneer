import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { JobSourceType } from "@/utils/types";

interface JobSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (source: string, url: string) => void; // Ensure both values are passed as strings
}

export function JobSourceModal({
  isOpen,
  onClose,
  onSubmit,
}: JobSourceModalProps) {
  const [sourceType, setSourceType] = useState<string>("Other");
  const [urlJobSource, setUrlJobSource] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleModalSubmit = () => {
    if (!sourceType) {
      setError("Please select a job source.");
      return;
    }

    if (!urlJobSource) {
      setError("Please provide a URL to the job post.");
      return;
    }

    setError(""); // Clear errors
    onSubmit(sourceType, urlJobSource); // Pass values to parent
    onClose(); // Close modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Add Job Source</DialogTitle>
        <DialogDescription>
          Select a source and provide a URL to the job post.
        </DialogDescription>

        {/* Job Source Dropdown */}
        <Select
          onValueChange={(value) => {
            setSourceType(value);
            setError(""); // Clear error when source is selected
          }}
        >
          <SelectTrigger className="w-full mt-4">
            {sourceType || "Select Job Source"}
          </SelectTrigger>
          <SelectContent>
            {Object.values(JobSourceType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* URL Input Field */}
        <Input
          placeholder="URL to the job post"
          value={urlJobSource}
          onChange={(e) => {
            setUrlJobSource(e.target.value);
            setError(""); // Clear error when typing
          }}
          className="mt-4"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-between gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Skip
          </Button>
          <Button onClick={handleModalSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
