import React from "react";
import Link from "next/link";
import { Code2, Briefcase, FolderOpen, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-28 md:w-64 z-20 h-screen fixed bg-white border-r border-gray-200 flex flex-col">
      {/* Portfolio Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex w-full md:justify-start justify-center items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">P</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">Portfolio</h1>
            <p className="text-sm text-gray-600">Content Manager</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-center items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-gray-200 rounded-full"></div>
            <div className="hidden md:block">
              <h2 className="font-medium">Ozibo Joshua</h2>
              <p className="text-xs text-gray-600">
                joshuamichaelozibo@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 md:space-y-2 md:mx-0 mx-auto space-y-10">
        <Link
          href="/"
          className=" border border-gray-200 flex items-center gap-3 md:p-4 p-3  text-gray-700 hover:bg-gray-50 rounded-lg relative"
        >
          <div className="p-3 rounded-xl bg-yellow-50">
            <LayoutDashboard className="h-6 w-6 text-yellow-600" />
          </div>
          <span className="hidden md:block">Dashboard</span>
        </Link>

        <Link
          href="/projects"
          className=" border border-gray-200  flex items-center gap-3 md:p-4 p-3 text-gray-700 hover:bg-gray-50 rounded-lg relative"
        >
          <div className="p-3 rounded-xl bg-blue-50">
            <FolderOpen className="h-6 w-6 text-blue-600" />
          </div>
          <span className="hidden md:block">Projects</span>
        </Link>

        <Link
          href="/skills"
          className=" border border-gray-200  flex items-center gap-3 md:p-4 p-3 text-gray-700 hover:bg-gray-50 rounded-lg relative"
        >
          <div className="p-3 rounded-xl bg-green-50">
            <Code2 className="h-6 w-6 text-green-600" />
          </div>
          <span className="hidden md:block">Skills</span>
        </Link>

        <Link
          href="/experience"
          className=" border border-gray-200  flex items-center gap-3 md:p-4 p-3 text-gray-700 hover:bg-gray-50 rounded-lg relative"
        >
          <div className="p-3 rounded-xl bg-purple-50">
            <Briefcase className="h-6 w-6 text-purple-600" />
          </div>
          <span className="hidden md:block">Experience</span>
        </Link>
      </nav>

      {/* Portfolio Status */}
      <div className="hidden md:block p-4 m-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium">Portfolio Status</h3>
        <p className="text-sm text-gray-600">
          Your portfolio is live and looking great!
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
