import React from "react";
import { Button } from "./ui/button";
import {  ExternalLink } from "lucide-react";

const navbar = () => {
    
  return (
    <div>
      <div className="flex px-10 bg-red-500 py-1.5 fixed border-b border-gray-200 xl:w-[85%] lg:w-[78%] w-full flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="">
          <h1 className="lg:text-3xl md:text-2xl text-sm font-bold text-slate-900">
            Welcome back, Joshua! 👋
          </h1>
          <p className="text-slate-600 lg:text-2xl md:text-xl text-sm mt-2">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="flex items-center gap-3">
         
          <Button className="gap-2 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600">
            <ExternalLink className="h-4 w-4" />
            View Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default navbar;
