import { LoaderCircleIcon } from "lucide-react";
import React from "react";

export default function Loader({message}:{message:string}) {
  return (
    <div className="flex justify-center items-center gap-2">
      <LoaderCircleIcon className="animate-spin" />
      <h1>{message}</h1>
    </div>
  );
}
