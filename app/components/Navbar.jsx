import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-center items-center
    bg-slate-800 px-8 py-3">
    
       <Link className=" text-4xl text-white font-bold" href={"/"}>WorkHive</Link>
   
       
    </nav>
  );
}