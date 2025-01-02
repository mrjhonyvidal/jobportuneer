// **Zod Schema for Job Validation**
import {
  EmploymentType,
  JobStatus,
  PriorityType,
  WorkType,
} from "@/types/enums";
import * as z from "zod";

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  salary: z.string().nullable().optional(),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  status: z.nativeEnum(JobStatus, {
    message: "Status must be a valid status.",
  }),
  workType: z.nativeEnum(WorkType, {
    message: "Work Type must be a valid type.",
  }),
  jobSource: z
    .string()
    .min(2, { message: "Source must be at least 2 characters." }),
  employmentType: z.nativeEnum(EmploymentType, {
    message: "Employment Type must be a valid type.",
  }),
  salaryAsked: z.string().nullable().optional(),
  salaryRange: z.string().nullable().optional(),
  salaryOffered: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  experienceRequired: z.preprocess(
    (value) => (value !== null && value !== undefined ? Number(value) : value),
    z.number().min(0).nullable().optional()
  ),
  priority: z.nativeEnum(PriorityType).nullable().optional(),
  requirements: z.array(z.string()).nullable().optional(),
  benefits: z.array(z.string()).nullable().optional(),
  dateApplied: z.preprocess(
    (value) => (typeof value === "string" ? new Date(value) : value),
    z.date().nullable().optional()
  ),
  sentFollowupToRecruiter: z.boolean().optional(),
  urlJobSource: z.string().nullable().optional(),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;

export const feedbackSchema = z.object({
  feedback: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters long." })
    .max(400, { message: "Feedback must be at most 400 characters long." }),
  rating: z.number().min(1, { message: "Rating must be at least 1 star." }),
});

export type FeedbackType = z.infer<typeof feedbackSchema>;
