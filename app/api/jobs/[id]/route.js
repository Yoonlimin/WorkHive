import connectMongoDB from "@/libs/mongodb";
import JobPost from "@/models/job";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function PUT(request, { params }) {
 const { id } = params;
 const session = await getSession({ req: request });

 if (!session) {
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
}
 const {
    newCompanyName: companyName,
   newJobTitle: jobTitle,
   newJobDescription: jobDescription,
   newSkillsRequired: skillsRequired,
   newSalaryPerMonth: salaryPerMonth,
   newWorkDuration: workDuration,
   newExperienceLevel: experienceLevel,
   newDeadline: deadline
 } = await request.json();
 
 await connectMongoDB();

 const job = await JobPost.findById(id);

  if (job.postedBy.toString() !== session.user.id) {
    return NextResponse.json({ message: "Not authorized to edit this job" }, { status: 403 });
  }
 
 await JobPost.findByIdAndUpdate(id, {
    companyName,
   jobTitle,
   jobDescription,
   skillsRequired,
   salaryPerMonth,
   workDuration,
   experienceLevel,
   deadline
 });
 
 return NextResponse.json({ message: "Job Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
 const { id } = params;

 await connectMongoDB();

 const job = await JobPost.findOne({ _id: id });
 
 return NextResponse.json({ job }, { status: 200 });
}

export async function DELETE(req) {
  await connectToDatabase();
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  const decodedToken = verifyToken(token);
 
  if (!decodedToken) {
    return new Response(JSON.stringify({ success: false, error: 'User not authenticated' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
 
  const userId = decodedToken.userId;
  const job = await JobPost.findOneAndDelete({ userId });
  if (!job) {
    return new Response(JSON.stringify({ success: false, error: 'Vehicle not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
 
  return new Response(JSON.stringify({ success: true, message: 'Vehicle deleted successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
