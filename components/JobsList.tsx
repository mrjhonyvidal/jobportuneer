"use client";
import { useState } from "react";
import JobCard from "./JobCard";
import { useSearchParams } from "next/navigation";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import ButtonContainer from "./ButtonContainer";
import ComplexButtonContainer from "./ComplexButtonContainer";
import { JobType } from "@/utils/types";
import JobDetailsSidebar from "./JobDetailsSidebar";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, PlusCircle } from "lucide-react";
import Image from "next/image";
import Collaborators from "../assets/collaborators.svg";
import SearchForm from "./SearchForm";

function JobsList() {
  const searchParams = useSearchParams();

  // State for RightSidebar
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  const pageNumber = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search ?? "", jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });

  const jobs = data?.jobs || [];
  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending) return <h2 className="text-xl">Please Wait...</h2>;

  if (jobs.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <Link href="/add-job">
          <Image
            src={Collaborators}
            alt="Collaboration illustration"
            className="w-80 cursor-pointer mx-auto mb-8"
          />
        </Link>
        <h2 className="text-2xl font-bold mb-4">No Jobs Yet</h2>
        <p className="mb-6">
          Start adding jobs to keep track of your applications and stay
          organized.
        </p>
        <Button asChild>
          <Link href="/add-job">
            <span className="flex items-center space-x-2 font-bold text-lg">
              <ArrowRight className="w-5 h-5" />
              <span>Add New Job</span>
            </span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 mb-8 rounded-lg shadow-lg">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Manage Your Jobs and Interviews{" "}
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Use this space to add and organize your job applications.
          </p>
          <Button
            variant="secondary"
            className="px-6 py-3 text-lg font-bold focus:ring-4 rounded-lg shadow-md"
            asChild
          >
            <Link href="/add-job">
              <span className="flex items-center text-bold space-x-2 font-bold text-lg">
                <PlusCircle className="w-6 h-6" />
                <span>Add New Job</span>
              </span>
            </Link>
          </Button>
        </div>
      </div>

      <SearchForm />

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold capitalize ">
          {count === 1 ? "Latest Opportunity" : "Saved Opportunities"} ({count})
        </h2>
        {totalPages < 2 ? null : (
          <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => {
              setSelectedJob(job);
              setSidebarOpen(true);
            }}
          />
        ))}
      </div>

      {selectedJob && (
        <JobDetailsSidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          job={selectedJob}
          showDetailsButton={true}
        />
      )}
    </>
  );
}

export default JobsList;
