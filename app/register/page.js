"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRegister = async () => {
    setMessage("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Registration successful. Please login.");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setMessage(data.message || "Registration failed");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Create Account
        </h2>
        <input
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
          className="mb-3 w-full rounded border p-2"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="mb-3 w-full rounded border p-2"
        />
        <input
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="mb-3 w-full rounded border p-2"
        />
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="mb-3 w-full rounded border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="mb-5 w-full rounded border p-2"
        />
        <button
          onClick={handleRegister}
          className="w-full rounded bg-green-600 py-2 text-white hover:bg-blue-700"
        >
          Register
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-red-600">
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
