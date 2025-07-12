import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

export  function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 w-full">
    <p className="text-lg flex gap-x-3 font-semibold font-stretch-125%"><StarIcon className="text-blue-500"/>Persona</p>
  
    <Avatar className="rounded-lg">
      <AvatarImage
        src="https://github.com/evilrabbit.png"
        alt="@evilrabbit"
      />
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>
  </nav>
  
  );
}
