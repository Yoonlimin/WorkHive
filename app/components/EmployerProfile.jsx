"use client";

import {signOut} from 'next-auth/react';
import { useState, useEffect } from "react";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// Fetch employer profile
const getEmployerProfile = async (email) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Eregister?email=${email}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch employer profile");
    }

    const data = await res.json();
    return data.employer;
  } catch (error) {
    console.error("Error loading employer profile:", error);
    return null;
  }
};

export default function EmployerProfile() {
// 
const router = useRouter();
const { data: session } = useSession();
console.log(session);


const [employer, setEmployer] = useState(null);

useEffect(() => {
  if (session?.user?.email) {
    getEmployerProfile(session.user.email).then((data) => {
      setEmployer(data);
    });
  }
}, [session?.user?.email]);

if (!employer) {
  return <p>Loading profile...</p>;
}
  return (
    <div className="p-4 mt-10">
      {/* Header */}
      <div className= "flex items-center justify-between mt-5 mb-10">
        <div>
          <h1 className=" text-3xl font-bold">{employer.name}</h1>
          
        
          <p className="text-lg text-gray-600 mt-2 underline">Company Name</p>
          <p className="text-xl font-bold mb-2 ">{employer.companyName} </p>
        </div>
        
        <button
            className="bg-slate-500 p-2 rounded-full text-white flex items-center gap-3"
            // onClick={() => router.push(`/editProfile/${employer._id}`)}
          >
            <HiPencilAlt size={24} />
          </button>
        
      </div>

      {/* Employer Account Info */}
      <div className="bg-white rounded-lg p-6 shadow mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Account and Password</h2>
            <p className="text-gray-700 font-bold">
            
            </p>
            <p className="text-gray-500">{employer.email}</p>
            <p className="text-gray-500">*******</p>
            
            
            
          </div>
          
        </div>
      </div>

      {/* Company Details */}
      <div className="bg-white rounded-lg p-6 shadow mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Company Details</h2>
            <p>{employer.companyDetails}</p>
            <a  className="text-green-600 underline">
            
            </a>
          </div>
          
        </div>
      </div>

      {/* Company Contacts */}
      <div className="bg-white rounded-lg p-6 shadow mb-6">
        <h2 className="text-xl font-bold mb-2">Company contacts</h2>
        
        <p className="font-bold">Address</p>
        <p>{employer.address}</p>
        <p className="font-bold">Phone</p>
        <p>{employer.phoneNumber}</p>
        
        
       
        
        
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg p-6 shadow">
        <p className="text-gray-500 mb-4">This is a client account</p>
        <div className="flex justify-between">
          <button
            className="bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/register")}
          >
            Create New Account
          </button>
          <button
          onClick={() => signOut('')}
            className="text-red-600 font-bold py-2 px-4 rounded border border-red-600"
            
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}
