"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CalendarIcon, CheckCircle, AlertCircle } from "lucide-react";
import { InterviewStageType } from "@/types/types";

type InterviewCardProps = {
  interview: InterviewStageType;
  onClick: () => void; // Open sidebar
  onDelete: () => void;
  onEdit: () => void; // Navigate to edit page
};

export default function InterviewCard({
  interview,
  onClick,
  onDelete,
  onEdit,
}: InterviewCardProps) {
  const statusColor =
    interview.status === "Pending"
      ? "border-yellow-500"
      : interview.status === "Passed"
      ? "border-green-500"
      : "border-gray-300";

  const statusIcon =
    interview.status === "Pending" ? (
      <AlertCircle className="text-yellow-600 w-5 h-5" />
    ) : interview.status === "Passed" ? (
      <CheckCircle className="text-green-600 w-5 h-5" />
    ) : null;

  const trimmedDescription =
    interview.description && interview.description.length > 100
      ? `${interview.description.slice(0, 100)}...`
      : interview.description || "No description provided.";

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this interview?")) {
      onDelete();
    }
  };

  return (
    <Card
      className={`shadow-sm border-l-4 ${statusColor} hover:shadow-md transition-all cursor-pointer relative`}
      onClick={onClick} // Open the sidebar when the card or title is clicked
    >
      <CardHeader className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {statusIcon}
          <CardTitle
            className="text-lg font-medium text-gray-800"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card's onClick
              onClick();
            }}
          >
            {interview.stageName}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 mb-16">
        {" "}
        {/* Adjusted for button spacing */}
        <p className="text-gray-600 text-sm italic">{trimmedDescription}</p>
        {interview.scheduledDate && (
          <p className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {new Date(interview.scheduledDate).toLocaleDateString()}{" "}
            {new Date(interview.scheduledDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
        <p className="text-sm">
          <span className="font-semibold text-gray-800">Status:</span>{" "}
          <span
            className={`font-semibold ${
              interview.status === "Pending"
                ? "text-yellow-600"
                : interview.status === "Passed"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {interview.status}
          </span>
        </p>
      </CardContent>
      <CardFooter className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card's onClick
            onEdit();
          }}
        >
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
