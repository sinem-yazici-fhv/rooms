// app/components/Header.tsx
import Link from "next/link"
import { Me } from '@/types'
import { API_URL } from '@/config'

const URL = API_URL + '/users/me'

export default async function Header() {
  const response = await fetch(URL)
  const data = await response.json() as Me

  return (
    <header className="flex items-center justify-between mb-16">
    {/* Logo */}
    <div className="text-2xl font-bold">
      <Link href="/">Arrrbnb</Link>
    </div>

    {/* Navigation Links */}
    <div className="flex items-center gap-4">
      <Link
        href="/rooms"
        className="px-6 py-2 bg-gray-100 rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
      >
        Cabins
      </Link>
      <Link
        href="/rooms/create"
        className="px-6 py-2 bg-gray-100 rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
      >
        Add cabin
      </Link>
    </div>

    {/* User Profile */}
    <div className="flex items-center gap-2">
      <img
        src={data.portraitUrl}
        className="rounded-full w-8 h-8 object-cover"
        alt={`${data.firstName} ${data.lastName}`}
      />
      <span className="text-sm">
        {data.firstName} {data.lastName}
      </span>
    </div>
  </header>
  )
}