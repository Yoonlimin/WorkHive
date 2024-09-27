
import LoginForm from "../components/LoginForm";
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'; 
export default function LogIn() {

 return <LoginForm />;
}