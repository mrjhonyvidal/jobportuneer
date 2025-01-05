"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  fetchJobInterviews,
  deleteInterviewStepAction,
} from "@/services/interviews";
import { InterviewStageType } from "@/types/types";
import { useRouter } from "next/navigation";

type InterviewListProps = {
  jobId: string;
};

export default function InterviewList({ jobId }: InterviewListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

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
    <div className="space-y-8">
      {/* Progress Section */}
      <div>
        <h3 className="font-semibold text-3xl text-gray-800 mb-4">
          Interview Progress
        </h3>
        <Progress value={progress} className="h-4 rounded-full bg-gray-200" />
        <p className="text-sm text-gray-500 mt-2">
          {completedSteps}/{interviews?.length || 0} steps completed
        </p>
      </div>

      {/* Interview Cards */}
      <div className="space-y-6">
        {interviews?.map((interview: InterviewStageType) => (
          <InterviewCard
            key={interview.id}
            interview={interview}
            onDelete={() => deleteInterview(interview.id)}
            onEdit={() => router.push(`/interviews/${interview.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

type InterviewCardProps = {
  interview: InterviewStageType;
  onDelete: () => void;
  onEdit: () => void;
};

function InterviewCard({ interview, onDelete, onEdit }: InterviewCardProps) {
  return (
    <Card className="shadow-sm border">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg font-medium">
          {interview.stageName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm italic mb-3">
          {interview.description || "No description provided."}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-gray-800">Status:</span>{" "}
          <span
            className={`font-semibold ${
              interview.status === "Pending"
                ? "text-yellow-600"
                : interview.status === "Passed"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {interview.status}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
