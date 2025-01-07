'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import bgimg from '@/assets/close-up-macro-flower.jpg';

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      }

      alert('Login successful!');
      // Redirect to dashboard or any other page
      window.location.href = '/dashboard';
    } catch (error) {
      console.log('Error:',error)
    }
  };

  return (
    <div className="flex flex-wrap">
      {/* Right Section */}
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
        <Image
          className="absolute top-0 h-full w-full object-cover opacity-90"
          src={bgimg}
          alt="Background"
          layout="fill"
        />
      </div>
      {/* Left Section */}
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <a
            href="#"
            className="border-b-gray-700 border-b-4 pb-2 font-Tangerine text-5xl font-bold text-gray-900"
          >
            Blooming
          </a>
        </div>
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 py-2 md:pt-20">
          <p className="text-left text-3xl font-sans font-semibold">
            Welcome back, discover this season&apos;s freshest blooms!
          </p>
          <p className="mt-2 text-left text-gray-500">Please enter your details.</p>

          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="mb-4 text-red-500">{errorMessage}</div>
            )}
            <div className="flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  type="email"
                  id="login-email"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-12 flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  type="password"
                  id="login-password"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
            >
              Log in
            </button>
          </form>
          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/SignUp"
                className="underline-offset-4 font-semibold text-gray-900 underline"
              >
                Sign up for free.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
