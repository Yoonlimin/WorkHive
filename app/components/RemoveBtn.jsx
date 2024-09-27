"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RemoveBtn({ id, onJobDelete }) {
  const router = useRouter();

  const removeJobPost = async () => {
    const confirmed = confirm("Are you sure you want to delete this JobPost?");
    if (confirmed) {
      
        const res = await fetch(`http://localhost:3000/api/jobs?id=${id}`, {
          
          method: "DELETE",
        });

        if (res.ok) {
          onJobDelete(); // Refresh the page after successful deletion
        } 
      } 
  };

  return (
    <button onClick={removeJobPost} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
