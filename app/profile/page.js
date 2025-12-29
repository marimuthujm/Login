"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Profile() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    email: "",
    mobile: "",
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/login");
      return;
    }
    fetch(`/api/profile?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm({
            username: data.user.username,
            full_name: data.user.full_name || "",
            email: data.user.email || "",
            mobile: data.user.mobile || "",
          });
        }
      });
  }, [router]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleUpdate = async () => {
    setMessage("");
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message);
  };
  const handleDelete = async () => {
  const confirmDelete = confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );
  if (!confirmDelete) return;
  const res = await fetch("/api/profile", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: form.username }),
  });
  const data = await res.json();
  if (data.success) {
    localStorage.removeItem("username");
    router.push("/login");
  } else {
    alert(data.message || "Delete failed");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          My Profile
        </h2>
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          className="mb-3 w-full border p-2 rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-3 w-full border p-2 rounded"
        />
        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="mb-3 w-full border p-2 rounded"
        />
        <input
          value={form.username}
          disabled
          className="mb-4 w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
        <button
          onClick={handleDelete}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >           
          Delete Account
        </button>
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
