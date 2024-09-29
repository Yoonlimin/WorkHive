"use client";

import Link from "next/link"
import { useState } from "react";
import {useRouter} from 'next/navigation';

export default function RegisterForm() {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [companyName, setCompanyName] = useState('');
 const [companyDetails, setCompanyDetails] = useState('');
 const [address, setAddress] = useState('');
 const [phoneNumber, setPhoneNumber] = useState('');
 const [error, setError] = useState('All fields are required');

 const router=useRouter();

 const handleSubmit = async (e) => {
   e.preventDefault();

   if(!name || !email || !password || !companyName || !companyDetails || !address || !phoneNumber) {
    setError('Please fill in all fields');
    return;
   }

   try{

    const resUserExist=await fetch('http://localhost:3000/api/userExist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const {user}=await resUserExist.json();
    if(user){
      setError('User already exists');
      return;
    }


    const res=await fetch('http://localhost:3000/api/Eregister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, companyName, companyDetails, address, phoneNumber }),
    });

    if(res.ok){
      const form=e.target;
      form.reset();
      router.push('/login');
    }else{
     console.log('An error occured while registering', error);
    }

      
   }catch(error){
      console.error('An error occured while registering', error);
    
   }
  
   
 };

 return (
   <div className="flex justify-center items-center ">
     <div className="w-full max-w-lg bg-white p-8 rounded shadow-lg">
       {/* Title */}
       <h2 className="text-3xl font-semibold text-center mb-6">Create an account</h2>
       {/* OR Divider */}
       

       {/* Signup Form */}
       <form onSubmit={handleSubmit}>
         {/* full Name and Last Name */}
         <div className="flex gap-4 mb-4">
           <input
             type="text"
             placeholder="Full Name"
             className="w-full p-3 border rounded"
             value={name}
             onChange={(e) => setName(e.target.value)}
             required
           />
           
         </div>

         {/* Email Address */}
         <div className="mb-4">
           <input
             type="email"
             placeholder="email address"
             className="w-full p-3 border rounded"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
         </div>

         {/* Password */}
         <div className="mb-4 relative">
           <input
             type="password"
             placeholder="Password (8 or more characters)"
             className="w-full p-3 border rounded"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
           {/* You can add an eye icon to toggle visibility if needed */}
         </div>

         {/* Company Name */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-3 border rounded"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>

      {/* Company Details */}
      <div className="mb-4">
        <textarea
          placeholder="Company Details"
          className="w-full p-3 border rounded"
          value={companyDetails}
          onChange={(e) => setCompanyDetails(e.target.value)}
          required
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Address"
          className="w-full p-3 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 border rounded"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

         {/* Submit Button */}
         <button className="w-full bg-blue-500 text-white p-3 rounded" type="submit"
           
         >
           Register
         </button>

         { error && (
          <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-4'>
           {error}
         </div>
         )}
    

         <div className="text-right">
          <Link className="text-sm mt-10 text-right" href={"/login"}>
           Already have an account? <span className='underline'>
            Login

           </span>
          </Link>
         </div>
         
       </form>
     </div>
   </div>
 );
}
