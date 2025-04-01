'use client'

import { useRouter } from 'next/navigation'

export default function SortSelect({ currentSort }: { currentSort: string }) {
  const router = useRouter()

  return (
    <select
      value={currentSort}
      onChange={(e) => {
        console.log("Selected sort:" , e.target.value)
        router.push(`/rooms?sort=${e.target.value}&page=1`)
      }}
      className="p-2 border rounded text-sm"
    >
      <option value="createdAt,desc">Newest</option> {/* Hier desc hinzugefügt */}
      <option value="pricePerNight.amount,asc">Price (low to high)</option>
      <option value="pricePerNight.amount,desc">Price (high to low)</option>
    </select>
  )
}
