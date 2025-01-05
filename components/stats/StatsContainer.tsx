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
    <section className="p-6 bg-muted rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Job Application Stats
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
}

export default StatsContainer;
