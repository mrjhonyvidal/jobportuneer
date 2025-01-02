"use server";

import { feedbackSchema, FeedbackType } from "@/utils/validators";
import prisma from "../utils/db";
import authenticateAndRedirect from "./auth";

export async function submitFeedbackAction(
  data: FeedbackType & { allowShareMyFeedbackPublic?: boolean }
): Promise<{ success: boolean; message?: string; data?: any }> {
  try {
    const userId = authenticateAndRedirect();

    // Check existing feedback count
    const existingFeedbacks = await prisma.feedback.count({
      where: { clerkId: userId },
    });

    if (existingFeedbacks >= 3) {
      return {
        success: false,
        message: "You have already submitted the maximum of 3 feedbacks.",
      };
    }

    // Validate input with Zod
    const parsedData = feedbackSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        success: false,
        message: "Invalid feedback data. Please check your input.",
      };
    }

    // Save feedback to the database
    const newFeedback = await prisma.feedback.create({
      data: {
        clerkId: userId,
        feedback: parsedData.data.feedback,
        rating: parsedData.data.rating,
        allowShareMyFeedbackPublic: data.allowShareMyFeedbackPublic ?? true,
      },
    });

    return {
      success: true,
      data: newFeedback,
    };
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while submitting feedback.",
    };
  }
}

export async function fetchUserFeedbacks() {
  try {
    const userId = authenticateAndRedirect();
    const feedbacks = await prisma.feedback.findMany({
      where: { clerkId: userId },
      orderBy: { createdAt: "desc" },
      take: 3, // Fetch latest 3 feedbacks
    });
    return feedbacks;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return null;
  }
}
