"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InterviewStep {
  title: string;
  description: string;
  completed: boolean;
}

interface InterviewListProps {
  steps: InterviewStep[];
}

export default function InterviewList({ steps }: InterviewListProps) {
  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;

  return (
    <div className="space-y-6 mt-6 mb-6">
      {/* Progress Bar */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Interview Progress</h3>
        <Progress value={(completedSteps / totalSteps) * 100} />
        <p className="text-sm mt-2">
          {completedSteps}/{totalSteps} steps completed
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={index} className="border">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{step.title}</CardTitle>
              <span
                className={`text-sm font-medium ${
                  step.completed ? "text-green-600" : ""
                }`}
              >
                {step.completed ? "Completed" : "Pending"}
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
