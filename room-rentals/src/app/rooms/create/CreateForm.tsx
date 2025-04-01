"use client"

import { useFormStatus } from "react-dom"
import { useActionState, useState } from "react"
import { redirect } from "next/navigation"

type Props = {
  submit: (prevState: any, formData: FormData) => Promise<any>
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  )
}

export default function CreateForm({ submit }: Props) {
  const [state, formAction] = useActionState(submit, null)
  const [price, setPrice] = useState("95")
  const { pending } = useFormStatus()

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  function validateField(name: string, value: string) {
    if (!value) {
      setErrors((prev) => ({ ...prev, [name]: "This field is required" }))
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  if (state?.success) {
    redirect("/rooms")
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block font-medium">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="A new cabin"
          required
          className="w-full p-2 border rounded"
          disabled={pending}
          onBlur={(e) => validateField("title", e.target.value)}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block font-medium">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="Don't miss out on this one!"
          required
          className="w-full p-2 border rounded"
          disabled={pending}
          onBlur={(e) => validateField("description", e.target.value)}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="heroUrl" className="block font-medium">Hero URL from pxhere.com</label>
        <input
          id="heroUrl"
          name="heroUrl"
          type="text"
          placeholder="https://c.pxhere.com/photos/..."
          required
          className="w-full p-2 border rounded"
          disabled={pending}
          onBlur={(e) => validateField("heroUrl", e.target.value)}
        />
        {errors.heroUrl && <p className="text-red-500 text-sm">{errors.heroUrl}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="pricePerNightAmount" className="block font-medium">Price per night</label>
        <div className="flex items-center">
          <input
            id="pricePerNightAmount"
            name="pricePerNightAmount"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            min="0"
            required
            className="w-full p-2 border rounded-l"
            disabled={pending}
            onBlur={(e) => validateField("pricePerNightAmount", e.target.value)}
          />
          <span className="px-4 py-2 bg-gray-100 border border-l-0 rounded-r">USD</span>
        </div>
        {errors.pricePerNightAmount && <p className="text-red-500 text-sm">{errors.pricePerNightAmount}</p>}
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>

      {state?.error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 flex items-start">
          <span className="mr-1">⚠️</span>
          <span>{state.error}</span>
        </div>
      )}
    </form>
  )
}
