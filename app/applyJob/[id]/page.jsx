"use client";

import ApplicationForm from '../../components/ApplicationForm';
import { useRouter, useParams } from 'next/navigation'; // Import `useParams` to extract the dynamic id

export default function JobDetailsPage() {
  const params = useParams(); // Get dynamic parameters from the route
  const jobPostId = params.id; // Extract `id` from the route params

  // Debugging
  console.log("Received jobPostId from route:", jobPostId);

  return <ApplicationForm jobPostId={jobPostId} />;
}
