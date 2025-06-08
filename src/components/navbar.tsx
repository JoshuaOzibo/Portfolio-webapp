import React from "react";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

const navbar = () => {
  return (
    <header className="sticky z-10 top-0 w-full bg-white border-b border-gray-200 md:px-5 px-6 lg:py-1.5 py-3">
      <div className="flex justify-between items-center gap-5">
        <div className="space-y-1">
          <h1 className="lg:text-3xl md:text-2xl sm:text-lg text-sm font-bold text-slate-900">
            Welcome back, Joshua!👋
          </h1>
          <p className="tet-slate-600 md:flex hidden lg:text-lg text-sm">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div>
          <Button className="gap-2  cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600">
            <ExternalLink className="md:h-4 g-2 md:w-4 w-2" />
            <p className="md:flex text-xs hidden">View Portfolio</p>
            <p className="md:hidden flex text-xs">View Live</p>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default navbar;
