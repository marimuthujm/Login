"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Dashboard() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  useEffect(() => {
    const name = localStorage.getItem("username");
    if (!name) {
      router.push("/login");
    } else {
      setUsername(name);
    }
  }, [router]);
  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/login");
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between bg-blue-600 text-white px-6 py-3">
        <h1 className="text-xl font-semibold">Home</h1>
        <div className="flex gap-3">
          <Link
            href="/profile"
            className="bg-white text-blue-600 px-4 py-1 rounded font-medium"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded font-medium"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center h-[80vh]">
        <h2 className="text-3xl font-bold">
          Welcome, {username} 👋
        </h2>
      </div>
    </div>
  );
}
