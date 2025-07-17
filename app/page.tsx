"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center text-center text-white overflow-hidden">
      {/* ✅ Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-pink-500 opacity-40 blur-md animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* ✅ Hero Section */}
      <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-10 md:p-14 max-w-3xl w-full shadow-2xl border border-gray-700 hover:border-indigo-500 transition">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient">
          PaperFlow
        </h1>
        <p className="mt-4 text-gray-300 text-lg md:text-xl">
          The smart way to manage <span className="text-indigo-400 font-semibold">papers</span>, 
          assign <span className="text-purple-400 font-semibold">reviewers</span>, 
          and track <span className="text-pink-400 font-semibold">progress</span>.
        </p>

        {/* ✅ Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
            hover:from-indigo-500 hover:to-purple-500 rounded-lg font-semibold 
            shadow-lg transform hover:scale-110 transition duration-300"
          >
            🔑 Login
          </Link>
          <Link
            href="/register"
            className="px-8 py-3 bg-gradient-to-r from-pink-600 to-red-500 
            hover:from-pink-500 hover:to-red-400 rounded-lg font-semibold 
            shadow-lg transform hover:scale-110 transition duration-300"
          >
            📝 Sign Up
          </Link>
        </div>

        {/* ✅ Bouncing Button (New Feature) */}
        <div className="mt-10">
          <Link
            href="/register"
            className="animate-bounce rounded bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-700 transition shadow-md"
          >
            🚀 Get Started Now
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Seamless. Secure. Smart. Welcome to the future of paper management.
        </p>
      </div>

      {/* ✅ Footer */}
      <p className="absolute bottom-5 text-gray-500 text-xs">
        © {new Date().getFullYear()} PaperFlow. All rights reserved.
      </p>
    </div>
  );
}
