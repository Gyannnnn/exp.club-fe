"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";

export function SignupForm() {
  const router = useRouter();
  const [loading, Setloading] = useState(false);
  const HandleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("name");
    const userEmail = formData.get("email");
    const userPassword = formData.get("password");
    const userBio = formData.get("bio");
    console.log(userName, userEmail, userPassword, userBio);
    Setloading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/signup", {
        userName,
        userEmail,
        userPassword,
        userBio,
      });
      console.log(res.data);
      Setloading(false);
      toast.success("Signup Successfull");
      router.push("/");
    } catch (error) {
      Setloading(false);
      toast.error("Failed to Signup");
      console.log(error);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Enter credential to signup</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={HandleSignUp}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="enter you bio will be shown on profile"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {
                    loading?(
                      <div className="flex justify-center items-center gap-2">
                        <LoaderCircleIcon className="animate-spin"/>
                        <h1>Signing up ...</h1>
                      </div>

                    ):"Signup"
                  }
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="signin" className="underline underline-offset-4">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
