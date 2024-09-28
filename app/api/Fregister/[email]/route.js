import connectMongoDB from "@/libs/mongodb";
import Freelancer from "@/models/freelancer";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request, { params }) {
  const email = decodeURIComponent(params.email);

  const {
    newName: name,
    newWorkType: workType,
    newSkills: skills,
    newExperienceLevel: experienceLevel,
    newProfessionalRole: professionalRole,
    newAddress: address,
    newPhoneNumber: phoneNumber,
    newPassword,
  } = await request.json();

  await connectMongoDB();

  // Find the freelancer by email
  const freelancer = await Freelancer.findOne({ email });

  // If the freelancer is not found, return a 404 response
  if (!freelancer) {
    return NextResponse.json({ message: "Freelancer not found" }, { status: 404 });
  }

  // Prepare the update data
  const updateData = {
    name,
    workType,
    skills,
    experienceLevel,
    professionalRole,
    address,
    phoneNumber,
  };

  // Hash and update password if provided
  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateData.password = hashedPassword;
  }

  // Update the freelancer profile by email
  await Freelancer.findOneAndUpdate({ email }, updateData);
  
  return NextResponse.json({ message: "Profile Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const email = decodeURIComponent(params.email);

  await connectMongoDB();

  // Find the freelancer by email
  const freelancer = await Freelancer.findOne({ email });

  if (!freelancer) {
    return NextResponse.json({ message: "Freelancer not found" }, { status: 404 });
  }

  // Return freelancer details
  return NextResponse.json({ freelancer }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const email = decodeURIComponent(params.email);

  await connectMongoDB();

  // Find and delete the freelancer by email
  const freelancer = await Freelancer.findOneAndDelete({ email });

  if (!freelancer) {
    return NextResponse.json({ message: "Freelancer not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Profile deleted successfully" }, { status: 200 });
}
