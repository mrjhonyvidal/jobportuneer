export enum JobStatus {
  ToApply = "To Apply", // Represents jobs the user is interested in but hasn't applied for yet.
  Applied = "Applied", // Represents jobs where applications have been submitted.
  Screening = "Screening", // Represents the employer's initial review of the application.
  Interviewing = "Interviewing", // Represents any stage of interviews.
  OfferExtended = "Offer Extended", // Represents jobs where an offer has been made.
  Negotiating = "Negotiating", // Represents the offer discussion or negotiation phase.
  Accepted = "Accepted", // Represents jobs where the offer has been accepted.
  Declined = "Declined", // Represents jobs where the offer has been declined by the user.
  Rejected = "Rejected", // Represents jobs where the application was rejected by the employer.
  OnHold = "On Hold", // Represents jobs where the process is paused by either party.
  Withdrawn = "Withdrawn", // Represents jobs where the user has chosen to withdraw their application.
}

export enum JobSourceType {
  LinkedIn = "LinkedIn",
  Indeed = "Indeed",
  Glassdoor = "Glassdoor",
  YCombinator = "YCombinator",
  CompanyWebsite = "Company Website",
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
