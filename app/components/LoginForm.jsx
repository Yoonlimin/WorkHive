"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {signIn, getSession} from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

export default function Signup() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 const router=useRouter();
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError('Please check your email and password again');
      return;
    }

    // Fetch session to get user role
    const session = await getSession();

    // Redirect based on user role
    if (session?.user?.role === 'employer') {
      router.push('/employer'); // Replace with the correct path for employer
    } else if (session?.user?.role === 'freelancer') {
       setError('This account is not registered as a client');
       router.refresh();// Replace with the correct path for freelancer
    }
  } catch (error) {
    console.log('An error occurred while logging in', error);
  }
};


  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-6">Log in to hire talent</h2>
        {/* OR Divider */}
        

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* First Name and Last Name */}
        

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

          {/* Submit Button */}
          <button className="w-full bg-blue-500 text-white p-3 rounded" type="submit"
         
            
          >
            Log In
          </button>

          { error && (
          <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-4'>
           {error}
         </div>
         )}


          <div className="text-right">
           <Link className="text-sm mt-10 text-right" href={"/Eregister"}>
            Don&apos;t have an account? <span className='underline'>
             Register

            </span>
           </Link>
          </div>
          
        </form>
      </div>
    </div>
  );
}
