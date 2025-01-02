import JobsList from "@/components/jobs/JobsList";
import { getAllJobsAction } from "@/services/jobs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function JobsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", 1],
    queryFn: () => getAllJobsAction({}),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobsList />
    </HydrationBoundary>
  );
}

export default JobsPage;
