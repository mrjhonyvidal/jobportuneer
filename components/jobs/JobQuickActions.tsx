"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  MessageCircleMoreIcon,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import CreateInterviewModal from "../interviews/CreateInterviewModal";

interface JobQuickActionsProps {
  jobId: string;
  onOpenJobDetails: () => void;
  onOpenInterviewTips: () => void;
}

export default function JobQuickActions({
  jobId,
  onOpenJobDetails,
  onOpenInterviewTips,
}: JobQuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-start sm:justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
      {/* Add Interview Button */}
      <CreateInterviewModal jobId={jobId}>
        <Button className="bg-blue-600 flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus className="w-5 h-5" />
          Add Interview
        </Button>
      </CreateInterviewModal>
      {/* Open Job Details Button */}
      <Button
        variant="outline"
        onClick={onOpenJobDetails}
        className="flex items-center gap-2 w-full sm:w-auto justify-center"
      >
        <FileText className="w-5 h-5" />
        Open Job Details
      </Button>

      {/* Interview Tips Button */}
      <Button
        variant="outline"
        onClick={onOpenInterviewTips}
        className="flex items-center gap-2 w-full sm:w-auto justify-center"
      >
        <MessageCircleMoreIcon className="w-5 h-5" />
        Interview Tips
      </Button>
    </div>
  );
}
