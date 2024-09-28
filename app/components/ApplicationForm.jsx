// "use client";
// import { useState } from "react";

// export default function JobApplicationForm({ jobId }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [resume, setResume] = useState(null);
//   const [coverLetter, setCoverLetter] = useState(null);

//   const handleResumeChange = (e) => {
//     setResume(e.target.files[0]);
//   };

//   const handleCoverLetterChange = (e) => {
//     setCoverLetter(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("address", address);
//     formData.append("resume", resume);
//     formData.append("coverLetter", coverLetter);
//     formData.append("jobId", jobId);

//     try {
//       const res = await fetch("http://localhost:3000/api/apply", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error("Failed to submit application");
//       }

//       console.log("Application submitted successfully");
//     } catch (error) {
//       console.error("Error submitting application:", error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Job Application</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div>
//           <label className="block font-semibold mb-1">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-3 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold mb-1">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold mb-1">Address</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full p-3 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold mb-1">Resume</label>
//           <input type="file" onChange={handleResumeChange} />
//         </div>
//         <div>
//           <label className="block font-semibold mb-1">Cover Letter</label>
//           <input type="file" onChange={handleCoverLetterChange} />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded mt-4">
//           Submit Application
//         </button>
//       </form>
//     </div>
//   );
// }
