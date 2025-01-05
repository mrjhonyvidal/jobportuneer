"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomFormField, CustomFormSelect } from "../shared/FormComponents";
import { Plus } from "lucide-react";
import {
  createInterviewStepSchema,
  CreateInterviewStepType,
} from "@/utils/validators";
import { InterviewStageStatus } from "@/types/enums";
import { createInterviewStepAction } from "@/services/interviews";
import { Form } from "@/components/ui/form";

export default function CreateInterviewModal({
  jobId,
  children,
}: {
  jobId: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CreateInterviewStepType>({
    resolver: zodResolver(createInterviewStepSchema),
    defaultValues: {
      stageName: "",
      description: "",
      scheduledDate: undefined,
      durationMinutes: 30,
      status: InterviewStageStatus.Pending,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateInterviewStepType) =>
      createInterviewStepAction(jobId, values),
    onSuccess: () => {
      toast({ description: "Interview step added successfully!" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      console.error("Error creating interview step:", error);
      toast({
        description: "The interview step could not be created.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: CreateInterviewStepType) => {
    if (values.scheduledDate) {
      values.scheduledDate = new Date(values.scheduledDate);
    }

    mutate(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Interview</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Stage Name */}
            <CustomFormField
              name="stageName"
              control={form.control}
              labelText="Stage Name"
              isRequired={true}
              tooltip="Enter the name of the interview stage."
              placeholder="e.g., Technical Interview"
            />

            {/* Description */}
            <CustomFormField
              name="description"
              control={form.control}
              labelText="Description"
              as="textarea"
              className="min-h-[120px] resize-none"
              placeholder="Enter a description for this stage."
            />

            {/* Scheduled Date and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                name="scheduledDate"
                control={form.control}
                labelText="Scheduled Date"
                type="date"
                tooltip="Select the scheduled date and time for this interview."
              />
              <CustomFormField
                name="durationMinutes"
                control={form.control}
                labelText="Duration (Minutes)"
                type="number"
                placeholder="e.g., 60"
                tooltip="Enter the duration of the interview in minutes."
              />
            </div>

            {/* Status */}
            <CustomFormSelect
              name="status"
              control={form.control}
              labelText="Status"
              items={Object.values(InterviewStageStatus)}
              tooltip="Select the current status of this interview stage."
            />

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
