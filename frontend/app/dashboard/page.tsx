"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface User {
  email: string;
  features: string[];
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from localStorage or an API
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          router.push('/login'); // Redirect to login if user is not found
          return;
        }
        const userData: User = JSON.parse(storedUser);
        setUser(userData);
        setFeatures(userData.features);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        router.push('/login'); // Redirect to login on error
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 border rounded shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      {user ? (
        <>
          <p className="mb-4 text-center">Welcome, {user.email}!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.includes('finance') && (
              <div className="p-4 border rounded shadow-sm">
                <h2 className="text-xl font-bold mb-2">Personal Finance Manager</h2>
                <p>Manage your finances here.</p>
              </div>
            )}
            {features.includes('personal_organizer') && (
              <div className="p-4 border rounded shadow-sm">
                <h2 className="text-xl font-bold mb-2">Personal Task Organizer</h2>
                <p>Organize your tasks here.</p>
              </div>
            )}
            {features.includes('mood') && (
              <div className="p-4 border rounded shadow-sm">
                <h2 className="text-xl font-bold mb-2">Digital Journal and Mood Tracker</h2>
                <p>Track your mood and journal entries here.</p>
              </div>
            )}
            {features.includes('pets') && (
              <div className="p-4 border rounded shadow-sm">
                <Link href="/dashboard/pets" className="inline-block w-40 py-2 px-4 bg-purple-500 text-white text-center rounded hover:bg-purple-600">
                  Manage Pets
                </Link>
                <p>Manage your pet&rsquo;s care here.</p>
              </div>
            )}
            {features.includes('family_organizer') && (
              <div className="p-4 border rounded shadow-sm">
                <h2 className="text-xl font-bold mb-2">Family Organizer</h2>
                <p>Organize your family tasks and events here.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
