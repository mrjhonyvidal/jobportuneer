"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { submitFeedbackAction } from "@/services/feedback";

type FeedbackFormData = {
  feedback: string;
  allowShareMyFeedbackPublic: boolean;
};

export default function FeedbackForm() {
  const [rating, setRating] = useState<number>(0);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    defaultValues: { feedback: "", allowShareMyFeedbackPublic: true },
  });
  const { toast } = useToast();
  const feedbackLength = watch("feedback")?.length || 0;

  const onSubmit = async (data: FeedbackFormData) => {
    if (rating === 0) {
      setError("feedback", {
        message: "Please choose a rating to submit your feedback.",
      });
      toast({
        description: "Please choose a rating to submit your feedback.",
      });
      return;
    }

    try {
      const result = await submitFeedbackAction({
        feedback: data.feedback,
        rating,
        allowShareMyFeedbackPublic: data.allowShareMyFeedbackPublic,
      });

      if (result.success) {
        toast({
          description: "Thank you for your feedback! 🙌",
        });
        reset();
        setRating(0);
      } else {
        toast({
          description:
            result.message || "Failed to submit feedback. Try again.",
        });
      }
    } catch (error) {
      toast({
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center space-y-4 mt-6 bg-white dark:bg-neutral-800 dark:text-neutral-200 rounded-lg p-6 shadow-lg transition-colors"
    >
      {/* Star Rating */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`w-8 h-8 cursor-pointer transition ${
              rating > index
                ? "text-yellow-500"
                : "text-gray-300 dark:text-gray-500"
            } hover:text-yellow-500`}
            onClick={() => setRating(index + 1)}
          />
        ))}
      </div>
      {rating === 0 && (
        <p className="text-red-500 text-sm dark:text-red-400">
          Please select a rating.
        </p>
      )}

      {/* Feedback Text Area */}
      <textarea
        {...register("feedback", {
          required: "Feedback is required.",
          minLength: {
            value: 10,
            message: "Feedback must be at least 10 characters.",
          },
          maxLength: {
            value: 200,
            message: "Feedback must be at most 200 characters.",
          },
        })}
        placeholder="Share your feedback (10-200 characters)..."
        className={`w-full h-32 p-4 border rounded-lg focus:ring-2 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700 ${
          errors.feedback
            ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400"
            : "focus:ring-yellow-500 dark:focus:ring-yellow-500"
        }`}
      />
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {feedbackLength}/200 characters used (minimum 10 required).
      </div>
      {errors.feedback && (
        <p className="text-red-500 text-sm dark:text-red-400">
          {errors.feedback.message}
        </p>
      )}

      {/* Allow Public Sharing */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="allowShareMyFeedbackPublic"
          {...register("allowShareMyFeedbackPublic")}
          className="w-5 h-5 text-yellow-500 border-gray-300 bg-white dark:bg-neutral-900 rounded focus:ring-yellow-500 dark:focus:ring-yellow-500"
        />
        <label
          htmlFor="allowShareMyFeedbackPublic"
          className="text-sm text-gray-600 dark:text-gray-300"
        >
          Make my feedback public.
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-4 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 transition-colors"
      >
        Submit Feedback
      </button>
    </form>
  );
}
