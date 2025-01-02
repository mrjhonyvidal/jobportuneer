"use server";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Handles Clerkjs Auth logic
function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
}

export default authenticateAndRedirect;
