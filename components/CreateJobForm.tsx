"use client";

import React, { useRef, useState } from "react";
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
import { Trash, Plus } from "lucide-react";

function CreateJobForm() {
  const requirementsInputRef = useRef<HTMLInputElement | null>(null);
  const benefitsInputRef = useRef<HTMLInputElement | null>(null);

  const [isModalOpen, setModalOpen] = useState(true);
  const [jobSource, setJobSource] = useState<JobSourceType | "Other">("Other");
  const [urlJobSource, setUrlJobSource] = useState("");

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
      status: JobStatus.ToApply,
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

  const handleModalSubmit = (source: string, url: string) => {
    form.setValue("jobSource", source);
    form.setValue("urlJobSource", url);
    setModalOpen(false);
  };

  const onSubmit = (values: CreateAndEditJobType) => {
    if (values.dateApplied) {
      values.dateApplied = new Date(values.dateApplied);
    }
    mutate(values);
  };

  const requirements = form.watch("requirements") || [];
  const benefits = form.watch("benefits") || [];

  return (
    <>
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
                tooltip="Enter the title of the job you are applying for."
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
                tooltip="Enter the salary being offered for this position."
              />
              <CustomFormField
                name="salaryAsked"
                control={form.control}
                labelText="Salary Asked by You"
                tooltip="Enter the salary you are expecting for this position."
              />
              <CustomFormField
                name="salaryRange"
                control={form.control}
                labelText="Salary Range"
                tooltip="Provide a salary range, e.g., $50,000 - $60,000."
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
                tooltip="Enter the years of experience required for this job."
              />
              <CustomFormField
                name="dateApplied"
                control={form.control}
                labelText="Date Applied"
                type="date"
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
                tooltip="Select the current status of the job application."
              />
              <CustomFormSelect
                name="workType"
                control={form.control}
                labelText="Work Type"
                items={Object.values(WorkType)}
                tooltip="Specify the type of work arrangement for this job."
              />
              <CustomFormSelect
                name="employmentType"
                control={form.control}
                labelText="Employment Type"
                items={Object.values(EmploymentType)}
                tooltip="Select the type of employment offered for this job."
              />
              <CustomFormSelect
                name="priority"
                control={form.control}
                labelText="Priority"
                items={Object.values(PriorityType)}
                tooltip="Set the priority level for this job application."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="capitalize" disabled={isPending}>
                {isPending ? "Loading..." : "Add Job"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}

export default CreateJobForm;
