import {
  ContactRole,
  EmploymentType,
  InterviewStageStatus,
  JobSourceType,
  JobStatus,
  PriorityType,
  ReminderStatus,
  ReminderType,
  TipCategory,
  WorkType,
} from "./enums";

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

export type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
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

export type Event = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  variant: string;
};
