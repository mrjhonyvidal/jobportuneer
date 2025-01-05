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
