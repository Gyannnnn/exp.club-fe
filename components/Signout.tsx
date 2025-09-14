"use client"
import { signOut } from 'next-auth/react'
import React from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function Signout() {
    const handleSignout = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const id = toast.loading("Signing out ")
        try {
            
            await signOut();
            toast.remove(id)
            toast.success("Successfully signed out")
            
        } catch (error) {
            toast.remove(id)
            toast.error("Failed to sign out")
        }
    }
  return (
    <form
      onSubmit={handleSignout}
    >
      <button type="submit">Sign Out</button>
      <Toaster/>
    </form>
  )
}
