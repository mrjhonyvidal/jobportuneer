"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  PriorityType,
  JobStatus,
  WorkType,
  EmploymentType,
  JobSourceType,
} from "@/utils/types";
import { createJobAction } from "@/utils/actions";
import { JobSourceModal } from "./JobSourceModal";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomFormField, CustomFormSelect } from "./FormComponents";

function CreateJobForm() {
  const [isModalOpen, setModalOpen] = useState(true);
  const [jobSource, setJobSource] = useState<JobSourceType | "Other">("Other");
  const [urlJobSource, setUrlJobSource] = useState("");
  const [prefillData, setPrefillData] =
    useState<Partial<CreateAndEditJobType> | null>(null);

  const { toast } = useToast();
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      salary: "",
      salaryAsked: "",
      salaryRange: "",
      salaryOffered: "",
      workType: WorkType.Hybrid,
      status: JobStatus.Pending,
      employmentType: EmploymentType.FullTime,
      priority: PriorityType.GreatOpportunity,
      requirements: [],
      benefits: [],
      description: "",
      experienceRequired: null,
      dateApplied: null,
      sentFollowupToRecruiter: false,
      jobSource: jobSource,
      urlJobSource: urlJobSource,
      ...prefillData,
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: () => {
      toast({ description: "Job created successfully" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      router.push("/jobs");
    },
  });

  const handleModalSubmit = (source: string, url: string) => {
    form.setValue("jobSource", source); // Update form field
    form.setValue("urlJobSource", url); // Update form field
    setModalOpen(false); // Close modal
  };

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  return (
    <>
      {/* Modal for job source */}
      <JobSourceModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      {!isModalOpen && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-muted p-8 rounded"
          >
            <h2 className="capitalize font-semibold text-4xl mb-6">Add Job</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
              <CustomFormField name="position" control={form.control} />
              <CustomFormField name="company" control={form.control} />
              <CustomFormField name="location" control={form.control} />
              <CustomFormField name="salary" control={form.control} />
              <CustomFormField name="salaryAsked" control={form.control} />
              <CustomFormField name="salaryRange" control={form.control} />
              <CustomFormSelect
                name="status"
                control={form.control}
                labelText="Job Status"
                items={Object.values(JobStatus)}
              />
              <CustomFormSelect
                name="workType"
                control={form.control}
                labelText="Work Type"
                items={Object.values(WorkType)}
              />
              <CustomFormSelect
                name="employmentType"
                control={form.control}
                labelText="Employment Type"
                items={Object.values(EmploymentType)}
              />
              <CustomFormSelect
                name="priority"
                control={form.control}
                labelText="Priority"
                items={Object.values(PriorityType)}
              />
              <CustomFormSelect
                name="jobSource"
                control={form.control}
                labelText="Source"
                items={Object.values(JobSourceType)}
              />
              <CustomFormField
                name="urlJobSource"
                control={form.control}
                labelText="URL to the Job Post"
                placeholder="https://example.com"
              />
              <Button
                type="submit"
                className="self-end capitalize"
                disabled={isPending}
              >
                {isPending ? "Loading" : "Add Job"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}

export default CreateJobForm;
