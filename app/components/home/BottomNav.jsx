"use client";
import { useRouter } from "next/navigation";

export default function BottomNav() {

  const router = useRouter();

  return (
    <nav className="flex justify-around items-center py-3 bg-white border-t fixed bottom-0 left-0 right-0 sm:static">
      <button className="text-blue-600 flex flex-col items-center text-sm">
        <span>🏠</span> Home
      </button>
      <button className="text-gray-600 flex flex-col items-center text-sm" onClick={() => router.push("../../category")}>
        <span>📂</span> Categories
      </button>
      <button className="text-gray-600 flex flex-col items-center text-sm">
        <span>ℹ️</span> About
      </button>
      <button className="text-gray-600 flex flex-col items-center text-sm">
        <span>✉️</span> Contact
      </button>
    </nav>
  );
}
