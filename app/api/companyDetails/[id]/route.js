import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Employer from "@/models/employer";
 
export async function GET(request, { params }) {
  try {
    // Extract the employer ID from params
    const { id } = params;
    console.log("Employer ID:", id);
 
    // Connect to MongoDB
    await connectMongoDB();
 
    // Find the employer based on the ID
    const employer = await Employer.findOne({ _id: id });
    console.log("Employer:", employer);
 
    if (!employer) {
      return NextResponse.json(
        { message: "Employer not found" },
        { status: 404 }
      );
    }
 
    return NextResponse.json({ employer }, { status: 200 });
  } catch (error) {
    console.error("Error fetching employer profile:", error);
    return NextResponse.json(
      { message: "Error occurred while fetching employer profile" },
      { status: 500 }
    );
  }
}
 