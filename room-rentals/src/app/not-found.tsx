// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link 
        href="/rooms" 
        className="px-6 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
      >
        Return to Cabins
      </Link>
    </div>
  );
}