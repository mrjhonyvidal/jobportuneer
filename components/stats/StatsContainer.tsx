"use client";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "./StatsCard";
import Link from "next/link";
import { getStatsAction } from "@/services/stats";

function StatsContainer() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  const createJobStatusLink = (status: string) =>
    `/jobs?search=&jobStatus=${encodeURIComponent(status)}`;

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <Link href={createJobStatusLink("To Apply")}>
        <StatsCard
          title="To Apply"
          value={data?.["To Apply"] || 0}
          explanation="These are the jobs you’re interested in but haven’t applied to yet. Ready to take the first step?"
        />
      </Link>
      <Link href={createJobStatusLink("Applied")}>
        <StatsCard
          title="Applied"
          value={data?.Applied || 0}
          explanation="These are jobs where you’ve submitted your application. Fingers crossed!"
        />
      </Link>
      <Link href={createJobStatusLink("Screening")}>
        <StatsCard
          title="Screening"
          value={data?.Screening || 0}
          explanation="These jobs are in the review stage by the employer. Let’s hope for good news!"
        />
      </Link>
      <Link href={createJobStatusLink("Interviewing")}>
        <StatsCard
          title="Interviewing"
          value={data?.Interviewing || 0}
          explanation="Jobs where interviews are either scheduled or completed. Stay sharp!"
        />
      </Link>
      <Link href={createJobStatusLink("Offer Extended")}>
        <StatsCard
          title="Offer Extended"
          value={data?.["Offer Extended"] || 0}
          explanation="Congratulations! These are jobs where you’ve received an offer."
        />
      </Link>
      <Link href={createJobStatusLink("Negotiating")}>
        <StatsCard
          title="Negotiating"
          value={data?.Negotiating || 0}
          explanation="You’re in the middle of discussing the details or terms of an offer. Make it count!"
        />
      </Link>
      <Link href={createJobStatusLink("Accepted")}>
        <StatsCard
          title="Accepted"
          value={data?.Accepted || 0}
          explanation="You’ve accepted the offer for these jobs and finalized the details. Exciting times!"
        />
      </Link>
      <Link href={createJobStatusLink("Declined")}>
        <StatsCard
          title="Declined"
          value={data?.Declined || 0}
          explanation="These are the jobs you decided not to pursue further. It’s all about finding the right fit!"
        />
      </Link>
      <Link href={createJobStatusLink("Rejected")}>
        <StatsCard
          title="Rejected"
          value={data?.Rejected || 0}
          explanation="Unfortunately, these jobs didn’t work out. Don’t let it discourage you—keep moving forward!"
        />
      </Link>
      <Link href={createJobStatusLink("On Hold")}>
        <StatsCard
          title="On Hold"
          value={data?.["On Hold"] || 0}
          explanation="These jobs are paused for now. Keep an eye on them for updates."
        />
      </Link>
      <Link href={createJobStatusLink("Withdrawn")}>
        <StatsCard
          title="Withdrawn"
          value={data?.Withdrawn || 0}
          explanation="You’ve chosen to step away from these opportunities. That’s okay—focus on the ones that matter most!"
        />
      </Link>
    </div>
  );
}

export default StatsContainer;
