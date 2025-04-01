import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import CreateForm from "./CreateForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Add Cabin | Arrrbnb",
  description: "Add a new cabin to Arrrbnb",
}

export default function CreatePage() {
  async function submit(prevState: any, formData: FormData) {
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
      const response = await fetch("http://localhost:3001/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          heroUrl,
          pricePerNight: {
            amount: Number.parseFloat(pricePerNightAmount),
            currency: "USD",
          },
        }),
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
    } catch (error) {
      return { error: "An unexpected error occurred" }
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