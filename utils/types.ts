import * as z from "zod";

// **Enums**

export enum JobStatus {
  Pending = "Pending",
  Interview = "Interview",
  Rejected = "Rejected",
  DiscussingOffer = "DiscussingOffer",
  Accepted = "Accepted",
  Declined = "Declined",
}

export enum JobSourceType {
  LinkedIn = "LinkedIn",
  Indeed = "Indeed",
  Glassdoor = "Glassdoor",
  Monster = "Monster",
  AngelList = "AngelList",
  SimplyHired = "SimplyHired",
  Dice = "Dice",
  Hired = "Hired",
  CareerBuilder = "CareerBuilder",
  YCombinator = "YCombinator",
  Other = "Other",
}

export enum WorkType {
  Hybrid = "Hybrid",
  Onsite = "Onsite",
  Remote = "Remote",
  Flexible = "Flexible",
}

export enum EmploymentType {
  FullTime = "Full-Time",
  PartTime = "Part-Time",
  Contract = "Contract",
  Internship = "Internship",
  Freelance = "Freelance",
  Temporary = "Temporary",
}

export enum InterviewStageStatus {
  Pending = "Pending",
  Passed = "Passed",
  DoneWaitingResponse = "Done-Waiting Response",
  Cancelled = "Cancelled",
}

export enum ReminderType {
  Email = "Email",
  SMS = "SMS",
  Notification = "Notification",
}

export enum ReminderStatus {
  Active = "Active",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export enum ContactRole {
  Recruiter = "Recruiter",
  HiringManager = "Hiring Manager",
  Interviewer = "Interviewer",
}

export enum TipCategory {
  Resume = "Resume",
  Interview = "Interview",
  Negotiation = "Negotiation",
  FollowUp = "Follow-Up",
}

export enum PriorityType {
  DreamJob = "Dream Job", // Top priority, aligns with long-term goals
  GreatOpportunity = "Great Opportunity", // Strong interest but not the absolute top
  BackupOption = "Backup Option", // Safe choice or fallback
  ExploringInterest = "Exploring Interest", // Curious but not highly interested
}

// **Types**

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  salary?: string | null;
  salaryAsked?: string | null;
  salaryRange?: string | null;
  salaryOffered?: string | null;
  status: JobStatus;
  workType: WorkType;
  employmentType: EmploymentType;
  description?: string | null;
  experienceRequired?: number | null;
  priority?: PriorityType | null;
  requirements?: string[] | null;
  benefits?: string[] | null;
  interviewStages?: InterviewStageType[] | null;
  dateApplied?: Date | null;
  sentFollowupToRecruiter: boolean;
  urlJobSource?: string | null;
  jobSource: JobSourceType | string;
};

export type InterviewStageType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  jobId: string;
  stageName: string;
  description?: string | null;
  status: InterviewStageStatus;
  scheduledDate?: Date | null;
  durationMinutes?: number | null;
  interviewNotes?: string | null;
  feedbackNotes?: string | null;
  tips?: TipType[] | null;
};

export type RemindersType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  jobId: string;
  title: string;
  reminderDate: Date;
  reminderType: ReminderType;
  status: ReminderStatus;
  notes?: string | null;
};

export type TipType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  jobId?: string | null;
  interviewStageId?: string | null;
  title: string;
  content: string;
  category: TipCategory;
};

export type ContactType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  jobId: string;
  contactName: string;
  role: ContactRole;
  email: string;
  phone?: string | null;
  company?: string | null;
  notes?: string | null;
};

export type PreferenceType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  followUpFrequencyDays: number;
  remindBeforeInterview: number;
  notifyJobStatusChange: boolean;
  customPreferences?: Record<string, any> | null;
};

// **Zod Schema for Job Validation**

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
