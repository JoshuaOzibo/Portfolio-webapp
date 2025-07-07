"use client"

import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
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
            Welcome back, {user?.name} 👋
          </h1>
          <p className="tet-slate-600 md:flex hidden lg:text-lg text-sm">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full cursor-pointer flex items-center justify-center md:justify-start gap-3 p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200 group"
          >
            <LogOut className="h-5 w-5 group-hover:text-red-600" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
