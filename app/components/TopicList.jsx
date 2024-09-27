"use client";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const getTopic= async () => {
  
  
  try{
    const res= await fetch("http://localhost:3000/api/topics/",{
    cache : "no-store",
  });

  if (!res.ok){
    throw new Error("Failed to fetch topics");
  }

  
  return res.json();
  
  
}

  catch (error){
    console.log("Error loading topics", error);

  }
}
export default function TopicList() {
  const [topics, setTopics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopic();
      setTopics(data.topics);
      router.refresh();
    };

    fetchTopics();
  }, [router]);
  
  
  return (
    <>
    <div className=" p-4 mt-10">
     <Link className="bg-blue-500 text-white font-bold py-5 px-20 rounded mt-20 " href={"/addTopic"}>Add Job</Link>
    </div>
    
      {topics.map((t) => (
        <div key={t.id}className="p-4 border border-slate-300 my-3
        flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id}/>
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24}/>
            </Link> 

          </div>
        </div>
      ))}
    </>
    
  );
}