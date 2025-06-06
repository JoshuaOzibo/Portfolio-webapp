'use client';

import Overview from "@/app/home/overview";
import AuthInput from "@/components/auth_input";

export default function DashboardOverview() {
  return (
    <main className="w-full">
      {/* <Overview /> */}
      <AuthInput onSubmit={() => {}} onGoogleSignIn={() => {}} type="signin" />
    </main>
  );
}
