import connectMongoDB from "@/libs/mongodb";
import ApplyJob from "@/models/applyjob";
import JobPost from "@/models/job";
import Employer from "@/models/employer";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    name,
    email,
    address,
    resume,
    coverLetter,
    jobPostId, // Ensure this is included in your request
    appliedBy, // Ensure this is included in your request
  } = await request.json();

  await connectMongoDB();

  // Create a new application
  await ApplyJob.create({
    name,
    email,
    address,
    resume,
    coverLetter,
    jobPostId,
    appliedBy,
  });

  return NextResponse.json({ message: "Job Applied" }, { status: 201 });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const employerId = searchParams.get('employerId');
  const appliedBy = searchParams.get('appliedBy');

  await connectMongoDB();

  let applications;

  if (employerId) {
    // Fetch applications for all jobs posted by this employer
    const jobs = await JobPost.find({ postedBy: employerId });
    const jobIds = jobs.map(job => job._id);

    applications = await ApplyJob.find({ jobPostId: { $in: jobIds } });
  } else if (appliedBy) {
    // Fetch applications submitted by this freelancer
    applications = await ApplyJob.find({ appliedBy });
  } else {
    // Handle case where neither is provided
    return NextResponse.json({ message: "Missing required parameter" }, { status: 400 });
  }

  return NextResponse.json({ applications }, { status: 200 });
}
