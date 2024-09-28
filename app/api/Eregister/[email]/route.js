import connectMongoDB from "@/libs/mongodb";
import Employer from "@/models/employer";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export async function PUT(request, { params }) {
  // const { email } = params;
  const email = decodeURIComponent(params.email);
  
  const {
    newName: name,
    newCompanyName: companyName,
    newCompanyDetails: companyDetails,
    newAddress: address,
    newPhoneNumber: phoneNumber,
    newPassword,
  } = await request.json();

  await connectMongoDB();

  // Find the employer by email
  const employer = await Employer.findOne({ email });

  // If the employer is not found, return a 404 response
  if (!employer) {
    return NextResponse.json({ message: "Employer not found" }, { status: 404 });
  }

  // Prepare the update data
  const updateData = {
    name,
    companyName,
    companyDetails,
    address,
    phoneNumber,
  };

  // Hash and update password if provided
  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateData.password = hashedPassword;
  }

  // Update the employer profile by email
  await Employer.findOneAndUpdate({ email }, updateData);

  return NextResponse.json({ message: "Profile Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const email = decodeURIComponent(params.email);


  await connectMongoDB();

  // Find the employer by email
  const employer = await Employer.findOne({ email });

  if (!employer) {
    return NextResponse.json({ message: "Employer not found" }, { status: 404 });
  }

  // Return employer details
  return NextResponse.json({ employer }, { status: 200 });
}

export async function DELETE(request, { params }) {
  const email = decodeURIComponent(params.email);


  await connectMongoDB();

  // Find and delete the employer by email
  const employer = await Employer.findOneAndDelete({ email });

  if (!employer) {
    return NextResponse.json({ message: "Employer not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Profile deleted successfully" }, { status: 200 });
}
