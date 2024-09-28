import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route';


export default function Home() {
  
  
  return(
    <div className="p-2">
      <h2 className="text-center font-bold text-2xl mt-4">Join as a client or freelancer</h2>
      
      <div className="flex justify-center items-center gap-4 p-4 mt-5">
        <Link href={"/login"} className="bg-blue-500 text-white font-bold py-5 px-20 rounded mt-20"> 
        <div className="flex justify-center items-center ">
         <FontAwesomeIcon icon={faUserTie} className="h-8 w-8 " />
        </div>
          <p className="font-semibold text-center">
            I’m a client, hiring for a project
          </p>
        
        </Link>

        <Link href={"/login2"} className="bg-green-500 text-white font-bold py-5 px-20 rounded mt-20"> 
        <div className="flex justify-center items-center ">
         <FontAwesomeIcon icon={faLaptopCode} className="h-8 w-8  " />
        </div>
          <p className="font-semibold text-center">
            I’m a freelancer, looking for work
          </p>
        
        </Link>
      </div>
      
    </div>


  );
}
