
"use client";

import { ProfileTab } from '@/components/sections/settings/profile-tab';

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>
      <ProfileTab />
    </div>
  );
}
