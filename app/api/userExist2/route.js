import connectMongoDB from "@/libs/mongodb";
import Freelancer from "@/models/freelancer"; // Assuming you have a Freelancer model
import { NextResponse } from "next/server";

export async function POST(request){
  try{
    await connectMongoDB();
    const {email} = await request.json();
    const user = await Freelancer.findOne({ email }).select('_id'); // Querying the Freelancer model
    console.log("user", user);
    return NextResponse.json({ user });

  } catch(error) {
    console.log("Error checking freelancer existence", error);
    return NextResponse.json({ message: "Error occurred while checking freelancer existence" }, { status: 500 });
  }
}
