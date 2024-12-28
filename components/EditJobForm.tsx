"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
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
    onSuccess: () => {
      toast({ description: "Job Updated" });
      queryClient.invalidateQueries(["jobs", "job", jobId, "stats"]);
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
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
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
          <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
            <CustomFormField name="position" control={form.control} />
            <CustomFormField name="company" control={form.control} />
            <CustomFormField name="location" control={form.control} />
            <CustomFormField name="salary" control={form.control} />
            <CustomFormSelect
              name="status"
              control={form.control}
              labelText="job status"
              items={Object.values(JobStatus)}
            />
            <CustomFormSelect
              name="mode"
              control={form.control}
              labelText="job mode"
              items={Object.values(JobMode)}
            />
            <Button
              type="submit"
              className="self-end capitalize"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Edit Job"}
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
