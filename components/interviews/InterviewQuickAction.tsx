"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircleMoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface InterviewQuickActionsProps {
  jobId: string;
  onOpenInterviewTips: () => void;
}

export default function InterviewQuickActions({
  jobId,
  onOpenInterviewTips,
}: InterviewQuickActionsProps) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2 justify-start sm:justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
      {/* Back to Job Button */}
      <Button
        variant="outline"
        onClick={() => router.push(`/jobs/${jobId}`)}
        className="flex items-center gap-2 w-full sm:w-auto justify-center"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Job
      </Button>

      {/* Interview Tips Button */}
      <Button
        onClick={onOpenInterviewTips}
        className="flex bg-blue-600 items-center gap-2 w-full sm:w-auto justify-center"
      >
        <MessageCircleMoreIcon className="w-5 h-5" />
        Interview Tips
      </Button>
    </div>
  );
}
