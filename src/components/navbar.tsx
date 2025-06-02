import React from "react";
import { Button } from "./ui/button";
import { BarChart3, ExternalLink } from "lucide-react";

const navbar = () => {
  return (
    <div>
      <div className="flex px-10 bg-white py-1.5 fixed border-b border-gray-200 w-[88%] flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, John! 👋
          </h1>
          <p className="text-slate-600 mt-2">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
            <ExternalLink className="h-4 w-4" />
            View Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default navbar;
