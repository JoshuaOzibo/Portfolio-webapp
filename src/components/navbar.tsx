"use client"

import React from "react";
import { Button } from "./ui/button";
import { ExternalLink, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky z-10 top-0 w-full bg-white border-b border-gray-200 md:px-5 px-6 lg:py-1.5 py-3">
      <div className="flex justify-between items-center gap-5">
        <div className="space-y-1">
          <h1 className="lg:text-3xl md:text-2xl sm:text-lg text-sm font-bold text-slate-900">
            Welcome back, {user?.name || 'User'}!👋
          </h1>
          <p className="tet-slate-600 md:flex hidden lg:text-lg text-sm">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">{user?.email}</span>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="gap-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
          <Button className="gap-2 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600">
            <ExternalLink className="md:h-4 g-2 md:w-4 w-2" />
            <p className="md:flex text-xs hidden">View Portfolio</p>
            <p className="md:hidden flex text-xs">View Live</p>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
