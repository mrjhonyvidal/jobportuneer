import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { InterviewStageType } from "@/types/types";

interface InterviewDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  event: InterviewStageType;
}

function InterviewDetailsSidebar({
  isOpen,
  onClose,
  event,
}: InterviewDetailsSidebarProps) {
  if (!event) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-96 bg-muted fixed right-0 top-0 z-50 shadow-lg"
      >
        <SheetHeader className="flex justify-between items-center p-4 border-b">
          <SheetTitle className="text-lg font-semibold">
            {event.stageName}
          </SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-4">
          <div>
            <strong>Description:</strong> {event.description || "N/A"}
          </div>
          <div>
            <strong>Status:</strong> {event.status}
          </div>
          <div>
            <strong>Scheduled Date:</strong>{" "}
            {event.scheduledDate?.toDateString()}
          </div>
          <div>
            <strong>Duration:</strong> {event.durationMinutes} minutes
          </div>
          <div>
            <strong>Notes:</strong> {event.interviewNotes || "N/A"}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default InterviewDetailsSidebar;
