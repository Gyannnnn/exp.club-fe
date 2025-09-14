import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <a href="https://exp.club">
      <Image
        src={"/EXP_CLUB_LOGO_DARK_TEXT_s1fwrv.svg"}
        alt="logo"
        height={140}
        width={140}
      ></Image>
    </a>
  );
}
