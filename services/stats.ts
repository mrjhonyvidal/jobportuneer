"use server";

import { JobStatus } from "@/types/enums";
import authenticateAndRedirect from "./auth";
import prisma from "../utils/db";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

// # Handles stats Prisma logic
export async function getStatsAction(): Promise<Record<JobStatus, number>> {
  const userId = authenticateAndRedirect();

  try {
    const stats = await prisma.job.groupBy({
      by: ["status"],
      _count: { status: true },
      where: { clerkId: userId },
    });

    // Normalize keys to match JobStatus exactly
    const normalizedStatuses = Object.values(JobStatus).reduce(
      (acc, status) => {
        acc[status] = 0; // Initialize with default value of 0
        return acc;
      },
      {} as Record<JobStatus, number>
    );

    stats.forEach((stat) => {
      if (normalizedStatuses[stat.status as JobStatus] !== undefined) {
        normalizedStatuses[stat.status as JobStatus] = stat._count.status;
      }
    });

    return normalizedStatuses;
  } catch (error) {
    console.error(error);
    //redirect("/jobs");
    return {} as Record<JobStatus, number>; // Fallback empty object
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
