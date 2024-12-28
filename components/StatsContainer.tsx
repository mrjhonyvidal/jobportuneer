"use client";
import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "@/utils/actions";
import StatsCard from "./StatsCard";
import UserProfilePage from "./UserProfile";

function StatsContainer() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCard title="pending jobs" value={data?.Pending || 0} />
      <StatsCard title="interviews set" value={data?.Interview || 0} />
      <StatsCard title="jobs declined" value={data?.Declined || 0} />
    </div>
  );
}
export default StatsContainer;
