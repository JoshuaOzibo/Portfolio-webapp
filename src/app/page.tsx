'use client';

import Overview from "@/app/home/overview";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function DashboardOverview() {
  return (
    <main className="w-full">
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 md:ml-64 ml-24">
          <Navbar />
          <main className="mt-20 p-5 w-full">
            <Overview />
          </main>
        </div>
      </div>
    </main>
  );
}
