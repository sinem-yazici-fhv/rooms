import { revalidatePath } from "next/cache"
import CreateForm from "./CreateForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Add Cabin | Arrrbnb",
  description: "Add a new cabin to Arrrbnb",
}

interface FormState {
  error?: string
  success?: boolean
  redirectTo?: string
}

interface PricePerNight {
  amount: number
  currency: string
}

interface RoomData {
  title: string
  description: string
  heroUrl: string
  pricePerNight: PricePerNight
}

export default function CreatePage() {
  async function submit(prevState: FormState | null, formData: FormData): Promise<FormState> {
    "use server"

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const heroUrl = formData.get("heroUrl") as string
    const pricePerNightAmount = formData.get("pricePerNightAmount") as string

    if (!title || !description || !heroUrl || !pricePerNightAmount) {
      return { error: "All fields are required" }
    }

    if (!heroUrl.startsWith("https://c.pxhere.com/")) {
      return { error: "Hero URL must start with https://c.pxhere.com/" }
    }

    try {
      const roomData: RoomData = {
        title,
        description,
        heroUrl,
        pricePerNight: {
          amount: Number.parseFloat(pricePerNightAmount),
          currency: "USD",
        },
      }

      const response = await fetch("http://localhost:3001/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return { error: errorData.message || "Failed to create cabin" }
      }

      if (response.status === 201) {
        revalidatePath("/rooms")
        return { success: true, redirectTo: "/rooms" }
      }

      return { success: true }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      return { error: errorMessage }
    }
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Add cabin</h1>
        <CreateForm submit={submit} />
      </div>
    </div>
  )
}

