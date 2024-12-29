import { JobType, JobStatus } from "@/utils/types";
import { MapPin, Briefcase, CalendarDays, RadioTower } from "lucide-react";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import JobInfo from "./JobInfo";
import DeleteJobButton from "./DeleteJobButton";

function JobCard({ job, onClick }: { job: JobType; onClick: () => void }) {
  const date = job.dateApplied
    ? new Date(job.dateApplied).toLocaleDateString()
    : new Date(job.updatedAt).toLocaleDateString();
  const label = job.dateApplied ? "Date Applied" : "Last Update";

  const badgeClassName =
    job.status === JobStatus.Pending ? "bg-secondary text-white" : "";

  return (
    <Card className="bg-muted cursor-pointer">
      <CardHeader onClick={onClick}>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4" onClick={onClick}>
        <JobInfo icon={<Briefcase />} text={job.employmentType} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={`${label}: ${date}`} />
        <Badge className={`w-32 justify-center ${badgeClassName}`}>
          <JobInfo
            icon={<RadioTower className="w-4 h-4" />}
            text={job.status}
          />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
        <DeleteJobButton id={job.id} />
      </CardFooter>
    </Card>
  );
}

export default JobCard;
