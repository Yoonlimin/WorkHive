"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function FreelancerRegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [workType, setWorkType] = useState('');
  const [skills, setSkills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [professionalRole, setProfessionalRole] = useState('');
  const [languageProficiency, setLanguageProficiency] = useState([]);
  const [language, setLanguage] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [salaryRate, setSalaryRate] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const addLanguageProficiency = () => {
   if (language && proficiency) {
     setLanguageProficiency([...languageProficiency, { language, level: proficiency }]);
     setLanguage(''); // Reset the language input
     setProficiency(''); // Reset the proficiency dropdown
   }
 };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !workType || !skills || !experienceLevel || !professionalRole || !languageProficiency || !salaryRate || !birthdate || !address || !phoneNumber) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Check if freelancer exists
      const resUserExist = await fetch('/api/userExist2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExist.json();
      if (user) {
        setError('Freelancer already exists');
        return;
      }

      // Register new freelancer
      const res = await fetch('/api/Fregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, workType, skills, experienceLevel, professionalRole, languageProficiency, salaryRate, birthdate, address, phoneNumber }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push('/login2');
      } else {
        console.log('An error occurred while registering', error);
      }
    } catch (error) {
      console.log('An error occurred while registering', error);
    }
  };


  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-6">Register as a Freelancer</h2>
        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
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
              placeholder="Email address"
              className="w-full p-3 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password (8 or more characters)"
              className="w-full p-3 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Work Type */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="What kind of work are you here to do?"
              className="w-full p-3 border rounded"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              required
            />
          </div>

          {/* Skills */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Skills (comma-separated)"
              className="w-full p-3 border rounded"
              value={skills.join(', ')}
              onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))}
              required
            />
          </div>

          {/* Experience Level */}
          <div className="mb-4">
            <select
              className="w-full p-3 border rounded"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              required
            >
              <option value="">Select Experience Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Professional Role */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Professional Role"
              className="w-full p-3 border rounded"
              value={professionalRole}
              onChange={(e) => setProfessionalRole(e.target.value)}
              required
            />
          </div>

           {/* Language Input */}
           <div className="mb-4 flex gap-4">
            {/* Language Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Language (e.g., English)"
                className="w-full p-3 border rounded"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              />
            </div>

            {/* Proficiency Dropdown */}
            <div className="flex-1">
              <select
                className="w-full p-3 border rounded"
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value)}
                required
              >
                
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
              </select>
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Your Hourly Rate ($)"
              className="w-full p-3 border rounded"
              value={salaryRate}
              onChange={(e) => setSalaryRate(e.target.value)}
              required
            />
          </div>

          {/* Birthdate */}
          <div className="mb-4">
            <label className="font-semibold">Birthdate</label>
            <input
              type="date"
              className="w-full p-3 border rounded"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
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
          <button className="w-full bg-green-500 text-white p-3 rounded" type="submit">
            Register
          </button>

          {/* Error Message */}
          {error && (
            <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-4'>
              {error}
            </div>
          )}

          {/* Login Link */}
          <div className="text-right">
            <Link className="text-sm mt-10 text-right" href={"/login2"}>
              Already have an account? <span className='underline'>Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}