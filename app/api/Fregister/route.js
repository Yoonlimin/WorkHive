import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Freelancer from "@/models/freelancer";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // Destructure the new fields from the request body
    const { 
      name, 
      email, 
      password, 
      workType, 
      skills, 
      experienceLevel, 
      professionalRole, 
      languageProficiency, 
      salaryRate, 
      birthdate, 
      address, 
      phoneNumber 
    } = await request.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to MongoDB
    await connectMongoDB();

    const existingFreelancer = await Freelancer.findOne({ email });

    if (existingFreelancer) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // Create a new freelancer document with the provided fields
    await Freelancer.create({
      name,
      email,
      password: hashedPassword,
      workType,
      skills,
      experienceLevel,
      professionalRole,
      languageProficiency,
      salaryRate,
      birthdate,
      address,
      phoneNumber
    });

    // Return success response
    return NextResponse.json({ message: "Freelancer registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error registering freelancer:", error);
    return NextResponse.json({ message: "Error occurred while registering freelancer" }, { status: 500 });
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

    // Find the freelancer based on the email
    const freelancer = await Freelancer.findOne({ email });

    if (!freelancer) {
      return NextResponse.json({ message: "Freelancer not found" }, { status: 404 });
    }

    // Return freelancer profile including the new fields
    return NextResponse.json({
      freelancer: {
        name: freelancer.name,
        email: freelancer.email,
        workType: freelancer.workType,
        skills: freelancer.skills,
        experienceLevel: freelancer.experienceLevel,
        professionalRole: freelancer.professionalRole,
        languageProficiency: freelancer.languageProficiency,
        salaryRate: freelancer.salaryRate,
        birthdate: freelancer.birthdate,
        address: freelancer.address,
        phoneNumber: freelancer.phoneNumber
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching freelancer profile:", error);
    return NextResponse.json({ message: "Error occurred while fetching freelancer profile" }, { status: 500 });
  }
}
