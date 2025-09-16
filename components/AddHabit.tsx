"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast,Toaster } from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";

export default function AddHabit({userId,token}:{userId:string,token:string}) {
  const [loading, setLoading] = React.useState(false);
  const handleHabit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    const id = toast.loading("Adding habit...");
    setLoading(true);
    try {
      const res = await axios.post("https://exp-club-be.vercel.app/api/v1/habits/create", {
        name,
        description,
        category,
        userId
      },{ 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      
      toast.success("Habit added successfully");
      toast.dismiss(id);
 
      setLoading(false);
    } catch (error) {
      toast.error("Error adding habit");
      toast.dismiss(id);
      console.log(error);
      setLoading(false);
      
    }

  }
  return (
    <Card>
      <CardHeader>Add A New Habit Duplicates are not allowed</CardHeader>
      <CardContent>
        <form  className="flex flex-col w-full gap-4" onSubmit={handleHabit}>
          <div className="w-full flex gap-2 max-sm:flex-col">
            <div className="flex flex-col gap-2 sm:w-1/3 w-full">
              <Label>Habit</Label>
              <Input name="name" placeholder="Enter habit name"></Input>
            </div>
            <div className="flex flex-col gap-2 sm:w-1/3 w-full">
              <Label>Habit description</Label>
              <Input
                name="description"
                placeholder="Enter habit description"
              ></Input>
            </div>
            <div className="flex flex-col gap-2 sm:w-1/3 w-full">
              <Label>Habit category</Label>
              <Input name="category" placeholder="Enter habit category"></Input>
            </div>
          </div>
          {
            loading ? (
              <Loader message="Adding habit..." />
            ) : (
              <Button type="submit">Add new habit</Button>
            )
          }
        </form>
      </CardContent>
      <Toaster/>
    </Card>
  );
}
