"use client";

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function FreelancerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', { 
        email,
        password, 
        redirect: false,
      });

      if (res.error) {
        setError("Something went wrong, please try again");
        return;
      }

      // Redirect to freelancer dashboard upon successful login
      router.push('/freelancer');
    } catch (error) {
      console.log('An error occurred while logging in', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-6">Log in as a Freelancer</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Address */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
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
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-green-500 text-white p-3 rounded"
            type="submit"
          >
            Log In
          </button>

          {/* Error Message */}
          {error && (
            <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-4'>
              {error}
            </div>
          )}

          {/* Register Link */}
          <div className="text-right">
            <Link className="text-sm mt-10 text-right" href={"/Fregister"}>
              Don&apos;t have an account? <span className='underline'>Register</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
