"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  PriorityType,
  JobStatus,
  WorkType,
  EmploymentType,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { CustomFormField, CustomFormSelect } from "./FormComponents";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobAction } from "@/utils/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function CreateJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      salary: "",
      workType: WorkType.Hybrid,
      status: JobStatus.Pending,
      employmentType: EmploymentType.FullTime,
      salaryAsked: "",
      salaryRange: "",
      priority: PriorityType.GreatOpportunity,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      console.log(data);
      if (!data) {
        toast({ description: "There was an error creating the job" });
        return;
      }

      toast({ description: "Job created successfully" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      //form.reset();
      router.push("/jobs");
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
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
            {isPending ? "Loading" : "Add Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateJobForm;
