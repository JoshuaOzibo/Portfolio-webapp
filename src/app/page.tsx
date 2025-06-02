import Overview from "@/components/overview";
import Sidebar from "@/components/sidebar";

export default function DashboardOverview() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Overview />
      </main>
    </div>
  );
}
