import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { auth } from "@/auth";
import Signout from "./Signout";
const navData = [
  { link: "/", linkName: "Home" },
  { link: "/feed", linkName: "Feed" },
  { link: "/follow", linkName: "Follow Others" },
  { link: "/profile", linkName: "Profile" },
];

export default async function Navbar() {
  const session = await auth();

  console.log(session?.user.email)
  return (
    <div className="h-20 w-screen bg-background fixed top-0 p-4 flex sm:justify-around items-center justify-between z-50">
      <Logo />
      <div className="w-1/3 bg-muted h-14 rounded-3xl sm:flex hidden items-center justify-around">
        {navData.map((data, index) => (
          <Link key={index} href={data.link}>
            {data.linkName}
          </Link>
        ))}
      </div>
      <div className="sm:h-12 h-10 bg-primary text-white rounded-3xl sm:w-36 w-32 flex items-center justify-center">
        <div>
          {session?.user.email ? <Signout/> : (
            <Link href={"/signup"}>Get started</Link>
          )}
        </div>
      </div>
    </div>
  );
}
