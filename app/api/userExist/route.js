import connectMongoDB from "@/libs/mongodb";
import Employer from "@/models/employer";
import { NextResponse } from "next/server";


export async function POST(request){
  try{
    await connectMongoDB();
    const {email} = await request.json();
    const user=await Employer.findOne({email}).select('_id');
    console.log("user", user);
    return NextResponse.json({user});



  }catch(error){
    console.log("Error checking user existence", error);  
    
  }
}