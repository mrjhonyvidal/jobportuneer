import { Briefcase, DollarSign, MapPin, CheckCircle, List } from "lucide-react";
import RightSidebar from "@/components/RightSidebar";
import { JobType } from "@/utils/types";

interface JobDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobType | null;
}

function JobDetailsSidebar({ isOpen, onClose, job }: JobDetailsSidebarProps) {
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
      title: "Salary",
      icon: <DollarSign className="w-5 h-5 text-primary" />,
      content: job.salary || "Not specified",
    },
    // ...(job.requirements
    //   ? [
    //       {
    //         title: "Requirements",
    //         icon: <List className="w-5 h-5 text-primary" />,
    //         content: (
    //           <ul className="list-disc list-inside">
    //             {job.requirements.map((req, index) => (
    //               <li key={index}>{req}</li>
    //             ))}
    //           </ul>
    //         ),
    //       },
    //     ]
    //   : []),
    // ...(job.benefits
    //   ? [
    //       {
    //         title: "Benefits",
    //         icon: <CheckCircle className="w-5 h-5 text-primary" />,
    //         content: (
    //           <ul className="list-disc list-inside">
    //             {job.benefits.map((benefit, index) => (
    //               <li key={index}>{benefit}</li>
    //             ))}
    //           </ul>
    //         ),
    //       },
    //     ]
    //   : []),
  ];

  return (
    <RightSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Job Details"
      sections={jobDetailsSections}
    />
  );
}

export default JobDetailsSidebar;
