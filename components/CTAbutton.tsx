import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { auth } from "@/auth";

export default async function CTAbutton() {
  try {
    const session = await auth();

    return session?.user ? (
      <Link href="/profile">
        <Button size="lg" className="px-8">
          Start Your Journey
        </Button>
      </Link>
    ) : (
      <Link href="/signup">
        <Button size="lg" className="px-8">
          Start Your Journey
        </Button>
      </Link>
    );
  } catch (error) {
    return (
      <Link href="/signup">
        <Button size="lg" className="px-8">
          Start Your Journey
        </Button>
      </Link>
    );
  }
}
