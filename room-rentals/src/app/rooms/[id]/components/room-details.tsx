import type {Room} from  "@/types"
import formatDate from "@/utils/formatDate"



type RoomDetailsProps = {
    room: Room
}

export default function RoomDetails({room}: RoomDetailsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img
              src={room.heroUrl || "/placeholder.svg"}
              alt={room.title}
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>
    
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{room.title}</h1>
    
            <p className="text-gray-700 mb-6">{room.description}</p>
    
            <div className="text-gray-500 mb-6">Added on {formatDate(room.createdAt)}</div>
    
            <div className="flex items-center gap-2">
              <img
                src={room.owner.portraitUrl} 
                className="rounded-full w-8 h-8 object-cover"
                alt="Owner"
              />
              <span className="text-sm">{room.owner.firstName}</span>
            </div>
    
            <div className="mt-auto self-end">
              <div className="text-3xl font-bold text-blue-500 text-right">
                ${room.pricePerNight.amount}
                <span className="text-xl font-medium text-blue-500">/day</span>
              </div>
            </div>
          </div>
        </div>
      ) 
}