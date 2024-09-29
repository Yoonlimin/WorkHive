"use client";
 
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
 
export default function CompanyProfile() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const employerId = searchParams.get("employerId");
 
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        console.log(employerId);
 
        const res = await fetch(
          `/api/companyDetails/${employerId}`
        );
        if (!res.ok) throw new Error("Failed to fetch company details");
 
        const data = await res.json();
        console.log("Fetched company data: ", data);
 
        // Extract employer details
        setCompany(data.employer); // Adjust this to access the 'employer' field
      } catch (error) {
        console.error("Error loading company:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
 
    if (employerId) {
      fetchCompany();
    }
  }, [employerId]);
 
  if (loading) return <p>Loading company details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!company) return <p>No company information found</p>;
 
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">{company.companyName}</h1>
 
      {/* Company Details */}
      <div className="mb-4">
        <p className="text-lg font-semibold">Description:</p>
        <p className="text-gray-700">
          {company.companyDetails || "No description provided"}
        </p>
      </div>
 
      <div className="mb-4">
        <p className="text-lg font-semibold">Address:</p>
        <p className="text-gray-700">
          {company.address || "No address provided"}
        </p>
      </div>
 
      <div className="mb-4">
        <p className="text-lg font-semibold">Phone:</p>
        <p className="text-gray-700">
          {company.phoneNumber || "No phone number provided"}
        </p>
      </div>
    </div>
  );
}
 