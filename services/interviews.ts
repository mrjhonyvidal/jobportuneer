"use server";

import prisma from "../utils/db";
import { z } from "zod";
import authenticateAndRedirect from "./auth";
import { InterviewStageType } from "@/types/types";
import { InterviewStageStatus } from "@/types/enums";
import {
  createInterviewStepSchema,
  CreateInterviewStepType,
} from "@/utils/validators";

export async function createInterviewStepAction(
  jobId: string,
  values: CreateInterviewStepType
): Promise<InterviewStageType | null> {
  const userId = authenticateAndRedirect();

  try {
    // Validate the input
    createInterviewStepSchema.parse(values);

    // Ensure the status matches the expected enum type
    const status = values.status as InterviewStageStatus;

    // Create the interview step in the database
    const interviewStep = await prisma.interviewStage.create({
      data: {
        stageName: values.stageName,
        description: values.description || null,
        scheduledDate: values.scheduledDate || null,
        durationMinutes: values.durationMinutes || null,
        status: status,
        jobId,
        clerkId: userId,
      },
    });

    // Return the created step
    return {
      ...interviewStep,
      status: status as InterviewStageStatus,
      tips: null, // Include optional relations if needed
    };
  } catch (error) {
    console.error("Error creating interview step:", error);
    return null;
  }
}

// Fetch interviews for a specific job
export async function fetchJobInterviews(
  jobId: string
): Promise<InterviewStageType[]> {
  const userId = authenticateAndRedirect();

  try {
    const interviews = await prisma.interviewStage.findMany({
      where: { jobId, clerkId: userId },
      orderBy: { createdAt: "asc" },
    });

    return interviews.map((interview) => ({
      ...interview,
      status: interview.status as InterviewStageStatus,
      tips: [],
    }));
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return [];
  }
}

// Delete an interview step
export async function deleteInterviewStepAction(id: string): Promise<void> {
  const userId = authenticateAndRedirect();

  try {
    await prisma.interviewStage.delete({
      where: { id, clerkId: userId },
    });
  } catch (error) {
    console.error("Error deleting interview step:", error);
  }
}

export async function updateInterviewStepAction(
  id: string,
  values: CreateInterviewStepType
): Promise<InterviewStageType | null> {
  const userId = authenticateAndRedirect();

  try {
    const updatedInterview = await prisma.interviewStage.update({
      where: { id, clerkId: userId },
      data: values,
    });

    return {
      ...updatedInterview,
      status: updatedInterview.status as InterviewStageStatus,
      tips: [], // Placeholder for tips logic
    };
  } catch (error) {
    console.error("Error updating interview step:", error);
    return null;
  }
}

// Fetch a single interview
export async function fetchSingleInterview(
  id: string
): Promise<InterviewStageType | null> {
  const userId = authenticateAndRedirect();

  try {
    const interview = await prisma.interviewStage.findUnique({
      where: { id, clerkId: userId },
    });

    if (interview) {
      return {
        ...interview,
        status: interview.status as InterviewStageStatus,
        tips: [], // Placeholder for tips logic
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching interview:", error);
    return null;
  }
}
