import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Employer from "@/models/employer";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // Destructure the new fields from the request body
    const { name, email, password, companyName, companyDetails, address, phoneNumber } = await request.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to MongoDB
    await connectMongoDB();

    const existingEmployer = await Employer.findOne({ email });

    if (existingEmployer) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // Create a new employer document with the additional fields
    await Employer.create({
      name,
      email,
      password: hashedPassword,
      companyName,
      companyDetails,
      address,
      phoneNumber
    });

    // Return success response
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error registering employer:", error);
    return NextResponse.json({ message: "Error occurred while registering employer" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email'); // Get email from query params

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDB();


    // Find the employer based on the email
    const employer = await Employer.findOne({ email });

    if (!employer) {
      return NextResponse.json({ message: "Employer not found" }, { status: 404 });
    }

    

    // Return employer profile including the new fields
    return NextResponse.json({employer
      // : {
      //   id : employer._id,
      //   name: employer.name,
      //   email: employer.email,
      //   companyName: employer.companyName,
      //   companyDetails: employer.companyDetails,
      //   address: employer.address,
      //   phoneNumber: employer.phoneNumber
      // }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching employer profile:", error);
    return NextResponse.json({ message: "Error occurred while fetching employer profile" }, { status: 500 });
  }
}

export async function DELETE(request) {
  await connectMongoDB();

  // Get the email from the query parameters
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  // Find and delete the employer by email
  const deletedEmployer = await Employer.findOneAndDelete({ email });

  if (!deletedEmployer) {
    return NextResponse.json({ message: "Employer not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Profile deleted successfully" }, { status: 200 });
}

  