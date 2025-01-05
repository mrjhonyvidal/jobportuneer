"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import {
  fetchJobInterviews,
  deleteInterviewStepAction,
} from "@/services/interviews";
import { InterviewStageType } from "@/types/types";
import InterviewCard from "./InterviewCard";
import InterviewSidebar from "./InterviewSidebar";
import { useRouter } from "next/navigation";

type InterviewListProps = {
  jobId: string;
};

export default function InterviewList({ jobId }: InterviewListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [selectedInterview, setSelectedInterview] =
    useState<InterviewStageType | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { data: interviews, isLoading } = useQuery({
    queryKey: ["interviews", jobId],
    queryFn: () => fetchJobInterviews(jobId),
  });

  const { mutate: deleteInterview } = useMutation({
    mutationFn: (id: string) => deleteInterviewStepAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews", jobId] });
    },
  });

  if (isLoading) {
    return <div className="text-center py-6">Loading interviews...</div>;
  }

  const completedSteps =
    interviews?.filter(
      (interview: InterviewStageType) => interview.status === "Passed"
    ).length || 0;

  const progress = interviews?.length
    ? (completedSteps / interviews.length) * 100
    : 0;

  return (
    <div className="space-y-8 mt-10">
      {/* Progress Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-semibold text-3xl text-gray-800 mb-4">
          Interview Progress
        </h3>
        <Progress value={progress} className="h-4 rounded-full bg-gray-200" />
        <p className="text-sm text-gray-500 mt-2">
          {completedSteps}/{interviews?.length || 0} steps completed
        </p>
      </div>

      {/* Interview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews?.map((interview: InterviewStageType) => (
          <InterviewCard
            key={interview.id}
            interview={interview}
            onClick={() => {
              setSelectedInterview(interview);
              setSidebarOpen(true);
            }}
            onEdit={() => router.push(`/interviews/${interview.id}`)}
            onDelete={() => deleteInterview(interview.id)}
          />
        ))}
      </div>

      {/* Sidebar */}
      {selectedInterview && (
        <InterviewSidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          interview={selectedInterview}
        />
      )}
    </div>
  );
}
