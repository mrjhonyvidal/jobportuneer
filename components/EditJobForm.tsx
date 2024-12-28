"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  JobStatus,
  WorkType,
  EmploymentType,
  createAndEditJobSchema,
  CreateAndEditJobType,
  PriorityType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import InterviewList from "./InterviewList";
import JobDetailsSidebar from "./JobDetailsSidebar";
import InterviewTipsSidebar from "./InterviewTipsSidebar";
import { MoreHorizontal } from "lucide-react";

function EditJobForm({ jobId }: { jobId: string }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContentType, setSidebarContentType] = useState<
    "job" | "interview"
  >("job");

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "There was an error",
        });
        return;
      }
      toast({ description: "Job Updated" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      router.push("/jobs");
    },
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      salary: data?.salary || "",
      salaryAsked: data?.salaryAsked || "",
      salaryRange: data?.salaryRange || "",
      workType: (data?.workType as WorkType) || WorkType.Hybrid,
      status: (data?.status as JobStatus) || JobStatus.Pending,
      employmentType:
        (data?.employmentType as EmploymentType) || EmploymentType.FullTime,
      priority:
        (data?.priority as PriorityType) || PriorityType.GreatOpportunity,
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => mutate(values);

  return (
    <>
      {/* Button Section */}
      <div className="flex justify-end items-center mb-6">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setSidebarContentType("job");
              setSidebarOpen(true);
            }}
            className="flex items-center gap-2"
          >
            Open Job Details
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSidebarContentType("interview");
              setSidebarOpen(true);
            }}
            className="flex items-center gap-2"
          >
            <MoreHorizontal className="w-5 h-5" />
            More Options
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-muted p-8 rounded"
        >
          <h2 className="capitalize font-semibold text-4xl mb-6">
            Job Details
          </h2>
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
            <Button
              type="submit"
              className="self-end capitalize"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Job"}
            </Button>
          </div>
        </form>
      </Form>

      <InterviewList
        steps={[
          {
            title: "Phone Screening",
            description: "Initial call with HR.",
            completed: true,
          },
          {
            title: "Technical Assessment",
            description: "Online coding test.",
            completed: false,
          },
          {
            title: "Final Interview",
            description: "Discussion with the leadership team.",
            completed: false,
          },
        ]}
      />

      {sidebarContentType === "job" && data && (
        <JobDetailsSidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          job={data}
        />
      )}

      <Button
        variant="secondary"
        onClick={() => {
          setSidebarContentType("interview");
          setSidebarOpen(true);
        }}
      >
        Open Interview Tips
      </Button>

      {sidebarContentType === "interview" && (
        <InterviewTipsSidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
export default EditJobForm;
