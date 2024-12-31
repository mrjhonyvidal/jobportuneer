"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { submitFeedbackAction } from "@/utils/actions";

type FeedbackFormData = {
  feedback: string;
  allowShareMyFeedbackPublic: boolean;
};

export default function FeedbackForm() {
  const [rating, setRating] = useState<number>(0);
  const { register, handleSubmit, reset, setError, watch } =
    useForm<FeedbackFormData>({
      defaultValues: { feedback: "", allowShareMyFeedbackPublic: true },
    });
  const { toast } = useToast();
  const feedbackLength = watch("feedback")?.length || 0;

  const onSubmit = async (data: FeedbackFormData) => {
    if (rating === 0) {
      setError("feedback", {
        message:
          "Please choose a rating to submit your feedback—it makes a big difference!",
      });
      toast({
        description:
          "Please choose a rating to submit your feedback—it makes a big difference!",
      });
      return;
    }

    try {
      const result = await submitFeedbackAction({
        feedback: data.feedback,
        rating: rating,
        allowShareMyFeedbackPublic: data.allowShareMyFeedbackPublic,
      });

      if (result.success) {
        // Show success toast
        toast({
          description:
            "Thank you so much for your feedback! 🙌 It means the world to me and helps make Jobportuneer even better for you.",
        });

        // Reset form and rating
        reset();
        setRating(0);
      } else {
        // Show error toast with a clear message
        toast({
          description:
            result.message || "Failed to submit feedback. Try again.",
        });
      }
    } catch (error) {
      // Handle unexpected errors
      toast({
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-full mt-4"
    >
      {/* Rating Section */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`w-8 h-8 cursor-pointer transition ${
              rating > index ? "text-secondary" : "text-gray-300"
            } hover:text-secondary`}
            onClick={() => setRating(index + 1)}
          />
        ))}
      </div>

      {/* Feedback Text Area */}
      <textarea
        {...register("feedback", {
          required: "Feedback is required.",
          minLength: {
            value: 10,
            message: "Feedback must be at least 10 characters long.",
          },
          maxLength: {
            value: 200,
            message: "Feedback must be at most 200 characters long.",
          },
        })}
        placeholder="Share your feedback (10-200 characters)..."
        className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-primary"
      ></textarea>
      <div className="text-sm mt-1">
        You’ve used {feedbackLength} out of 200 characters (Up to 3 feedback
        entries allowed)
      </div>

      {/* Allow Public Sharing */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="allowShareMyFeedbackPublic"
          {...register("allowShareMyFeedbackPublic")}
          className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-secondary"
        />
        <label htmlFor="allowShareMyFeedbackPublic" className="text-sm">
          Allow my feedback to be shared publicly
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition"
      >
        Submit Feedback
      </button>
    </form>
  );
}
