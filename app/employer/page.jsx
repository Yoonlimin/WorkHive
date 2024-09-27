import JobList from "../components/JobList";
import LogIn from "../components/LoginForm";
import SignUp from "../components/EmployerRegisterForm";
import { getSession } from 'next-auth/react';

// The Home component rendering the JobList
export default function Home() {

 
  return <JobList />;
}
