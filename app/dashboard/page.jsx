import EmployerProfile from '../components/EmployerProfile';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route';  


export default function Dashboard() {
 
 
 return <EmployerProfile />
}