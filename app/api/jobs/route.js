import connectMongoDB from "@/libs/mongodb";
import JobPost from "@/models/job";
import { NextResponse } from "next/server";
import {getSession} from "next-auth/react";
import User from "@/models/employer";
import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";


export async function POST(request) {

  
  
  const {
    companyName,
    jobTitle,
    jobDescription,
    skillsRequired,
    salaryPerMonth,
    workDuration,
    experienceLevel,
    deadline,
  } = await request.json();

  await connectMongoDB();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Token:', token);
  const session = await getSession({ req: request });
  console.log('Session:', session);
 
  
  if(!session){
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }

    await JobPost.create({
      companyName,
      jobTitle,
      jobDescription,
      skillsRequired,
      salaryPerMonth,
      workDuration,
      experienceLevel,
      deadline,
      postedBy: session.user.id
    });

    return NextResponse.json({ message: "Job Created" }, { status: 201 });
  } 

export async function GET(){
 await connectMongoDB();
 const jobs = await JobPost.find();
 return NextResponse.json({jobs})
}

export async function DELETE(request){
 const id =request.nextUrl.searchParams.get('id');
 await connectMongoDB();
 await JobPost.findByIdAndDelete(id);
 return NextResponse.json({message: "Job Deleted"}, {status: 200})
}