"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // ✅ Only if using NextAuth

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // ✅ Remove stored user session (localStorage)
      localStorage.removeItem("user");

      // ✅ If using NextAuth, sign out
      // (Uncomment this if you are actually using NextAuth)
      // await signOut({ redirect: false });

      // ✅ Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 
      hover:from-red-500 hover:to-red-400 transition shadow-md font-medium text-white text-sm"
    >
      🚪 Logout
    </button>
  );
}
