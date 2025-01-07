"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  phone?: number; // Ensure this remains a number.
  gender?: string;
}

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phone: undefined, // Initialize `phone` as `undefined`.
    gender: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Ensure `phone` is handled as a number.
    setFormData({
      ...formData,
      [name]: name === "phone" ? parseInt(value, 10) || undefined : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSuccess("Registration successful! Redirecting to Sign In...");
        setTimeout(() => {
          router.push("/SignIn");
        }, 2000);
      } else {
        const data = await response.json(); // Parse the JSON response for error details
        console.error("Error:", data);
        setError(data.message || "An error occurred during registration.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("Failed to register. Please check your connection and try again.");
    }
  };
  

  return (
    <div className="flex flex-wrap items-center justify-center lg:space-x-8 p-6">
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="relative mx-auto max-w-screen-md space-y-3 rounded-md border border-gray-100 bg-white p-6 shadow-xl lg:p-10"
        >
          <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Register</h1>

          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstname"
                placeholder="Your Name"
                value={formData.firstname}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="info@example.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              required
            />
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              >
                <option value="">Select Option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="phone">
                Phone <span className="text-sm text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="+543 5445 0543"
                value={formData.phone || ""}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white hover:bg-blue-700"
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
