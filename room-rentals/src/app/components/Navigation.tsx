"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

export default function Navigation() {
  const segment = useSelectedLayoutSegment()

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/rooms"
        className={`px-6 py-2 rounded-full transition-colors ${
          !segment || segment === "(.)"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        Cabins
      </Link>

      <Link
        href="/rooms/create"
        className={`px-6 py-2 rounded-full transition-colors ${
          segment === "create"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        Add cabin
      </Link>
    </div>
  )
}

