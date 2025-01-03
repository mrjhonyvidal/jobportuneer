"use client";

import React, { useRef, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { Trash, Plus, MoreHorizontal } from "lucide-react";

import {
  createAndEditJobSchema,
  CreateAndEditJobType,
} from "@/utils/validators";
import {
  EmploymentType,
  JobSourceType,
  JobStatus,
  PriorityType,
  WorkType,
} from "@/types/enums";
import CustomFormSelect, { CustomFormField } from "../shared/FormComponents";
import JobDetailsSidebar from "./JobDetailsSidebar";
import { getSingleJobAction, updateJobAction } from "@/services/jobs";

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
    jobSource: JobSourceType.CompanyWebsite,
    urlJobSource: "",
    status: JobStatus.ToApply,
    employmentType: EmploymentType.FullTime,
    priority: PriorityType.GreatOpportunity,
  };

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      ...defaultValues,
      ...data,
      dateApplied: data?.dateApplied ? new Date(data.dateApplied) : null,
    },
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
    if (values.dateApplied) {
      values.dateApplied = new Date(values.dateApplied);
    }
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

          {/* Group 1: Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <CustomFormSelect
              name="jobSource"
              control={form.control}
              labelText="Source"
              items={Object.values(JobSourceType)}
              tooltip="Select where you found this job."
            />
            <CustomFormField
              name="urlJobSource"
              control={form.control}
              labelText="URL to the Job Post"
              placeholder="https://www.ycombinator.com/companies/x/jobs/tech-leader"
              tooltip="Provide the job posting link if applicable."
            />
            <CustomFormField
              name="position"
              control={form.control}
              labelText="Job Position"
              isRequired={true}
              tooltip="Specify the title of the job position."
            />
            <CustomFormField
              name="company"
              control={form.control}
              labelText="Company"
              isRequired={true}
              tooltip="Enter the name of the company offering the job."
            />
            <CustomFormField
              name="location"
              control={form.control}
              labelText="Location"
              isRequired={true}
              tooltip="Specify the job location."
            />
            <CustomFormField
              name="salary"
              control={form.control}
              labelText="Salary Offered"
              tooltip="Provide the salary being offered for this job."
            />
            <CustomFormField
              name="salaryAsked"
              control={form.control}
              labelText="Your Expected Salary"
              tooltip="Enter the salary you expect for this role."
            />
            <CustomFormField
              name="salaryRange"
              control={form.control}
              labelText="Salary Range"
              tooltip="Provide a range if applicable (e.g., $50,000 - $60,000)."
            />
            <CustomFormField
              name="description"
              control={form.control}
              labelText="Job Description"
              tooltip="Provide a brief description of the job."
            />
            <CustomFormField
              name="experienceRequired"
              control={form.control}
              labelText="Experience Required (Years)"
              type="number"
              tooltip="Enter the number of years of experience required."
            />
            <CustomFormField
              name="dateApplied"
              control={form.control}
              labelText="Date Applied"
              type="date"
              value={
                form.getValues("dateApplied")
                  ? new Date(form.getValues("dateApplied") as Date)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              tooltip="Select the date you applied for this job."
            />
          </div>

          {/* Group 2: Requirements and Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

          {/* Group 3: Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <CustomFormSelect
              name="status"
              control={form.control}
              labelText="Job Status"
              items={Object.values(JobStatus)}
              tooltip="Update the status of the job application."
            />
            <CustomFormSelect
              name="workType"
              control={form.control}
              labelText="Work Type"
              items={Object.values(WorkType)}
              tooltip="Specify the type of work arrangement."
            />
            <CustomFormSelect
              name="employmentType"
              control={form.control}
              labelText="Employment Type"
              items={Object.values(EmploymentType)}
              tooltip="Select the employment type for the job."
            />
            <CustomFormSelect
              name="priority"
              control={form.control}
              labelText="Priority"
              items={Object.values(PriorityType)}
              tooltip="Set the priority of this job."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="capitalize" disabled={isPending}>
              {isPending ? "Updating..." : "Update Job"}
            </Button>
          </div>
        </form>
      </Form>

      {/* <InterviewList
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
      /> */}

      {sidebarContentType === "job" && data && (
        <JobDetailsSidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          job={data}
        />
      )}

      {/* {sidebarContentType === "interview" && (
        <InterviewTipsSidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )} */}
    </>
  );
}

export default EditJobForm;
