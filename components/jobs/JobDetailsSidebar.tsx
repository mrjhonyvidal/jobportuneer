import { Briefcase, DollarSign, MapPin, CheckCircle } from "lucide-react";
import RightSidebar from "@/components/theme/RightSidebar";
import { JobType } from "@/types/types";
import { Button } from "../ui/button";
import Link from "next/link";

interface JobDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobType | null;
  showDetailsButton?: boolean; // New property
}

function JobDetailsSidebar({
  isOpen,
  onClose,
  job,
  showDetailsButton = false, // Default to false
}: JobDetailsSidebarProps) {
  if (!job) return null;

  const jobDetailsSections = [
    {
      title: "Position",
      icon: <Briefcase className="w-5 h-5 text-primary" />,
      content: job.position || "Not specified",
    },
    {
      title: "Company",
      icon: <CheckCircle className="w-5 h-5 text-primary" />,
      content: job.company || "Not specified",
    },
    {
      title: "Location",
      icon: <MapPin className="w-5 h-5 text-primary" />,
      content: job.location || "Not specified",
    },
    {
      title: "Salary Range",
      icon: <DollarSign className="w-5 h-5 text-primary" />,
      content: job.salaryRange || "Not specified",
    },
  ];

  return (
    <RightSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Job Details"
      sections={jobDetailsSections}
      footer={
        showDetailsButton && (
          <Link href={`/jobs/${job.id}`}>
            <Button className="w-full font-bold text-lg">Go to Details</Button>
          </Link>
        )
      } // Pass footer content conditionally
    />
  );
}

export default JobDetailsSidebar;
