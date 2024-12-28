"use client";
import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "@/utils/actions";
import StatsCard from "./StatsCard";

function StatsContainer() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCard
        title="Pending"
        value={data?.Pending || 0}
        explanation="Jobs that are awaiting review or further action."
      />
      <StatsCard
        title="Interviews"
        value={data?.Interview || 0}
        explanation="Jobs for which interviews have been scheduled or completed."
      />
      <StatsCard
        title="Declined"
        value={data?.Declined || 0}
        explanation="Jobs you have decided not to pursue."
      />
      <StatsCard
        title="Rejected"
        value={data?.Rejected || 0}
        explanation="Jobs where your application was not accepted."
      />
      <StatsCard
        title="Discussing Offer"
        value={data?.DiscussingOffer || 0}
        explanation="Jobs where you are negotiating or discussing an offer."
      />
      <StatsCard
        title="Accepted"
        value={data?.Accepted || 0}
        explanation="Jobs where you have accepted the offer and finalized details."
      />
    </div>
  );
}

export default StatsContainer;
