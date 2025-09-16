import Link from "next/link";
import React from "react";
import { Home, User, Users, Rss } from "lucide-react"; // icons from lucide-react

const navData = [
  { link: "/", linkName: "Home", icon: <Home size={22} /> },
  { link: "/feed", linkName: "Feed", icon: <Rss size={22} /> },
  { link: "/follow", linkName: "Follow", icon: <Users size={22} /> },
  { link: "/profile", linkName: "Profile", icon: <User size={22} /> },
];

export default function Bottombar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md sm:hidden">
      <div className="flex justify-around items-center h-14">
        {navData.map((data, index) => (
          <Link
            key={index}
            href={data.link}
            className="flex flex-col items-center text-gray-600 hover:text-black transition-colors"
          >
            {data.icon}
            <span className="text-xs">{data.linkName}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
