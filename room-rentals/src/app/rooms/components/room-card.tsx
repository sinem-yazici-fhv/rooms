import Link from "next/link"
import type { Room } from "@/types"
import formatDate from "@/utils/formatDate"

type RoomCardProps = {
  room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Link
      href={`/rooms/${room.id}`}
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="h-48 overflow-hidden">
        <img src={room.heroUrl || "/placeholder.svg"} alt={room.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg">{room.title}</h3>

        <div className="min-h-[60px]">
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{room.description}</p>
        </div>

        <div className="min-h-[60px]">
          <div className="mt-3 text-sm text-gray-500">
            Added on{" "}
            {formatDate(room.createdAt)}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="font-semibold text-lg">
              ${room.pricePerNight.amount}
              <span className="text-sm text-gray-500">/day</span>
            </div>

            <div className="flex items-center gap-2">
              <img 
                src={room.owner.portraitUrl} 
                className="rounded-full w-8 h-8 object-cover"
                alt="Owner"
              />
              <span className="text-sm">{room.owner.firstName}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

