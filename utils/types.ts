import * as z from "zod";

// **Enums**

export enum JobStatus {
  Pending = "Pending",
  Interview = "Interview",
  Rejected = "Rejected",
  DiscussingOffer = "Discussing Offer",
  Accepted = "Accepted",
  Declined = "Declined",
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
  Completed = "Completed",
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
  salary: string;
  salaryAsked?: string;
  salaryRange?: string;
  salaryOffered?: string;
  status: JobStatus;
  workType: WorkType;
  employmentType: EmploymentType;
  description?: string;
  experienceRequired?: number;
  priority?: PriorityType;
  requirements?: string[];
  benefits?: string[];
  interviewStages?: InterviewStageType[];
  dateApplied?: Date;
  sentFollowupToRecruiter: boolean;
};

export type InterviewStageType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  jobId: string;
  stageName: string;
  description?: string;
  status: InterviewStageStatus;
  scheduledDate?: Date;
  durationMinutes?: number;
  notes?: string;
  tips?: TipType[];
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
  notes?: string;
};

export type TipType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  jobId?: string;
  interviewStageId?: string;
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
  phone?: string;
  company?: string;
  notes?: string;
};

export type PreferenceType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  followUpFrequencyDays: number;
  remindBeforeInterview: number;
  notifyJobStatusChange: boolean;
  customPreferences?: Record<string, any>;
};

// **Zod Schema for Job Validation**

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  salary: z.string().min(2, {
    message: "Salary must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  status: z.nativeEnum(JobStatus, {
    message: "Status must be a valid status.",
  }),
  workType: z.nativeEnum(WorkType, {
    message: "Work Type must be a valid type.",
  }),
  employmentType: z.nativeEnum(EmploymentType, {
    message: "Employment Type must be a valid type.",
  }),
  salaryAsked: z.string().optional(),
  salaryRange: z.string().optional(),
  salaryOffered: z.string().optional(),
  description: z.string().optional(),
  experienceRequired: z.number().min(0).optional(),
  priority: z.nativeEnum(PriorityType).optional(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  interviewStages: z.array(z.string()).optional(),
  dateApplied: z.date().optional(),
  sentFollowupToRecruiter: z.boolean().optional(),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
