import EditFreelancerProfile from "../../components/EditFreelancerProfile";

const getFreelancerByEmail = async (email) => {
 try {
   // Ensure email is properly decoded
   const decodedEmail = decodeURIComponent(email);
   
   const res = await fetch(`/api/Fregister?email=${decodedEmail}`, {
     cache: "no-store",
   });

   if (!res.ok) {
     throw new Error("Failed to fetch freelancer profile");
   }

   const data = await res.json();
   return data.freelancer; // Return the actual freelancer data
 } catch (error) {
   console.error("Error loading freelancer profile:", error);
   return null; // Return null if there's an error
 }
};

export default async function EditProfile2({ params }) {
 const { id: email } = params; // Extract the email from the route parameters

 // Decode the email to handle special characters
 const decodedEmail = decodeURIComponent(email);
 
 console.log("Fetching freelancer with email:", decodedEmail);

 // Fetch the freelancer data by email
 const freelancer = await getFreelancerByEmail(decodedEmail);

 if (!freelancer) {
   // If freelancer is null or not found, render an error message or handle it as needed
   return <div>Freelancer not found</div>;
 }

 const { name, workType, skills, experienceLevel, professionalRole, address, phoneNumber } = freelancer;

 return (
   <EditFreelancerProfile
     email={decodedEmail} // Passing decoded email
     name={name}
     workType={workType}
     skills={skills}
     experienceLevel={experienceLevel}
     professionalRole={professionalRole}
     address={address}
     phoneNumber={phoneNumber}
   />
 );
}
