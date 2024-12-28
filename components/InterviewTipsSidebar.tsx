import { CheckCircle, List } from "lucide-react";
import RightSidebar from "@/components/RightSidebar";

interface InterviewTipsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function InterviewTipsSidebar({ isOpen, onClose }: InterviewTipsSidebarProps) {
  const interviewTipsSections = [
    {
      title: "Resume Review",
      icon: <CheckCircle className="w-5 h-5 text-primary" />,
      content: "Ensure your resume is up to date with relevant skills.",
    },
    {
      title: "Technical Assessment",
      icon: <List className="w-5 h-5 text-primary" />,
      content:
        "Practice coding challenges on platforms like LeetCode or HackerRank.",
    },
    {
      title: "Final Interview",
      icon: <CheckCircle className="w-5 h-5 text-primary" />,
      content:
        "Prepare examples of past projects to discuss during the interview.",
    },
  ];

  return (
    <RightSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Interview Tips"
      sections={interviewTipsSections}
    />
  );
}

export default InterviewTipsSidebar;
