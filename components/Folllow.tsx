"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { UserRoundPlus } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

export default function Folllow({
  followerId,
  followeeId,
  token,
}: {
  followerId: string;
  followeeId: string;
  token: string;
}) {
  const [follow, setFollow] = useState(false);

  const handleFollow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = toast.loading("Following");
    try {
      if(followeeId === followerId){
        toast.remove(id)
        toast.error("Cannot follow yourself");
        return
      }
      const res = await axios.post(
        "https://exp-club-be.vercel.app/api/v1/users/follow",
        { followerId, followeeId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollow(true);
      toast.remove(id);
      toast.success("Successfully followed user");
    } catch (error) {
      const err = error as Error
      toast.remove(id);
      toast.error("Failed to follow");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFollow}>
      <Button type="submit" className="flex gap-2">
        {follow ? (
          "Follwing"
        ) : (
          <div className="flex gap-2">
            <UserRoundPlus size={18} /> Follow
          </div>
        )}
      </Button>
      <Toaster />
    </form>
  );
}
