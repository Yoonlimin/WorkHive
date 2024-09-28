import connectMongoDB from "@/libs/mongodb";
import ApplyJob from "@/models/applyjob";
import JobPost from "@/models/job";
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

  // Make sure you include all required fields
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
  const {searchParams} = new URL(request.url);
  const  employerId  = searchParams.get('employerId');

  await connectMongoDB();

  const jobs = await JobPost.find({ postedBy: employerId });
  const jobIds = jobs.map(job => job._id);

  const applications = await ApplyJob.find({ jobPostId: { $in: jobIds } });

  return NextResponse.json({ applications });
}
