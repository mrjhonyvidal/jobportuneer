"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs";
import {
  JobType,
  CreateAndEditJobType,
  createAndEditJobSchema,
  PriorityType,
  JobStatus,
  WorkType,
  EmploymentType,
  JobSourceType,
} from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
}

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateAndRedirect();

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { position: { contains: search } },
          { company: { contains: search } },
        ],
      };
    }
    if (jobStatus && jobStatus !== "all") {
      whereClause = { ...whereClause, status: jobStatus };
    }

    const skip = (page - 1) * limit;

    const rawJobs = await prisma.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        clerkId: true,
        createdAt: true,
        updatedAt: true,
        position: true,
        company: true,
        location: true,
        salary: true,
        salaryAsked: true,
        salaryRange: true,
        salaryOffered: true,
        status: true,
        workType: true,
        employmentType: true,
        description: true,
        experienceRequired: true,
        priority: true,
        requirements: true,
        benefits: true,
        dateApplied: true,
        sentFollowupToRecruiter: true,
        jobSource: true,
        urlJobSource: true,
      },
    });

    const jobs: JobType[] = rawJobs.map((job) => ({
      ...job,
      salary: job.salary || undefined,
      salaryAsked: job.salaryAsked || undefined,
      salaryRange: job.salaryRange || undefined,
      salaryOffered: job.salaryOffered || undefined,
      description: job.description || undefined,
      experienceRequired: job.experienceRequired || undefined,
      priority: job.priority as PriorityType,
      requirements: job.requirements || undefined,
      benefits: job.benefits || undefined,
      dateApplied: job.dateApplied || undefined,
      status: job.status as JobStatus,
      workType: job.workType as WorkType,
      employmentType: job.employmentType as EmploymentType,
      jobSource: job.jobSource as JobSourceType,
      urlJobSource: job.urlJobSource || undefined,
    }));

    const count: number = await prisma.job.count({ where: whereClause });
    const totalPages = Math.ceil(count / limit);

    return { jobs, count, page, totalPages };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);

    const rawJob = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
        requirements: values.requirements || [],
        benefits: values.benefits || [],
        urlJobSource: values.urlJobSource || null,
      },
      select: {
        id: true,
        clerkId: true,
        createdAt: true,
        updatedAt: true,
        position: true,
        company: true,
        location: true,
        salary: true,
        salaryAsked: true,
        salaryRange: true,
        salaryOffered: true,
        status: true,
        workType: true,
        employmentType: true,
        description: true,
        experienceRequired: true,
        priority: true,
        requirements: true,
        benefits: true,
        dateApplied: true,
        sentFollowupToRecruiter: true,
        jobSource: true,
        urlJobSource: true,
      },
    });

    return {
      ...rawJob,
      salary: rawJob.salary || undefined,
      salaryAsked: rawJob.salaryAsked || undefined,
      salaryRange: rawJob.salaryRange || undefined,
      salaryOffered: rawJob.salaryOffered || undefined,
      description: rawJob.description || undefined,
      experienceRequired: rawJob.experienceRequired || undefined,
      priority: rawJob.priority as PriorityType,
      requirements: rawJob.requirements || undefined,
      benefits: rawJob.benefits || undefined,
      dateApplied: rawJob.dateApplied || undefined,
      status: rawJob.status as JobStatus,
      workType: rawJob.workType as WorkType,
      employmentType: rawJob.employmentType as EmploymentType,
      jobSource: rawJob.jobSource as JobSourceType,
      urlJobSource: rawJob.urlJobSource || undefined,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    const rawJob = await prisma.job.delete({
      where: { id, clerkId: userId },
      select: {
        id: true,
        clerkId: true,
        createdAt: true,
        updatedAt: true,
        position: true,
        company: true,
        location: true,
        salary: true,
        salaryAsked: true,
        salaryRange: true,
        salaryOffered: true,
        status: true,
        workType: true,
        employmentType: true,
        description: true,
        experienceRequired: true,
        priority: true,
        requirements: true,
        benefits: true,
        dateApplied: true,
        sentFollowupToRecruiter: true,
        jobSource: true,
        urlJobSource: true,
      },
    });

    return {
      ...rawJob,
      salary: rawJob.salary || undefined,
      salaryAsked: rawJob.salaryAsked || undefined,
      salaryRange: rawJob.salaryRange || undefined,
      salaryOffered: rawJob.salaryOffered || undefined,
      description: rawJob.description || undefined,
      experienceRequired: rawJob.experienceRequired || undefined,
      priority: rawJob.priority as PriorityType,
      requirements: rawJob.requirements || undefined,
      benefits: rawJob.benefits || undefined,
      dateApplied: rawJob.dateApplied || undefined,
      status: rawJob.status as JobStatus,
      workType: rawJob.workType as WorkType,
      employmentType: rawJob.employmentType as EmploymentType,
      jobSource: rawJob.jobSource as JobSourceType,
      urlJobSource: rawJob.urlJobSource || undefined,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    const rawJob = await prisma.job.findUnique({
      where: { id, clerkId: userId },
      select: {
        id: true,
        clerkId: true,
        createdAt: true,
        updatedAt: true,
        position: true,
        company: true,
        location: true,
        salary: true,
        salaryAsked: true,
        salaryRange: true,
        salaryOffered: true,
        status: true,
        workType: true,
        employmentType: true,
        description: true,
        experienceRequired: true,
        priority: true,
        requirements: true,
        benefits: true,
        dateApplied: true,
        sentFollowupToRecruiter: true,
        jobSource: true,
        urlJobSource: true,
      },
    });

    if (!rawJob) {
      redirect("/jobs");
      return null;
    }

    return {
      ...rawJob,
      salary: rawJob.salary || undefined,
      salaryAsked: rawJob.salaryAsked || undefined,
      salaryRange: rawJob.salaryRange || undefined,
      salaryOffered: rawJob.salaryOffered || undefined,
      description: rawJob.description || undefined,
      experienceRequired: rawJob.experienceRequired || undefined,
      priority: rawJob.priority as PriorityType,
      requirements: rawJob.requirements || undefined,
      benefits: rawJob.benefits || undefined,
      dateApplied: rawJob.dateApplied || undefined,
      status: rawJob.status as JobStatus,
      workType: rawJob.workType as WorkType,
      employmentType: rawJob.employmentType as EmploymentType,
      jobSource: rawJob.jobSource as JobSourceType,
      urlJobSource: rawJob.urlJobSource || undefined,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    const rawJob = await prisma.job.update({
      where: { id, clerkId: userId },
      data: {
        ...values,
        requirements: values.requirements || [],
        benefits: values.benefits || [],
        workType: values.workType,
        employmentType: values.employmentType,
        status: values.status,
        priority: values.priority,
        dateApplied: values.dateApplied,
        urlJobSource: values.urlJobSource || null,
      },
      select: {
        id: true,
        clerkId: true,
        createdAt: true,
        updatedAt: true,
        position: true,
        company: true,
        location: true,
        salary: true,
        salaryAsked: true,
        salaryRange: true,
        salaryOffered: true,
        status: true,
        workType: true,
        employmentType: true,
        description: true,
        experienceRequired: true,
        priority: true,
        requirements: true,
        benefits: true,
        dateApplied: true,
        sentFollowupToRecruiter: true,
        jobSource: true,
        urlJobSource: true,
      },
    });

    return {
      ...rawJob,
      salary: rawJob.salary || undefined,
      salaryAsked: rawJob.salaryAsked || undefined,
      salaryRange: rawJob.salaryRange || undefined,
      salaryOffered: rawJob.salaryOffered || undefined,
      description: rawJob.description || undefined,
      experienceRequired: rawJob.experienceRequired || undefined,
      priority: rawJob.priority as PriorityType,
      requirements: rawJob.requirements || undefined,
      benefits: rawJob.benefits || undefined,
      dateApplied: rawJob.dateApplied || undefined,
      status: rawJob.status as JobStatus,
      workType: rawJob.workType as WorkType,
      employmentType: rawJob.employmentType as EmploymentType,
      jobSource: rawJob.jobSource as JobSourceType,
      urlJobSource: rawJob.urlJobSource || undefined,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStatsAction(): Promise<{
  Pending: number;
  Interview: number;
  Declined: number;
  Rejected: number;
  DiscussingOffer: number;
  Accepted: number;
}> {
  const userId = authenticateAndRedirect();

  try {
    const stats = await prisma.job.groupBy({
      by: ["status"],
      _count: { status: true },
      where: { clerkId: userId },
    });

    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    return {
      Pending: statsObject.Pending || 0,
      Interview: statsObject.Interview || 0,
      Declined: statsObject.Declined || 0,
      Rejected: statsObject.Rejected || 0,
      DiscussingOffer: statsObject.DiscussingOffer || 0,
      Accepted: statsObject.Accepted || 0,
    };
  } catch (error) {
    console.error(error);
    redirect("/jobs");
  }
}

export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = authenticateAndRedirect();
  const sixMonthsAgo = dayjs().subtract(6, "month").toDate();

  try {
    const jobs = await prisma.job.findMany({
      where: { clerkId: userId, createdAt: { gte: sixMonthsAgo } },
      orderBy: { createdAt: "asc" },
    });

    const applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format("MMM YY");
      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    console.error(error);
    redirect("/jobs");
  }
}
