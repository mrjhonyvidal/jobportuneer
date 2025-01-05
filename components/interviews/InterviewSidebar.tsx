"use client";

import React from "react";
import { InterviewStageType } from "@/types/types";
import { Button } from "@/components/ui/button";
import RightSidebar from "@/components/theme/RightSidebar";
import { CalendarIcon, Clock, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface InterviewSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  interview: InterviewStageType;
}

export default function InterviewSidebar({
  isOpen,
  onClose,
  interview,
}: InterviewSidebarProps) {
  const router = useRouter();

  if (!interview) return null;

  const detailsSections = [
    {
      title: "Stage Name",
      icon: <FileText className="w-5 h-5 text-primary" />,
      content: interview.stageName || "Not specified",
    },
    {
      title: "Description",
      icon: <FileText className="w-5 h-5 text-primary" />,
      content: interview.description || "No description provided.",
    },
    {
      title: "Scheduled Date",
      icon: <CalendarIcon className="w-5 h-5 text-primary" />,
      content: interview.scheduledDate
        ? `${new Date(
            interview.scheduledDate
          ).toLocaleDateString()} at ${new Date(
            interview.scheduledDate
          ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
        : "Not scheduled",
    },
    {
      title: "Duration (Minutes)",
      icon: <Clock className="w-5 h-5 text-primary" />,
      content: `${interview.durationMinutes || 0} mins`,
    },
    {
      title: "Feedback Notes",
      icon: <FileText className="w-5 h-5 text-primary" />,
      content: interview.feedbackNotes || "No feedback notes provided.",
    },
    {
      title: "Interview Notes",
      icon: <FileText className="w-5 h-5 text-primary" />,
      content: interview.interviewNotes || "No interview notes provided.",
    },
  ];

  return (
    <RightSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Interview Details"
      sections={detailsSections}
      footer={
        <Button
          className="w-full"
          onClick={() => router.push(`/interviews/${interview.id}`)}
        >
          Edit Interview
        </Button>
      }
    />
  );
}
