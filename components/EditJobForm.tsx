"use client";

import React, { useRef, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  JobStatus,
  WorkType,
  EmploymentType,
  createAndEditJobSchema,
  CreateAndEditJobType,
  PriorityType,
  JobSourceType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import { Trash, Plus, MoreHorizontal } from "lucide-react";
import InterviewList from "./InterviewList";
import JobDetailsSidebar from "./JobDetailsSidebar";
import InterviewTipsSidebar from "./InterviewTipsSidebar";

function EditJobForm({ jobId }: { jobId: string }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContentType, setSidebarContentType] = useState<
    "job" | "interview"
  >("job");

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const requirementsInputRef = useRef<HTMLInputElement | null>(null);
  const benefitsInputRef = useRef<HTMLInputElement | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: () => {
      toast({ description: "Job Updated Successfully" });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      refetch(); // Ensure the latest data is fetched
    },
  });

  const defaultValues = {
    position: "",
    company: "",
    location: "",
    salary: "",
    salaryAsked: "",
    salaryRange: "",
    description: "",
    experienceRequired: null,
    requirements: [],
    benefits: [],
    dateApplied: null,
    sentFollowupToRecruiter: false,
    workType: WorkType.Hybrid,
    jobSource: JobSourceType.Other,
    urlJobSource: "",
    status: JobStatus.Pending,
    employmentType: EmploymentType.FullTime,
    priority: PriorityType.GreatOpportunity,
  };

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: data || defaultValues,
  });

  // Update form values when `data` changes
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const requirements =
    useWatch({ control: form.control, name: "requirements" }) || [];
  const benefits = useWatch({ control: form.control, name: "benefits" }) || [];

  const handleAddItem = (name: "requirements" | "benefits", value: string) => {
    if (value.trim()) {
      const current = form.getValues(name) || [];
      form.setValue(name, [...current, value.trim()]);
    }
  };

  const handleRemoveItem = (
    name: "requirements" | "benefits",
    index: number
  ) => {
    const current = form.getValues(name) || [];
    form.setValue(
      name,
      current.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Top Actions Buttons Section */}
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
            Edit Job Details
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
            <CustomFormField name="position" control={form.control} />
            <CustomFormField name="company" control={form.control} />
            <CustomFormField name="location" control={form.control} />
            <CustomFormField name="salary" control={form.control} />
            <CustomFormField name="salaryAsked" control={form.control} />
            <CustomFormField name="salaryRange" control={form.control} />
            <CustomFormField name="description" control={form.control} />
            <CustomFormField
              name="experienceRequired"
              control={form.control}
              labelText="Experience Required (Years)"
              type="number"
            />
            <CustomFormField
              name="dateApplied"
              control={form.control}
              labelText="Date Applied"
              type="date"
            />

            {/* Requirements and Benefits Section */}
            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <div className="flex flex-col gap-2">
                  {requirements.map((req: string, index: number) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center border border-gray-300 p-2 rounded bg-gray-50 shadow-sm"
                    >
                      <span className="truncate">{req}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem("requirements", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Add a requirement"
                      ref={requirementsInputRef}
                      className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && requirementsInputRef.current) {
                          e.preventDefault();
                          handleAddItem(
                            "requirements",
                            requirementsInputRef.current.value
                          );
                          requirementsInputRef.current.value = "";
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
                      onClick={() => {
                        if (requirementsInputRef.current?.value) {
                          handleAddItem(
                            "requirements",
                            requirementsInputRef.current.value
                          );
                          requirementsInputRef.current.value = "";
                        }
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Benefits</h3>
                <div className="flex flex-col gap-2">
                  {benefits.map((ben: string, index: number) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center border border-gray-300 p-2 rounded bg-gray-50 shadow-sm"
                    >
                      <span className="truncate">{ben}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem("benefits", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Add a benefit"
                      ref={benefitsInputRef}
                      className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && benefitsInputRef.current) {
                          e.preventDefault();
                          handleAddItem(
                            "benefits",
                            benefitsInputRef.current.value
                          );
                          benefitsInputRef.current.value = "";
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
                      onClick={() => {
                        if (benefitsInputRef.current?.value) {
                          handleAddItem(
                            "benefits",
                            benefitsInputRef.current.value
                          );
                          benefitsInputRef.current.value = "";
                        }
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
