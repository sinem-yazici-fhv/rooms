import { API_URL } from "@/config"
import type { Room } from "@/types"
import { notFound } from "next/navigation"
import RoomDetails from "./components/room-details"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params)
  const id = resolvedParams.id

  const response = await fetch(`${API_URL}/rooms/${id}`)
  if (!response.ok) return { title: "Room Not Found" }

  const room: Room = await response.json()

  return {
    title: `${room.title} | Arrrbnb`,
    description: room.description,
  }
}

export default async function RoomPage({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params)
  const id = resolvedParams.id

  const response = await fetch(`${API_URL}/rooms/${id}`, {
    next: { tags: [`room-${id}`] },
  })

  if (!response.ok) notFound()

  const room = (await response.json()) as Room

  return <RoomDetails room={room} />
}

