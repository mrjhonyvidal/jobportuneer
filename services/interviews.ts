"use server";

import authenticateAndRedirect from "./auth";
import prisma from "../utils/db";

export async function getAllInterviewStages() {
  const userId = authenticateAndRedirect();

  try {
    const interviewStages = await prisma.interviewStage.findMany({
      where: { clerkId: userId },
      orderBy: { scheduledDate: "asc" },
    });

    return interviewStages.map((interview) => ({
      id: interview.id,
      title: interview.stageName,
      description: interview.description || "",
      startDate: interview.scheduledDate,
      endDate: interview.scheduledDate
        ? new Date(
            new Date(interview.scheduledDate).getTime() +
              (interview.durationMinutes || 60) * 60 * 1000
          )
        : null,
      variant: interview.status === "Pending" ? "warning" : "success",
    }));
  } catch (error) {
    console.error("Error fetching interview stages:", error);
    return [];
  }
}
