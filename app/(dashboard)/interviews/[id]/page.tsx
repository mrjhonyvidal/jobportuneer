"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { CustomFormField } from "@/components/shared/FormComponents";
import {
  createInterviewStepSchema,
  CreateInterviewStepType,
} from "@/utils/validators";
import {
  fetchSingleInterview,
  updateInterviewStepAction,
} from "@/services/interviews";

export default function JobInterviewStepEdit({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { toast } = useToast();
  const router = useRouter();

  // Fetch the interview data
  const { data: interview, isLoading } = useQuery({
    queryKey: ["interview", id],
    queryFn: () => fetchSingleInterview(id),
  });

  // Initialize the form
  const form = useForm<CreateInterviewStepType>({
    resolver: zodResolver(createInterviewStepSchema),
    defaultValues: {
      stageName: "",
      description: "",
      scheduledDate: null,
      durationMinutes: null,
      feedbackNotes: "",
      interviewNotes: "",
    },
  });

  // Update the form values when data is fetched
  useEffect(() => {
    if (interview) {
      form.reset({
        ...interview,
        scheduledDate: interview.scheduledDate
          ? new Date(interview.scheduledDate).toISOString().slice(0, 16) // Format for datetime-local input
          : null,
      });
    }
  }, [interview, form]);

  // Mutation to update the interview step
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateInterviewStepType) =>
      updateInterviewStepAction(id, values),
    onSuccess: () => {
      toast({ description: "Interview step updated successfully!" });
      router.push(`/jobs/${interview?.jobId}`);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading interview step...</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className="bg-muted p-8 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">
          Edit Interview Step
        </h2>

        {/* Stage Name */}
        <CustomFormField
          name="stageName"
          control={form.control}
          labelText="Stage Name"
          className="mt-1"
        />

        {/* Description */}
        <CustomFormField
          name="description"
          control={form.control}
          labelText="Description"
          as="textarea"
          className="mt-1 min-h-[100px] resize-none"
        />

        {/* Scheduled Date */}
        <CustomFormField
          name="scheduledDate"
          control={form.control}
          labelText="Scheduled Date"
          type="datetime-local"
          className="mt-1"
        />

        {/* Duration */}
        <CustomFormField
          name="durationMinutes"
          control={form.control}
          labelText="Duration (Minutes)"
          type="number"
          className="mt-1"
        />

        {/* Feedback Notes */}
        <CustomFormField
          name="feedbackNotes"
          control={form.control}
          labelText="Feedback Notes"
          as="textarea"
          className="mt-1 min-h-[100px] resize-none"
        />

        {/* Interview Notes */}
        <CustomFormField
          name="interviewNotes"
          control={form.control}
          labelText="Interview Notes"
          as="textarea"
          className="mt-1 min-h-[100px] resize-none"
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Form>
  );
}
